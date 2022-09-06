<template>
  <div class="layer">
    <!-- 修改金额 -->
    <div class="black-div" v-if="Bounced">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">更改余额</div>
        </div>
        <div class="b-nr">
          <div class="wltmxg">
            输入金额
            <el-input
              class="t-input"
              type="primary"
              placeholder="请输入金额"
              v-model="moneyData"
              clearable
            ></el-input>元
          </div>
          <div class="wltmxg">
            <el-radio v-model="conditions" label="1">赠送</el-radio>
            <el-radio v-model="conditions" label="0">扣除</el-radio>
          </div>
          <div class="b-ann">
            <el-button class="b-ant" @click="down">取消更改</el-button>
            <el-button type="primary" @click="change">确认更改</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 返回 -->
    <div class="zjfh">
      <router-link to="/channel">
        <div class="fhan">返回</div>
      </router-link>
    </div>
    <!-- 添加用户 -->
    <div class="bittou">
      <div class="bit">添加用户</div>
      <div class="yhtoux tsad">
        <div class="mzt2">用户头像</div>
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
        <div class="mzt">渠道名称</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入渠道名称" v-model="goodsData" clearable></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">手机号码</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="primary"
            placeholder="请输入手机号码"
            v-model="phoneData"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">编号</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="primary"
            placeholder="请输入编号"
            v-model="numberData"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="txnr">
        <div class="wzxs">用户余额</div>
        <div class="tebnr">
          {{money}}元
          <el-button @click="play" style="margin-left: 30px;" type="primary">更改余额</el-button>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">渠道状态</div>
        <div class="tebl">
          <el-checkbox v-model="checked">
            <span v-if="checked">启用</span>
            <span v-else>禁用</span>
          </el-checkbox>
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
      //用户ID
      idData: "",
      //渠道名称
      goodsData: "",
      //手机号码
      phoneData: "",
      //编号
      numberData: "",
      //用户余额
      money: "",
      //头像地址
      portrait: "",
      //头像图片b64格式
      portraitData: "",
      //渠道状态启用/禁用
      checked: true,
      //修改金额弹框
      Bounced: false,
      //金额条件  扣除 0 赠送 1
      conditions: "",
      //需要修改的金额值数据
      moneyData: ""
    };
  },
  //生命周期-页面初始化完成加载
  created() {
    this.loadingData(this.$route.query.id);
  },
  methods: {
    //加载数据
    loadingData(id) {
      var data = {
        user_id: id
      };
      this.api.apiPost(
        "/channel/edit",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            //用户id
            this.idData = res.data.user_id;
            //用户昵称
            this.goodsData = res.data.user_nickname;
            //用户手机号码
            this.phoneData = res.data.user_phone;
            //用户头像
            this.portrait = res.data.user_avatar;
            //用户余额
            this.money = res.data.user_money;
            //渠道状态
            var user_qd_status = res.data.user_qd_status;
            //渠道状态判断
            if (user_qd_status == 1) {
              this.checked = true;
            } else {
              this.checked = false;
            }
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
    //点击修改金额弹框
    play() {
      this.Bounced = true;
    },
    //关闭修改金额弹框
    down() {
      //初始化
      this.moneyData = "";
      this.Bounced = false;
    },
    //确认更改
    change() {
      if (this.conditions == "0") {
        if (parseInt(this.moneyData) > parseInt(this.money)) {
          this.$message({
            showClose: true,
            message: "扣除的金额大于用户余额！",
            type: "error",
            position: "bottom-right"
          });
        } else {
          //扣除
          this.money = parseInt(this.money) - parseInt(this.moneyData);
        }
      } else if (this.conditions == "1") {
        //增加
        this.money = parseInt(this.money) + parseInt(this.moneyData);
      }
      //初始化
      this.moneyData = "";
      this.Bounced = false;
    },
    //保存
    submit() {
      //渠道状态判断
      if (this.checked) {
        var user_qd_status = "1";
      } else {
        var user_qd_status = "0";
      }
      var data = {
        //用户id
        user_id: this.idData,
        //用户手机号码
        user_phone: this.phoneData,
        //用户昵称
        user_nickname: this.goodsData,
        //用户头像
        user_avatar: this.portraitData,
        //修改余额
        user_money: this.money,
        //渠道状态
        user_qd_status: user_qd_status
      };
      this.api.apiPost(
        "/channel/saveedit",
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
            this.$router.push("/channel");
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
        _this.portrait = e.target.result;
        // 读取到的图片数据编码 转成base64后将此编码字符串传给后台即可
        _this.portraitData = e.target.result;
      };
    }
  }
};
</script>
<style scoped>
.txnr {
  margin-left: 70px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
}
.wzxs {
  width: 85px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
.tebnr {
  flex: 1;
  line-height: 40px;
  font-size: 14px;
}
/* 修改金额 */
.t-input {
  width: 230px;
  margin-left: 15px;
  margin-right: 15px;
}
.wltmxg {
  padding-top: 30px;
  text-align: center;
}
.black-div {
  width: 100%;
  height: 100%;
  min-width: 1700px;
  min-height: 1080px;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 30;
}
.bounced {
  width: 470px;
  height: 300px;
  background: rgba(255, 255, 255, 1);
  position: relative;
  top: 50%;
  margin-top: -235px;
  left: 50%;
  margin-left: -150px;
}
.b-bt {
  width: 100%;
  height: 50px;
  background: rgba(3, 122, 255, 1);
  display: flex;
  line-height: 50px;
  color: #ffffff;
  font-size: 14px;
}
.b-wz1 {
  width: 300px;
  height: 100%;
  text-indent: 40px;
}
.b-nr dl {
  font-size: 20px;
  text-align: center;
  padding-top: 70px;
}
.b-nr {
  width: 100%;
  height: 250px;
}
.b-ann {
  width: 260px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 60px;
}
.b-ant {
  margin-right: 80px;
}
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
  height: 648px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(231, 233, 234, 1);
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
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
  width: 60px;
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