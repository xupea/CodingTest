import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/plots";
import { getBugHistory } from "../api";

const Page = () => {
  const [config, setConfig] = useState({
    data: [],
    xField: "time",
    yField: "count",
    seriesField: "typeCN",
    colorFiled: "typeCN",
    autoFit: true,
    xAxis: {
      type: "time",
    },
    color: ({ type, typeCN }) => {
      console.log(type);
      if (typeCN === "紧急") {
        return "rgb(223,91,69)";
      }
      if (typeCN === "高") {
        return "rgb(240,159,80)";
      }
      if (typeCN === "中") {
        return "rgb(246,207,81)";
      }
      if (typeCN === "低") {
        return "rgb(135,202,96)";
      }
      return "rgb(0,0,0)";
    },
  });

  async function fetchData() {
    const data = await getBugHistory();

    const dataNew = data.filter((d) => d.type !== "all");
    console.log(dataNew);

    setConfig({
      ...config,
      data: dataNew,
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 10 * 1000);

    return () => clearInterval(interval);
  }, []);

  return <Line style={{ height: "100%" }} {...config} />;
};
export default Page;
