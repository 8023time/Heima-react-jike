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
  // 删除文章
  delete_article: (target) => {
    return request({
      url: `v1_0/mp/articles/${target}`,
      method: "DELETE",
    });
  },
   // 获取文章详情
   get_article_infor: (target) => {
    return request({
      url: `/v1_0/mp/articles/${target}`,
      method: "get",
    });
  },
  // 更新文章
  update_article: (target,data) => {
    return request({
      url: `/v1_0/mp/articles/${target}`,
      method: "put",
      data
    });
  },

};

export { article_api };
