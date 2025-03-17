import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { user_login } from "@/store/modules/user"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigation = useNavigate() // 使用跳转到其他路由的功能

  // 触发登录操作
  const hander_login = async (values) => {
    await dispatch(user_login(values))
    navigation('/')
    message.success('登录成功')

  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={hander_login} validateTrigger={['onBlur']}>
          <Form.Item label="手机号" name="mobile" rules={[{required:true,message:"请填写手机号"},{pattern:/^1[3-9]\d{9}$/,message:"手机号码格式不对"}]}>
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item label="验证码" name="code" rules={[{required:true,message:"请填写验证码"}]}>
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login


