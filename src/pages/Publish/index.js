import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import { article_api } from "@/apis/article";
import { useState } from "react";
import { useChannels } from "@/hooks/usechannels";

const { Option } = Select;

const Publish = () => {
  const { channels } = useChannels();

  // 处理提交表单数据
  const hander_submit_aryticle = async (values) => {
    if(imagetype !== images.length){
      message.error("请选择正确的图片数量");
      return
    }
    const { title, channel_id, content } = values;
    const data = {
      title,
      channel_id,
      content,
      cover: {
        type: imagetype,
        images: images.map(item=>item.response.data.url),
      },
    };
    const response = await article_api.add_article(data);
    message.success("发布文章成功");
  };

  // 上传图片
  const [images, setImages] = useState([]); // 用来存储数据
  const hander_upload_pricture = (value) => {
    setImages(value.fileList);    
  };


  // 使用一个状态值来控制上传图片的功能能不能显示出来
  const [imagetype, setImagetype] = useState(0); // 用来存储数据
  // 点击获取表单项的value值
  const hander_select_value = (event) => {
    setImagetype(event.target.value);
  };
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "发布文章" },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: imagetype }}
          onFinish={hander_submit_aryticle}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channels.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={hander_select_value}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
           {imagetype > 0 &&
             <Upload maxCount={imagetype} listType="picture-card" name="image" showUploadList action={'http://geek.itheima.net/v1_0/upload'} onChange={hander_upload_pricture}>
             <div style={{ marginTop: 8 }}>
               <PlusOutlined />
             </div>
           </Upload>
           }
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
