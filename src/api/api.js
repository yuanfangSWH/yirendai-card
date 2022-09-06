import axios from "axios";

export default {

  // 通过接口获取数据
  apiPost: function (url, method, data, params, callback) {
     var Bearer = "Bearer ";
     var apitoken = Bearer += sessionStorage.getItem("tokenData");
    //获取域名缓存
    //var baseURL = sessionStorage.getItem("DomainURL");
    //baseURL = baseURL + "/v1";
    axios.request({
      method: method || 'post',
      baseURL: 'http://king.kayu5.com/v1',
      url: url,
      data: data,
      params: params,
      headers: { 'apitoken': apitoken },
      timeout: 10000,
    }).then(response => {
      switch (response.data.status) {
        case 200:
          callback(true, response.data.status, response.data)
          break;
        case '':
          callback(false, response.data.status, response.data)
          break;
        default:
          callback(false, response.data.status, response.data)
      }
    })
      .catch((error) => {
        console.log(error)
      })
  },
  // 动态域名接口
  DomainName: function (callback) {
    //获取当前域名
    var urlData = location.href.split('/')[2];
    urlData = "http://" + urlData
    axios.request({
      method: 'get',
      baseURL: 'http://services.kayu5.com?url=' + urlData,
      timeout: 10000,
    }).then(response => {
      switch (response.data.code) {
        case 200:
          sessionStorage.setItem("DomainURL", response.data.data.host);
          callback(true)
          break;
        case '':
          sessionStorage.setItem("DomainURL", "");
          callback(false)
          break;
        default:
          sessionStorage.setItem("DomainURL", "");
          callback(false)
      }
    })
      .catch((error) => {
        callback(true)
        console.log(error)
      })
  }
}