function setData(res) {
  console.log(res);
  return res.data;
}

export default function(axios) {
  axios.interceptors.response.use(setData);
}