import { useEffect, useState } from "react";
import { article_api } from "@/apis/article";

const useChannels = () => {
  const [channels, setChannels] = useState([]); // 用来存储数据

  // 调用接口获取数据,下拉选择数据
  useEffect(() => {
    // 调用接口获取数据
    async function getchannels() {
      const response = await article_api.get_channels();
      setChannels(response.data.channels);
    }
    getchannels();
  }, []);

  return {
    channels,
  };
};

export { useChannels };
