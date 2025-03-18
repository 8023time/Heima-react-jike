import { request } from "@/utils/index";

const user_api = {
  // 登录
  login: (data) => {
    return request({
      url: "/v1_0/authorizations",
      method: "post",
      data,
    });
  },
  // 获取用户信息
  get_user_info: () => {
    return request({
      url: "/v1_0/user/profile",
      method: "get",
    });
  },
  // 获取用户的基本信息
  get_user_detail_by_id: (id) => {
    return request({
      url: `/sys/user/${id}`,
      method: "get",
    });
  },
};

export { user_api };
