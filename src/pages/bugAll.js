import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";
import { getBugCount } from "../api";
import "../App.css";

const map = {
  all: "总计",
  critical: "紧急",
  high: "高",
  middle: "中",
  low: "低",
};

const Page = () => {
  const [config, setConfig] = useState({
    appendPadding: 10,
    data: [],
    autoFit: true,
    angleField: "value",
    colorField: "type",
    color: ({ type }) => {
      console.log(type);
      if (type === "紧急") {
        return "rgb(223,91,69)";
      }
      if (type === "高") {
        return "rgb(240,159,80)";
      }
      if (type === "中") {
        return "rgb(246,207,81)";
      }
      if (type === "低") {
        return "rgb(135,202,96)";
      }
      return "rgb(0,0,0)";
    },
    radius: 0.8,
    label: {
      type: "outer",
      style: {
        fontSize: 34,
      },
      rotate: true,
    },
    pageNavigator: {
      text: {
        style: {
          fill: "#ccc",
          fontSize: 8,
        },
      },
    },

    interactions: [
      {
        type: "element-active",
      },
    ],
  });

  const [waring, setWarning] = useState(false);
  const [totalBug, setTotalBug] = useState(0);
  const [criticalBug, setCriticalBug] = useState(0);

  async function fetchData() {
    const all = await getBugCount("all");
    const critical = await getBugCount("critical");
    const high = await getBugCount("high");
    const middle = await getBugCount("middle");
    const low = await getBugCount("low");

    const data = [critical, high, middle, low].map(({ count, type }) => ({
      value: count,
      type: map[type],
    }));

    if (critical.count > 0) {
      setWarning(true);
    }
    
    setTotalBug(all.count);

    setCriticalBug(critical.count)

    setConfig({
      ...config,
      data,
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

  return (
    <div className="chart-container">
      <div className="title">总Bug数量为：{totalBug}，紧急Bug数量为：{criticalBug}</div>
      <Pie style={{ height: "100%" }} {...config} />
    </div>
  );
};
export default Page;
