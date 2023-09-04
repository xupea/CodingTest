const axios = require("axios").default;

const baseURL =
  "https://xindaim.coding.net/api/project/11807143/issues/DEFECT/list?filterId=10764982";
const token = process.env.CODING_TOKEN;

function assembleConditions(type) {
  const conditions = [
    {
      value: ["TODO", "PROCESSING"],
      key: "STATUS_TYPE",
      fixed: true,
      constValue: [],
    },
    {
      value: [],
      valueChanged: null,
      validInfo: null,
      userMap: {},
      status: null,
      key: "ASSIGNEE",
      fixed: true,
      constValue: [],
    },
  ];

  if (type === "all") {
    return conditions;
  } else if (type === "critical") {
    conditions.push({
      value: [3],
      key: "PRIORITY",
      fixed: false,
      constValue: [],
    });
  } else if (type === "high") {
    conditions.push({
      value: [2],
      key: "PRIORITY",
      fixed: false,
      constValue: [],
    });
  } else if (type === "middle") {
    conditions.push({
      value: [1],
      key: "PRIORITY",
      fixed: false,
      constValue: [],
    });
  } else if (type === "low") {
    conditions.push({
      value: [0],
      key: "PRIORITY",
      fixed: false,
      constValue: [],
    });
  }

  return conditions;
}

function assembleConfig(type) {
  const config = {
    page: 1,
    pageSize: 20,
    content: {
      sort: { key: "PRIORITY", value: "DESC" },
      conditions: [],
      showSubIssues: true,
    },
  };

  config.content.conditions = assembleConditions(type);

  return config;
}

async function getBugCount(type) {
  const { data } = await axios.post(baseURL, assembleConfig(type), {
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const { totalRow } = data.data;

  return totalRow;
}

module.exports = { getBugCount };
