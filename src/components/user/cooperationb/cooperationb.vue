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
      <router-link to="/cooperation">
        <div class="fhan">返回</div>
      </router-link>
    </div>
    <!-- 编辑 -->
    <div class="yhbjdiv">
      <div class="ybto">用户编辑</div>
      <div class="txnr">
        <div class="wzxs">用户头像</div>
        <div class="tebnr">
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
      <div class="txnr">
        <div class="wzxs">用户名称</div>
        <div class="tebnr">
          <el-input class="s-input" type="primary" v-model="userData" clearable></el-input>
        </div>
      </div>
      <div class="txnr">
        <div class="wzxs">手机号码</div>
        <div class="tebnr">
          <el-input class="s-input" type="primary" v-model="phoneData" clearable></el-input>
        </div>
      </div>
      <div class="txnr">
        <div class="wzxs">用户等级</div>
        <div class="tebnr">合伙人</div>
      </div>
      <div class="yhtoux">
        <div class="mzt" style="width: 110px;">是否为渠道商</div>
        <div class="tebl">
          <el-radio v-model="radio1" label="1">是</el-radio>
          <el-radio v-model="radio1" label="0">否</el-radio>
        </div>
      </div>
      <div class="txnr">
        <div class="wzxs">用户余额</div>
        <div class="tebnr">
          {{money}}元
          <el-button @click="play" style="margin-left: 30px;" type="primary">更改余额</el-button>
        </div>
      </div>
      <div class="txnr">
        <div class="wzxs">消息通知</div>
        <div class="tebnr">
          <el-checkbox v-model="xitz">
            <span v-if="xitz">开启</span>
            <span v-else>禁用</span>
          </el-checkbox>
        </div>
      </div>
      <div class="txnr">
        <div class="wzxs">收益消息</div>
        <div class="tebnr">
          <el-checkbox v-model="siyy">
            <span v-if="siyy">开启</span>
            <span v-else>禁用</span>
          </el-checkbox>
        </div>
      </div>
      <div class="txnr">
        <div class="wzxs">新成员消息</div>
        <div class="tebnr">
          <el-checkbox v-model="chengy">
            <span v-if="chengy">开启</span>
            <span v-else>禁用</span>
          </el-checkbox>
        </div>
      </div>
      <div class="txnr">
        <div class="wzxs">会员状态</div>
        <div class="tebnr">
          <el-checkbox v-model="hyzt">
            <span v-if="hyzt">开启</span>
            <span v-else>禁用</span>
          </el-checkbox>
        </div>
      </div>
      <div class="txnr">
        <div class="wzxs"></div>
        <div class="tannr" @click="submit">保存</div>
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
      //  用户名称
      userData: "",
      // 用户手机号
      phoneData: "",
      //用户头像
      portrait: "",
      //头像图片b64格式
      portraitData: "",
      //是否合伙人
      partnership: "",
      //用户余额
      money: "",
      // 消息通知
      xitz: true,
      // 收益消息
      siyy: true,
      // 新成员消息
      chengy: true,
      // 会员状态
      hyzt: false,
      //修改金额弹框
      Bounced: false,
      //金额条件  扣除 0 赠送 1
      conditions: "",
      //需要修改的金额值数据
      moneyData: "",
      //选择是1否0
      radio1: 0
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
        "/partner/edit",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            //用户id
            this.idData = res.data.info[0].user_id;
            //用户头像
            this.userData = res.data.info[0].user_nickname;
            //用户手机号码
            this.phoneData = res.data.info[0].user_phone;
            //用户头像
            this.portrait = res.data.info[0].user_avatar;
            //用户余额
            this.money = res.data.info[0].user_money;
            //会员状态
            var user_status = res.data.info[0].user_status;
            //会员状态判断
            if (user_status == 1) {
              this.hyzt = true;
            } else {
              this.hyzt = false;
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
    //保存
    submit() {
      //会员状态判断
      if (this.hyzt) {
        var user_status = "1";
      } else {
        var user_status = "0";
      }
      var data = {
        //用户id
        user_id: this.idData,
        //修改余额
        user_money: this.money,
        //用户电话号码
        user_phone: this.phoneData,
        //用户昵称
        user_nickname: this.userData,
        //用户头像地址
        user_avatar: this.portraitData,
        //是否为渠道商
        qdavatar: this.radio1,
        //会员状态
        user_status: user_status
      };
      this.api.apiPost(
        "/partner/saveedit",
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
            this.$router.push("/cooperation");
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
/* 编辑 */
.yhbjdiv {
  width: 1680px;
  height: 840px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: #ffffff;
  border: 1px solid rgba(231, 233, 234, 1);
}
.ybto {
  width: 100%;
  height: 51px;
  border-bottom: 1px #e7e9ea solid;
  line-height: 51px;
  text-indent: 30px;
  font-size: 16px;
}
.txnr {
  margin-left: 48px;
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
.tebnr img {
  width: 60px;
  height: 60px;
}
.s-input {
  width: 280px;
}
.tannr {
  width: 280px;
  height: 40px;
  background: rgba(3, 122, 255, 1);
  border-radius: 2px;
  font-size: 14px;
  color: #ffffff;
  line-height: 40px;
  text-align: center;
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
  margin-left: 45px;
}
.tebl {
  line-height: 60px;
}
</style>