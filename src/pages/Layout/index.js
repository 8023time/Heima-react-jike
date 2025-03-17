import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react' 
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { get_userinfo } from "@/store/modules/user"
import { removeuserinfor } from '@/store/modules/user'


const { Header, Sider } = Layout

const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {
  const navigate = useNavigate() // 跳转功能
  const location = useLocation() // 获取当前的路由信息
  const dispatch = useDispatch() // 获取dispatch函数
  
  
  const path = location.pathname // 获取当前的路由路径
  
  
  // 相当于生命周期函数,立即执行一次
  useEffect(() => {
    dispatch(get_userinfo()) // 获取用户信息
  }, [dispatch])

  const name = useSelector(state => state.user.userinfor?.name) || '' // 获取用户信息
  
  const hander_router_change = ({key}) => { // 实现路由的跳转
    navigate(key)
  }

  const hander_login_out = () => { // 退出登录
    dispatch(removeuserinfor())
    navigate('/login')
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={hander_login_out}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
          onClick={hander_router_change}
            mode="inline"
            theme="dark"
            defaultSelectedKeys={path} // 选中当前的路由
            items={items}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet /> 
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout