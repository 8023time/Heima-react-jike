import { request } from "@/utils/index";

const article_api = {
  // 获取channel数据
  get_channels: () => {
    return request({
      url: "/v1_0/channels",
      method: "get",
    });
  },
  // 提交表单数据,添加文章
  add_article: (data) => {
    return request({
      url: "/v1_0/mp/articles?draft=false",
      method: "post",
      data,
    });
  },
  // 获取文章列表
  get_article_list: (data) => {
    return request({
      url: "/v1_0/mp/articles",
      method: "get",
      data,
    });
  },
};

export { article_api };
