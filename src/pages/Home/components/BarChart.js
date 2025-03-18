import * as echarts from "echarts";
import { useEffect } from "react";
import { useRef } from "react";

const BarChart = () => {
  const chartRef = useRef(null);
  useEffect(() => {
    // 挂载在一个虚拟dom上面,可以换成useRef
    // const chartDom = document.getElementById("main");
    // 初始化一个图标出来
    const myChart = echarts.init(chartRef.current); // 挂载在一个虚拟dom上面

    const option = {
      // 图标参数
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    };

    option && myChart.setOption(option);
  }, []);
  return (
    <div>
      <div ref={chartRef} style={{ width: 600, height: 400 }}></div>
    </div>
  );
};

export default BarChart;