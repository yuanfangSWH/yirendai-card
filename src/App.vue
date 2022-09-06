<template>
  <div id="app">
    <!-- 退出 -->
    <div class="black-div" v-if="exitBounced">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">退出账户</div>
          <div class="b-wz2">账户名称：{{nameData}}</div>
        </div>
        <div class="b-nr">
          <dl>确定退出吗？</dl>
          <div class="b-ann">
            <el-button class="b-ant" @click="exit(2)">取消退出</el-button>
            <el-button type="primary" @click="exit(3)">确认退出</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 登录 -->
    <div class="login-ex" v-if="LoginState">
      <div class="login-div">
        <div class="title-div">
          <div class="title">
            <div class="logo">
              <img class="logo" src="./assets/images/logo.png" />
            </div>
            <div class="title-wez">信用卡超市丨后台管理</div>
          </div>
        </div>
        <div class="tglin tsae">
          <div class="tmimg">
            <img src="./assets/images/tbt1.png" />
          </div>
          <div class="tminput">
            <el-input
              class="t-input"
              type="primary"
              placeholder="请输入手机号"
              v-model="loginForm.username"
              clearable
            ></el-input>
          </div>
        </div>
        <div class="tglin">
          <div class="tmimg">
            <img src="./assets/images/tbt2.png" />
          </div>
          <div class="tminput">
            <el-input
              class="t-input"
              type="password"
              placeholder="请输入密码"
              v-model="loginForm.password"
              clearable
            ></el-input>
          </div>
        </div>
        <div class="tglin yzm">
          <div class="tmimg">
            <img src="./assets/images/tbt3.png" />
          </div>
          <div class="tminput">
            <el-input
              class="t-input"
              type="primary"
              placeholder="请输入验证码"
              v-model="validation"
              clearable
            ></el-input>
          </div>
          <div class="yzmsr">
            <div @click="changeCode()">
              <!-- 验证码图片 -->
              <img class="tbdyyzmo" :src="identifyCode" />
            </div>
          </div>
        </div>

        <div class="tglin-an" @click="login">登录</div>
        <div class="tglin-jiy">
          <el-checkbox v-model="checked">记住我的登录</el-checkbox>
        </div>
      </div>
      <div class="background-div"></div>
    </div>
    <!-- 顶部 -->
    <div class="top-div" v-if="!LoginState">
      <div class="top-bt">信用卡超市管理后台</div>
      <div class="top-nr">
        <div class="top-img">
          <img src="./assets/images/tx1.png" />
        </div>
        <div class="top-name">{{nameData}}</div>
        <div class="top-refund" @click="exit(1)">
          <img src="./assets/images/refundtb.png" />
        </div>
      </div>
    </div>
    <!-- 左侧 -->
    <div class="left-div" v-if="!LoginState">
      <div class="left-layer">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#393D4C"
          text-color="#D8DCEB"
          active-text-color="#037AFF"
        >
          <router-link to="/index">
            <el-menu-item index="1">
              <i class="el-icon-data-analysis"></i>
              <span slot="title">数据总览</span>
            </el-menu-item>
          </router-link>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/ordinary">
                <el-menu-item index="2-1">普通用户</el-menu-item>
              </router-link>
              <router-link to="/cooperation">
                <el-menu-item index="2-2">合伙用户</el-menu-item>
              </router-link>
              <router-link to="/channel">
                <el-menu-item index="2-3">渠道列表</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-bank-card"></i>
              <span>产品管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/product">
                <el-menu-item index="3-1">银行产品</el-menu-item>
              </router-link>
              <router-link to="/bankbq">
                <el-menu-item index="3-2">银行标签</el-menu-item>
              </router-link>
              <router-link to="/card">
                <el-menu-item index="3-3">信用卡</el-menu-item>
              </router-link>
              <router-link to="/label">
                <el-menu-item index="3-4">信用卡标签</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-mobile"></i>
              <span>财务管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/earnings">
                <el-menu-item index="4-1">收益报表</el-menu-item>
              </router-link>
              <router-link to="/mention">
                <el-menu-item index="4-2">提现管理</el-menu-item>
              </router-link>
              <router-link to="/record">
                <el-menu-item index="4-3">提现记录</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-notebook-1"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/order">
                <el-menu-item index="5-1">办卡订单</el-menu-item>
              </router-link>
              <router-link to="/settlement">
                <el-menu-item index="5-2">结算审核</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-picture-outline"></i>
              <span>运营管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/bannaer">
                <el-menu-item index="6-1">bannaer</el-menu-item>
              </router-link>
              <router-link to="/bounced">
                <el-menu-item index="6-2">活动弹窗</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/article">
                <el-menu-item index="7-1">文章管理</el-menu-item>
              </router-link>
              <router-link to="/problem">
                <el-menu-item index="7-2">常见问题</el-menu-item>
              </router-link>
              <router-link to="/notice">
                <el-menu-item index="7-3">通知管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-coin"></i>
              <span>积分管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/integral">
                <el-menu-item index="8-1">商品管理</el-menu-item>
              </router-link>
              <router-link to="/integralin">
                <el-menu-item index="8-2">兑换列表</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="9">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/system">
                <el-menu-item index="9-1">后台账号</el-menu-item>
              </router-link>
              <router-link to="/rules">
                <el-menu-item index="9-2">渠道商规则</el-menu-item>
              </router-link>
              <router-link to="/duanx">
                <el-menu-item index="9-3">短信接口</el-menu-item>
              </router-link>
              <router-link to="/gonzh">
                <el-menu-item index="9-4">公众号配置</el-menu-item>
              </router-link>
              <router-link to="/osspz">
                <el-menu-item index="9-5">OSS配置</el-menu-item>
              </router-link>
              <router-link to="/wzpztm">
                <el-menu-item index="9-6">网站配置</el-menu-item>
              </router-link>
              <router-link to="/cloud">
                <el-menu-item index="9-7">云账号配置</el-menu-item>
              </router-link>
              <router-link to="/mobxi">
                <el-menu-item index="9-8">模板消息配置</el-menu-item>
              </router-link>
              <router-link to="/tbktm">
                <el-menu-item index="9-9">淘宝客配置</el-menu-item>
              </router-link>
              <!-- <router-link to="/appsez">
                <el-menu-item index="9-5">APP配置</el-menu-item>
              </router-link>-->
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <!-- 框架内容 -->
    <div class="index-div" v-if="!LoginState">
      <div class="index-layer">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 验证码值
      identifyCode: "",
      //登录账号密码
      loginForm: {
        username: "admin",
        password: ""
      },
      //验证码
      validation: "",
      //勾选是否记住密码
      checked: false,
      //是否登录
      LoginState: true,
      //是否退出
      exitBounced: false,
      //用户名
      nameData: ""
    };
  },
  //生命周期-页面初始化完成加载
  created() {
    // //获取动态域名
    // this.api.DomainName(status => {
    //   if (status) {
    //     //获取接口返回动态验证码
    //     this.Verification();
    //   } else {
    //     this.$notify({
    //       title: "域名获取失败",
    //       type: "success",
    //       position: "bottom-right"
    //     });
    //   }
    // });
    //获取接口返回动态验证码
    this.Verification();
    //检测本地用户缓存
    var user = sessionStorage.getItem("userData");
    if (user == "" || user == null) {
      this.LoginState = true;
    } else {
      this.LoginState = false;
      //用户名
      var value = JSON.parse(user);
      this.nameData = value.username;
      //加载数据总览页面
      this.$router.push("/index");
    }
  },
  methods: {
    //获取到验证码
    Verification() {
      // //获取域名缓存
      // var baseURL = sessionStorage.getItem("DomainURL");
      // baseURL = baseURL + "/v1";
      axios
        .request({
          method: "get",
          baseURL: "http://king.kayu5.com/v1",
          url: "/admin/verification",
          timeout: 10000
        })
        .then(response => {
          switch (response.data.status) {
            case 200:
              this.identifyCode = "" + response.data.data;
              break;
            case "":
              this.$notify({
                title: "验证码获取失败",
                type: "success",
                position: "bottom-right"
              });
              break;
            default:
              this.$notify({
                title: "验证码获取失败",
                type: "success",
                position: "bottom-right"
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 点击验证码刷新验证码
    changeCode() {
      this.identifyCode = "";
      //获取接口返回动态验证码
      this.Verification();
    },
    //管理员登录
    login() {
      if (this.loginForm.username == "" || this.loginForm.password == "") {
        this.$message({
          showClose: true,
          message: "手机号或密码不能为空",
          type: "warning",
          position: "bottom-right"
        });
      } else if (this.validation == "") {
        this.$message({
          showClose: true,
          message: "验证码不能为空",
          type: "warning",
          position: "bottom-right"
        });
      } else {
        // //获取域名缓存
        // var baseURL = sessionStorage.getItem("DomainURL");
        // baseURL = baseURL + "/v1";
        axios
          .request({
            method: "post",
            baseURL: "http://king.kayu5.com/v1",
            url: "/admin/login",
            data: {
              username: this.loginForm.username,
              password: this.loginForm.password,
              authnum: this.validation
            },
            timeout: 10000
          })
          .then(response => {
            switch (response.data.status) {
              case 200:
                //用户基础信息本地缓存
                sessionStorage.setItem(
                  "userData",
                  JSON.stringify(response.data.data)
                );
                var credentials = JSON.stringify(response.data.data.token);
                //去掉token的双引号
                var token = credentials.replace(/\"/g, "");
                sessionStorage.setItem("tokenData", token);
                //用户名
                this.nameData = response.data.data.username;
                this.$router.push("/index");
                //关闭登录层
                this.LoginState = false;
                //提示弹框
                this.$notify({
                  title: response.data.message,
                  type: "success",
                  position: "bottom-right"
                });
                break;
              case 408:
                //用户基础信息本地缓存
                sessionStorage.setItem(
                  "userData",
                  JSON.stringify(response.data.data)
                );
                var credentials = JSON.stringify(response.data.data.token);
                //去掉token的双引号
                var token = credentials.replace(/\"/g, "");
                sessionStorage.setItem("tokenData", token);
                //用户名
                this.nameData = response.data.data.username;
                this.$router.push("/index");
                //关闭登录层
                this.LoginState = false;
                //提示弹框
                this.$notify({
                  title: response.data.message,
                  type: "success",
                  position: "bottom-right"
                });
                break;
              case "":
                //获取接口返回动态验证码
                this.Verification();
                this.$notify({
                  title: response.data.message,
                  type: "success",
                  position: "bottom-right"
                });
                break;
              default:
                //获取接口返回动态验证码
                this.Verification();
                this.$notify({
                  title: response.data.message,
                  type: "success",
                  position: "bottom-right"
                });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    //退出
    exit(value) {
      if (value == 1) {
        //开启弹框
        this.exitBounced = true;
      } else if (value == 2) {
        //关闭弹框
        this.exitBounced = false;
      } else if (value == 3) {
        //注销管理员
        this.api.apiPost(
          "/admin/logout",
          "post",
          "",
          "",
          (status, judge, res) => {
            if (status) {
              //初始化清空缓存
              sessionStorage.setItem("userData", "");
              sessionStorage.setItem("tokenData", "");
              sessionStorage.setItem("DomainURL", "");
              this.validation = "";
              this.identifyCode = "";
              //获取接口返回动态验证码
              this.Verification();
              this.LoginState = true;
              this.exitBounced = false;
              this.$router.push("/index");
              this.$notify({
                title: res.message,
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
      }
    }
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
/* 主体框架 */
.index-div {
  width: 1720px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 200px;
  background-color: #ebf1f4;
  overflow: auto;
}
.index-layer {
  padding-top: 54px;
}
/* 左边CSS */
.left-div {
  width: 201px;
  height: 100%;
  background-color: #393d4c;
  position: absolute;
  top: 0;
  left: 0;
}
.left-layer {
  padding-top: 54px;
}
/* 顶部CSS */
.top-div {
  width: 100%;
  height: 54px;
  background: rgba(3, 122, 255, 1);
  display: flex;
  position: absolute;
  top: 0;
  z-index: 35;
}
.top-bt {
  flex: 1;
  height: 54px;
  line-height: 54px;
  font-size: 16px;
  text-align: left;
  color: #ffffff;
  text-indent: 30px;
}
.top-nr {
  width: 225px;
  height: 54px;
  margin-right: 10px;
  display: flex;
}
.top-img {
  width: 36px;
  height: 36px;
  display: block;
  margin-top: 8px;
}
.top-name {
  flex: 1;
  height: 54px;
  line-height: 54px;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  margin-right: 10px;
  margin-left: 10px;
}
.top-refund {
  width: 24px;
  height: 24px;
  display: block;
  margin-top: 14px;
}
/* 登录CSS */
.tglin-jiy {
  width: 350px;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  text-align: left;
}
.tglin-an {
  width: 350px;
  height: 50px;
  background: rgba(3, 122, 255, 1);
  border-radius: 5px;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  line-height: 50px;
  cursor: pointer;
}
.yzmsr {
  width: 116px;
  height: 30px;
  margin-top: 9px;
  background-color: antiquewhite;
  margin-right: 10px;
}
.tmimg {
  width: 22px;
  height: 22px;
  padding-top: 14px;
  padding-left: 11px;
}
.tmimg img {
  width: 22px;
  height: 22px;
}
.tminput {
  flex: 1;
  margin-right: 10px;
  margin-left: 10px;
  height: 100%;
}
.tminput .t-input {
  margin-top: 8px;
}
.tglin {
  width: 350px;
  height: 50px;
  background: rgba(252, 255, 202, 1);
  border: 1px solid rgba(206, 212, 222, 1);
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  margin-top: 15px;
}
.yzm {
  background-color: #ffffff;
}
.tsae {
  margin-top: 40px;
}
.title-div {
  width: 100%;
  height: 139px;
  background-color: #037aff;
}
.title {
  display: flex;
  width: 380px;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 45px;
}
.logo {
  width: 50px;
  height: 50px;
}
.title-wez {
  flex: 1;
  height: 50px;
  line-height: 50px;
  font-size: 30px;
  color: #ffffff;
}
.background-div {
  width: 100%;
  height: 100%;
  min-height: 1080px;
  overflow: hidden;
  position: absolute;
  background: url(./assets/images/dtl1.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 90;
}
.login-div {
  width: 520px;
  height: 532px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 8px 14px 1px rgba(54, 106, 177, 0.08);
  border-radius: 10px;
  position: absolute;
  top: 50%;
  margin-top: -266px;
  left: 50%;
  margin-left: -260px;
  overflow: hidden;
  z-index: 99;
}
/* 组件尺寸重新定制 */
.el-submenu .el-menu-item {
  text-indent: 14px;
}
/* 验证码 */
.tbdyyzmo {
  width: 100%;
  height: 100%;
}
</style>

