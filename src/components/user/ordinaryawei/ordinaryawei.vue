<template>
  <div class="layer">
    <!-- 返回 -->
    <div class="zjfh">
      <router-link to="/ordinary">
        <div class="fhan">返回</div>
      </router-link>
    </div>
    <!-- 用户详情 -->
    <div class="yonhxq">
      <div class="ybt">用户详情</div>
      <div class="ynrw">
        <div class="mk1">
          <img :src="cardData.user_avatar" />
          <dl>{{cardData.user_nickname}}</dl>
          <div class="btq">普通用户</div>
          <div class="daljyk">
            <div class="tlljb">
              <dl>{{cardData.znum}}次</dl>
              <div class="btqtt" style="background:rgba(3,122,255,1);">总申卡次数</div>
            </div>
            <div class="tlljb">
              <dl>{{cardData.smnum}}次</dl>
              <div class="btqtt" style="background:rgba(255,175,3,1);">上月申卡次数</div>
            </div>
          </div>
        </div>
        <div class="mk2">
          <div class="tesmk">
            <img src="../../../assets/images/xqt1.png" />
            <div class="wzt1">真实姓名</div>
            <div class="wzt2">{{cardData.user_name}}</div>
          </div>
          <div class="tesmk">
            <img src="../../../assets/images/xqt2.png" />
            <div class="wzt1">手机号</div>
            <div class="wzt2">{{cardData.user_phone}}</div>
          </div>
          <div class="tesmk">
            <img src="../../../assets/images/xqt3.png" />
            <div class="wzt1">微信号</div>
            <div class="wzt2">{{cardData.user_wx=='' ?'微信号未填写' : cardData.user_wx}}</div>
          </div>
          <div class="tesmk">
            <img src="../../../assets/images/xqt4.png" />
            <div class="wzt1">身份证号</div>
            <div class="wzt2">{{cardData.user_id_card}}</div>
          </div>
          <div class="tesmk">
            <img src="../../../assets/images/xqt5.png" />
            <div class="wzt1">注册时间</div>
            <div class="wzt2">{{cardData.user_reg_time}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //数据
      cardData: [],
      //数据
      cardData2: []
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
        "/apply/userrequest",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            this.cardData = res.data;
            this.loadingData2(id);
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
};
</script>
<style scoped>
/* 用户详情 */
.yonhxq {
  width: 1680px;
  height: 380px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: #ffffff;
  border: 1px solid rgba(231, 233, 234, 1);
}
.ybt {
  width: 100%;
  height: 51px;
  border-bottom: 1px #e7e9ea solid;
  line-height: 51px;
  text-indent: 30px;
  font-size: 16px;
}
.ynrw {
  width: 100%;
  height: 328px;
  display: flex;
}
.mk1 {
  width: 326px;
  height: 100%;
  margin-left: 34px;
}
.mk1 img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 65px;
  height: 65px;
  margin-top: 34px;
}
.mk1 dl {
  font-size: 14px;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
}
.mk1 .btq {
  width: 80px;
  height: 24px;
  background: rgba(3, 122, 255, 1);
  border-radius: 12px;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
  line-height: 24px;
}
.mk1 .daljyk {
  width: 326px;
  height: 103px;
  background: rgba(243, 247, 250, 1);
  display: flex;
}
.tlljb {
  flex: 1;
  height: 100%;
}
.tlljb dl {
  font-size: 14px;
  text-align: center;
  margin-top: 25px;
  margin-bottom: 15px;
}
.btqtt {
  width: 98px;
  height: 24px;
  border-radius: 12px;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  line-height: 24px;
}
.mk2 {
  flex: 1;
  height: 100%;
  font-size: 14px;
  margin-left: 50px;
}
.tesmk {
  width: 100%;
  display: flex;
  margin-top: 30px;
  margin-bottom: 40px;
}
.tesmk img {
  display: block;
  width: 20px;
  height: 20px;
  margin-right: 20px;
}
.tesmk .wzt1 {
  width: 85px;
  font-size: 14px;
  margin-right: 20px;
}
.tesmk .wzt2 {
  flex: 1;
  font-size: 14px;
}
</style>