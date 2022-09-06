<template>
  <div class="layer">
    <!-- 短信接口 -->
    <div class="bittou">
      <div class="bit">短信接口</div>
      <div class="yhtoux" v-for="(item,key) in cardData" :key="key">
        <div class="mzt">{{item.config_desc}}</div>
        <div class="tebl">
          <el-input class="s-input" type="text" v-model="item.config_value" clearable v-if="item.config_type!='7'"></el-input>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :http-request="upload"
            :before-upload="beforeAvatarUpload" v-if="item.config_type=='7'"
          >
            <img v-if="item.config_value" :src="item.config_value" class="avatar" @click="qudaotp(key)"/>
            <i v-else class="el-icon-plus avatar-uploader-icon" @click="qudaotp(key)"></i>
          </el-upload>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt"></div>
        <div class="anntf" @click="submit">保存</div>
      </div>
    </div>
  </div>
</template>
<script>
//lodash插件
let _ = require("lodash");
export default {
  data() {
    return {
      //数据
      cardData: []
    };
  },
  //生命周期-页面初始化完成加载
  created() {
    this.loadingData();
  },
  methods: {
    //加载数据
    loadingData() {
      var params = {
        category: 9
      };
      this.api.apiPost(
        "/config/pzcx",
        "get",
        "",
        params,
        (status, judge, res) => {
          if (status) {
            this.cardData = res.data.config;
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: "error",
              position: "bottom-right"
            });
          }
        }
      );
    },
    //保存
    submit() {
      //删除指定对象
      var group = new Array();
      var group2 = new Array();
      group = this.cardData;
      for (let i = 0; i < group.length; i++) {
        const result = _.omit(group[i], ["config_desc","config_type"]);
        group2.push(result);
      }
      var data = group2;
      this.api.apiPost(
        "/config/messagesave",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            this.loadingData();
            this.$notify({
              title: "保存成功",
              type: "success",
              position: "bottom-right"
            });
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: "error",
              position: "bottom-right"
            });
          }
        }
      );
    },
    //图片ID
    qudaotp(id){
      this.location=id
    },
    //上传图片限制方法
    beforeAvatarUpload(file) {
      const isImage =
        file.type === "image/png" ||
        file.type == "image/jpg" ||
        file.type == "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error("上传的图片只能是 JPG/NPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过 2MB!");
      }
      return isImage && isLt2M;
    },
    //得到图片
    upload(e) {
      var _this = this;
      var reader = new FileReader();
      reader.readAsDataURL(e.file);
      reader.onload = function(e) {
        //设置图片显示
        //_this.portrait = e.target.result;
        // 读取到的图片数据编码 转成base64后将此编码字符串传给后台即可
        _this.cardData[_this.location].config_value = e.target.result;
      };
    }
  }
};
</script>
<style scoped>
/* 头像上传 */
.tsad {
  padding-top: 30px;
  padding-bottom: 20px;
}
.mzt2 {
  font-size: 14px;
  width: 60px;
  height: 170px;
  line-height: 170px;
  margin-right: 20px;
  margin-left: 70px;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/* 添加产品 */
.bittou {
  width: 1680px;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(231, 233, 234, 1);
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  margin-bottom: 20px;
  padding-bottom: 40px;
}
.bit {
  width: 100%;
  height: 51px;
  border-bottom: 1px #e7e9ea solid;
  line-height: 51px;
  text-indent: 30px;
  font-size: 16px;
}
.yhtoux {
  display: flex;
}
.mzt {
  font-size: 14px;
  width: 200px;
  height: 60px;
  line-height: 60px;
  margin-right: 20px;
  margin-left: 70px;
}
.tebl {
  line-height: 60px;
}
.anntf {
  width: 280px;
  height: 40px;
  background: rgba(3, 122, 255, 1);
  border-radius: 2px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 40px;
  margin-top: 40px;
}
.s-input {
  width: 420px;
}
</style>