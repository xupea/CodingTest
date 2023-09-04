import axios from "axios";

const baseURL = "http://localhost:3010/bugs";

export async function getBugCount(type) {
  const { data } = await axios.get(baseURL, {
    params: {
      type,
    },
  });

  return data;
}

export async function getBugHistory() {
  const { data } = await axios.get(baseURL + "/history");

  return data;
}
