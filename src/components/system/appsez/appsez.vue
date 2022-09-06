<template>
  <div class="layer">
    <!-- APP配置 -->
    <div class="bittou">
      <div class="bit">APP配置</div>
      <div class="yhtoux">
        <div class="mzt" style="width: 80px;">APP名称</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入银行名称" v-model="goodsData" clearable></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt" style="width: 110px;">是否开放注册</div>
        <div class="tebl">
          <el-radio v-model="radio1" label="1">是</el-radio>
          <el-radio v-model="radio1" label="2">否</el-radio>
        </div>
      </div>
      <div class="yhtoux tsad">
        <div class="mzt2" style="width: 180px;">注册引导关注二维码</div>
        <div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :http-request="upload"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="portrait" :src="portrait" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt" style="width: 120px;">出师奖奖励系数</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入出师奖励系数" v-model="urlData" clearable></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt" style="width: 120px;">越级奖奖励系数</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="text"
            placeholder="请输入越级奖奖励系数"
            v-model="numberData"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt" style="width: 260px;">是否开启邀请用户增加使用淘礼金次数</div>
        <div class="tebl">
          <el-radio v-model="radio2" label="1">是</el-radio>
          <el-radio v-model="radio2" label="2">否</el-radio>
        </div>
      </div>
      <div class="yhtoux tsad">
        <div class="mzt2" style="width: 180px;">返佣一览表图片上传</div>
        <div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :http-request="upload2"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="portrait2" :src="portrait2" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="yhtoux tsad">
        <div class="mzt2" style="width: 180px;">客服微信二维码</div>
        <div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :http-request="upload3"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="portrait3" :src="portrait3" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt" style="width: 90px;">客服微信</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入客服微信" v-model="rulesData" clearable></el-input>
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
export default {
  data() {
    return {
      //ID
      idData: "",
      //APP名称
      goodsData: "",
      //出师奖奖励系数
      urlData: "",
      //越级奖奖励系数
      numberData: "",
      //客服微信
      rulesData: "",
      //选择是否1
      radio1: 1,
      //选择是否2
      radio2: 1,
      //背景素材
      portrait: "",
      //产品海报
      portrait2: "",
      //产品海报
      portrait3: "",
      //头像图片b64格式
      portraitData: "",
      //头像图片b64格式2
      portraitData2: "",
      //头像图片b64格式3
      portraitData3: ""
    };
  },
  //生命周期-页面初始化完成加载
  created() {
    // this.loadingData(this.$route.query.id);
  },
  methods: {
    //加载数据
    loadingData(id) {
      var data = {
        bank_id: id
      };
      this.api.apiPost("/bank/edit", "post", data, "", (status, judge, res) => {
        if (status) {
          this.idData = res.data.bank_id;
          this.goodsData = res.data.bank_name;
          this.urlData = res.data.user_phone;
          this.portrait = res.data.bank_back_img;
          this.rulesData = res.data.bank_rule;
          //结算周期 res.data.bank_period
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: "error",
            position: "bottom-right"
          });
        }
      });
    },
    //保存
    submit() {
      var data = {
        bank_id: this.idData,
        bank_name: this.goodsData,
        bank_back_img: "",
        bank_period: "",
        bank_rule: this.rulesData
      };
      this.api.apiPost(
        "/bank/saveedit",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            this.$notify({
              title: "保存成功",
              type: "success",
              position: "bottom-right"
            });
            this.$router.push("/product");
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
    //上传图片限制方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //得到图片
    upload(e) {
      var _this = this;
      var reader = new FileReader();
      reader.readAsDataURL(e.file);
      reader.onload = function(e) {
        //设置图片显示
        _this.portrait = e.target.result;
        // 读取到的图片数据编码 转成base64后将此编码字符串传给后台即可
        _this.portraitData = e.target.result;
      };
    },
    //得到图片
    upload2(e) {
      var _this = this;
      var reader = new FileReader();
      reader.readAsDataURL(e.file);
      reader.onload = function(e) {
        //设置图片显示
        _this.portrait2 = e.target.result;
        // 读取到的图片数据编码 转成base64后将此编码字符串传给后台即可
        _this.portraitData2 = e.target.result;
      };
    },
    //得到图片
    upload3(e) {
      var _this = this;
      var reader = new FileReader();
      reader.readAsDataURL(e.file);
      reader.onload = function(e) {
        //设置图片显示
        _this.portrait3 = e.target.result;
        // 读取到的图片数据编码 转成base64后将此编码字符串传给后台即可
        _this.portraitData3 = e.target.result;
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
/* 添加用户 */
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
  width: 280px;
}
</style>