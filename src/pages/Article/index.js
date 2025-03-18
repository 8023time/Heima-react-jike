import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import { useChannels } from "@/hooks/usechannels";
import { article_api } from "@/apis/article";
import { Table, Tag, Space } from "antd";
import img404 from "@/assets/error.png";
import { useEffect } from "react";
import { useState } from "react";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  // 路由跳转
  const navagite = useNavigate();

  // 获取channel数据
  const { channels } = useChannels();

  // 向后端请求的数据
  const [formdata, setFormdata] = useState({
    status: "",
    channel_id: "",
    begin_pubdate: "",
    end_pubdate: "",
    page: 1,
    per_page: 4,
  });

  // 获取文章列表数据
  useEffect(() => {
    const get_article_list = async () => {
      const response = await article_api.get_article_list(formdata);
      setArticle_list(response.data.results);
      setcount(response.data.total_count);
    };
    get_article_list();
  }, [formdata]);

  // 存储文章列表数据
  const [article_list, setArticle_list] = useState([]);
  const [count, setcount] = useState(0);

  // 判断不同的状态列表出来
  const status = {
    0: <Tag color="red">草稿</Tag>,
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="green">审核通过</Tag>,
  };

  // 得到表单的数据
  const hander_get_formdata = (formvalue) => {
    setFormdata({
      ...formdata,
      status: formvalue.status,
      channel_id: formvalue.channel_id,
      begin_pubdate: formvalue.date[0].format("YYYY-MM-DD"),
      end_pubdate: formvalue.date[1].format("YYYY-MM-DD"),
    });
  };

  // 删除文章
  const hander_confirm = async (id) => {
    await article_api.delete_article(id);
    setFormdata({
      ...formdata,
    });
  };

  // 准备列数据
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (data) => status[data],
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => navagite(`/publish?id=${data.id}`)}
            />

            <Popconfirm
              title="删除文章"
              description="确定要删除文章吗?"
              onConfirm={() => {
                hander_confirm(data.id);
              }}
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "文章列表" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ ...formdata }} onFinish={hander_get_formdata}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              defaultValue="lucy"
              style={{ width: 120 }}
            >
              {channels.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={article_list}
          pagination={{
            pageSize: 4,
            total: count,
          }}
        />
      </Card>
    </div>
  );
};

export default Article;
