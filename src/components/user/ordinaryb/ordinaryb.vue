<template>
  <div class="layer">
    <!-- 返回 -->
    <div class="zjfh">
      <router-link to="/ordinary">
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
        <div class="tebnr">普通用户</div>
      </div>
      <div class="yhtoux">
        <div class="mzt" style="width: 110px;">是否为渠道商</div>
        <div class="tebl">
          <el-radio v-model="radio1" label="1">是</el-radio>
          <el-radio v-model="radio1" label="0">否</el-radio>
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
      //用户名称
      userData: "",
      //用户手机号
      phoneData: "",
      //用户头像
      portrait: "",
      //图片b64格式
      portraitData: "",
      //选择是1否0
      radio1: 0,
      //消息通知
      xitz: true,
      //收益消息
      siyy: true,
      //新成员消息
      chengy: true,
      //会员状态
      hyzt: false
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
        "/apply/edit",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            //用户id
            this.idData = res.data.user_id;
            //用户昵称
            this.userData = res.data.user_nickname;
            ////用户手机号码
            this.phoneData = res.data.user_phone;
            //用户头像
            this.portrait = res.data.user_avatar;
            //是否为渠道商
            this.radio1 = res.data.user_qd;
            //会员状态
            var user_status = res.data.user_status;
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
        //用户昵称
        user_nickname: this.userData,
        //用户手机号码
        user_phone: this.phoneData,
        //用户头像
        user_avatar: this.portraitData,
        //是否为渠道商
        qdavatar: this.radio1,
        //会员状态
        user_status: user_status
      };
      this.api.apiPost(
        "/apply/saveedit",
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
            this.$router.push("/ordinary");
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
/* 编辑 */
.yhbjdiv {
  width: 1680px;
  height: 770px;
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