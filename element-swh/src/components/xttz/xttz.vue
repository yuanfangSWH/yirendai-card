<template>
  <div class="tps-m">
    <div class="fruit"><button @click="pullData()">点击</button></div>
  </div>
</template>
<script>

export default {
  data() {
    return {};
  },
  methods: {
		pullData(){
			 this.axios({
          method: 'get',
          url: 'http://api.wapp2.com/v1/handshake/index',
          headers:{
			'id':'116626',
			'os': 'android',
			'version': '1.0',
			'sign': 'Rb9GAHllzZW3OTBbEPOTIECQQG+H/Gw9TLRq+70bju1IHJxu9GDVGSs00QSVZSV9pQ/hmkriki/iY/AqipA00IxCHiAaOlS7Zl3BqI8rCGEOjstaFgHIXg6Q/LM/ZctrZAlBWAIZPggTqhmCGB9zkPy3pFiXD9LNm1lUQ5HsN4U=',
			'lang': 'zh',
			'Content-Type': 'application/x-www-form-urlencoded', 
			'sessionid': 'brjk6p4lu3s93dc0sslsfjbi54'
		}
        }).then(res => {
          console.log("成功"+JSON.stringify(res.data));
        }).catch(error => {
          console.log("失败"+error);
        });
		}





	}
};
</script>
<style scoped>
.fruit {
  width: 1200px;
  height: 555px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  overflow: hidden;
}
</style>