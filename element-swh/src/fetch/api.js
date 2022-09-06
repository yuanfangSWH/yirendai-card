import axios from "axios";

export default {

  // 通过接口获取数据
  apiPost: function (url, data, callback, method) {
    axios.request({
      method: method || 'post',
      baseURL: 'https://easy-mock.com/mock/5c8c650dee611359cdbb48cb',
      url: url,
      data: data,
      timeout: 10000,
    }).then(response => {
      var validation = JSON.stringify(response.data.data);
      if (validation == 403) {

        callback(false, response.data)

      } else if (validation == "" || validation == null) {

        callback(false, response.data)

      } else {

        callback(true, response.data)

      }

    })
      .catch((error) => {
        console.log(error)
      })
  }

}