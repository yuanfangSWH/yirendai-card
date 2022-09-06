<template>
  <div id="home" class="tps-m">
    <div class="yhdljz">
      <div v-if="logindiv">
        <el-row>
          <el-col :span="24">
            <div class="dllogo">欢迎登陆</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="dltb yhtb"></div>
          </el-col>
          <el-col :span="19">
            <div class="dlm">用户名</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="dlinput">
              <el-input
                type="primary"
                placeholder="请输入账号"
                v-model="loginForm.username"
                :disabled="true"
                clearable
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="dltb mitb"></div>
          </el-col>
          <el-col :span="19">
            <div class="dlm">密码</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="dlinput" style="height: 70px;">
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="loginForm.password"
                :disabled="true"
                clearable
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <div style="height: 40px;"></div>
          </el-col>
          <el-col :span="13">
            <el-tooltip class="item" effect="dark" content="功能暂且不可用" placement="bottom-start">
              <el-button type="warning">注册</el-button>
            </el-tooltip>
            <el-button type="primary" @click="login">登陆</el-button>
          </el-col>
        </el-row>
      </div>
      <div v-if="disappear">
        <el-row>
          <el-col :span="24">
            <div class="toux">
              <img class="jiaztx" src="../assets/images/2579161.png">
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="nickname">元芳</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="jilms">
              <p>一叶浮萍归大海，人生何处不相逢。</p>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <div style="height: 40px;"></div>
          </el-col>
          <el-col :span="22">
            <div class="Setmdlq">
              <div class="xjntb dxtb"></div>
              <el-tooltip class="item" effect="dark" content="功能暂且不可用" placement="bottom-start">
                <span class="but">查看消息</span>
              </el-tooltip>
              <div class="xjntb tctb"></div>
              <span class="but" @click="Eempty">退出登陆</span>
            </div>
          </el-col>
          <el-col :span="1">
            <div style="height: 40px;"></div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      loginForm: {
        username: "yuanfangSWH",
        password: "123456789"
      },
      //登陆状态
      disappear: false,
      //登陆框
      logindiv: false
    };
  },
  created() {
    let token = localStorage.getItem("landing");
    if (token == null || token == "") {
      this.logindiv = true;
    } else {
      this.disappear = true;
    }
  },
  methods: {
    ...mapMutations(["changeLogin"]), // 将 `this.changeLogin()` 映射为 `this.$store.commit('changeLogin')`
    //登陆
    login() {
      if (this.loginForm.username === "" || this.loginForm.password === "") {
        this.$message({
          showClose: true,
          message: "账号或密码不能为空",
          type: "warning",
          position: "bottom-right"
        });
      } else {
        var data =  {username:this.loginForm.username,password :this.loginForm.username}
        this.api.apiPost(
          "admin/login",
         data,
          (status, res) => {
            if (status) {
              var TokenData = JSON.stringify(res.data);
              //EasyMock假模拟得到Token认证并储存
              this.changeLogin({ landing: TokenData });
              this.logindiv = false;
              this.disappear = true;
              this.$router.push("/home");
              this.$notify({
                title: "登陆成功",
                type: "success",
                position: "bottom-right"
              });
            } else {
              this.$message({
                showClose: true,
                message: "登陆失败，账号或密码错误",
                type: "error",
                position: "bottom-right"
              });
            }
          },
          "post"
        );
      }
    },
    //退出登陆
    Eempty() {
      localStorage.clear();
      this.disappear = false;
      this.logindiv = true;
      this.$router.push("/home");
      this.$notify.info({
        title: "已退出登陆",
        type: "success",
        position: "bottom-right"
      });
    }
  }
};
</script>

<style scoped>
.yhdljz {
  width: 350px;
  height: 430px;
  position: absolute;
  top: 140px;
  right: 80px;
  background: -webkit-linear-gradient(130deg, #ed8785, #ed6f7a);
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(130deg, #ed8785, #ed6f7a);
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(130deg, #ed8785, #ed6f7a);
  /* Firefox 3.6 - 15 */
  background: linear-gradient(130deg, #ed8785, #ed6f7a);
  /* 标准的语法（必须放在最后） */
  z-index: 50;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-row {
  color: #fff;
}
.dllogo {
  height: 120px;
  font-size: 32px;
  line-height: 140px;
  text-align: center;
}
.dltb {
  width: 25px;
  height: 25px;
  margin-top: 8px;
  margin-left: 40px;
  background-size: contain;
}
.yhtb {
  background-image: url(../assets/images/yhtb.png);
}
.mitb {
  background-image: url(../assets/images/mitb.png);
}
.dlm {
  height: 40px;
  line-height: 40px;
}
.dlinput {
  width: 280px;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}
.toux {
  height: 120px;
  margin-top: 50px;
}
.jiaztx {
  width: 110px;
  height: 110px;
  -moz-border-radius: 90px;
  -webkit-border-radius: 90px;
  border-radius: 90px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 4px #e27279 solid;
}
.nickname {
  height: 60px;
  font-size: 22px;
  line-height: 60px;
  text-align: center;
  color: #fff;
}
.jilms {
  height: 100px;
}
.jilms p {
  width: 270px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  display: block;
  font-size: 18px;
  line-height: 30px;
}
.Setmdlq {
  height: 40px;
  font-size: 20px;
  text-align: center;
  display: flex;
  line-height: 30px;
  padding-top: 25px;
  border-top: 1px #fff dashed;
}
.but {
  display: block;
  cursor: pointer;
}
.but:hover {
  opacity: 0.7;
}
.but:after {
  opacity: 1;
}
.xjntb {
  width: 30px;
  height: 30px;
  background-size: contain;
}
.dxtb {
  background-image: url(../assets/images/dx.png);
  margin-left: 20px;
  margin-right: 10px;
}
.tctb {
  background-image: url(../assets/images/tc.png);
  margin-left: 10px;
  margin-right: 10px;
}
</style>