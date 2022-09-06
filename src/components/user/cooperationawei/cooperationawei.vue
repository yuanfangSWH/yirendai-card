<template>
  <div class="layer">
    <!-- 返回 -->
    <div class="zjfh">
      <router-link to="/cooperation">
        <div class="fhan">返回</div>
      </router-link>
    </div>
    <!-- 用户详情 -->
    <div class="yonhxq">
      <div class="ytlja">
        <div class="ybt">用户详情</div>
        <div class="ynrw">
          <div class="mk1">
            <img :src="cardData.user_avatar" />
            <dl>{{cardData.user_nickname}}</dl>
            <div class="btq">合伙人</div>
          </div>
          <div class="daljyk">
            <div class="tlljb">
              <dl>{{cardData.tdnum}}人</dl>
              <div class="btqtt" style="background:rgba(3,122,255,1);">团队人数</div>
              <dl>{{cardData.partnernum}}人</dl>
              <div class="btqtt" style="background:rgba(3,122,255,1);">直推合伙</div>
            </div>
            <div class="tlljb">
              <dl>{{cardData.tdmoney}}元</dl>
              <div class="btqtt" style="background:rgba(255,175,3,1);">团队业绩</div>
              <dl>{{cardData.grmoney}}元</dl>
              <div class="btqtt" style="background:rgba(255,175,3,1);">个人业绩</div>
            </div>
          </div>
          <div class="mk2">
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
              <img src="../../../assets/images/xqt5.png" />
              <div class="wzt1">注册时间</div>
              <div class="wzt2">{{cardData.user_reg_time}}</div>
            </div>
            <div class="tesmk">
              <img src="../../../assets/images/xqt6.png" />
              <div class="wzt1">用户余额</div>
              <div class="wzt2">{{cardData.user_money}}元</div>
            </div>
          </div>
        </div>
      </div>
      <div class="ytljb">
        <div class="ybt">订单数据</div>
        <div class="ydblt">
          <div class="moktdiv">
            <dl class="dli1">昨日收入</dl>
            <dl class="dli2">
              {{cardData2.zrmoney}}
              <span>元</span>
            </dl>
          </div>
          <div class="moktdiv">
            <dl class="dli1">上月收入</dl>
            <dl class="dli2">
              {{cardData2.symoney}}
              <span>元</span>
            </dl>
          </div>
          <div class="moktdiv">
            <dl class="dli1">累计收入</dl>
            <dl class="dli2">
              {{cardData2.zmoney}}
              <span>元</span>
            </dl>
          </div>
          <div class="moktdiv">
            <dl class="dli1">昨日办卡订单</dl>
            <dl class="dli2">
              {{cardData2.yeshcard}}
              <span>件</span>
            </dl>
          </div>
          <div class="moktdiv">
            <dl class="dli1">上月办卡订单</dl>
            <dl class="dli2">
              {{cardData2.lmoncard}}
              <span>件</span>
            </dl>
          </div>
          <div class="moktdiv">
            <dl class="dli1">累计办卡订单</dl>
            <dl class="dli2">
              {{cardData2.znum}}
              <span>件</span>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <!-- 图表 -->
    <div class="chart">
      <div class="tb-bt">
        数据报表
        <span>（最近30天）</span>
      </div>
      <div class="tb-nr">
        <ve-line :data="chartData" :settings="chartSettings"></ve-line>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    this.chartSettings = {
      metrics: ["申请订单", "返佣订单"],
      dimension: ["日期"]
    };
    return {
      //数据
      cardData: [],
      //数据2
      cardData2: [],
      // 图表数据
      chartData: {
        columns: ["日期", "申请订单", "返佣订单"],
        rows: []
      }
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
        "/partner/userrequest",
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
    },
    //加载数据2
    loadingData2(id) {
      var data = {
        user_id: id
      };
      this.api.apiPost(
        "/partner/orderdata",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            this.cardData2 = res.data;
            this.loadingData4(id);
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
    //加载数据4
    loadingData4(id) {
      var data = {
        user_id: id
      };
      this.api.apiPost(
         "/partner/hhdata",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            //报表数据
            for(var i = 0;i<res.data.length;i++){
              this.chartData.rows.push({ '日期': res.data[i].sjbbtime, '申请订单': res.data[i].apply, '返佣订单': res.data[i].return });
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
    }
  }
};
</script>
<style scoped>
/* 图表 */
.chart {
  width: 1680px;
  height: 460px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
  background-color: #ffffff;
  border: 1px solid rgba(231, 233, 234, 1);
}
.tb-bt {
  width: 100%;
  height: 56px;
  line-height: 56px;
  font-size: 15px;
  text-indent: 20px;
}
.tb-bt span {
  color: #9b9b9b;
}
.tb-nr {
  width: 100%;
  height: 814px;
}
/* 用户详情 */
.moktdiv {
  width: 200px;
  height: 92px;
  background: rgba(243, 247, 250, 1);
  margin-top: 18px;
  margin-left: 40px;
}
.dli1 {
  font-size: 14px;
  color: #868d9c;
  text-align: center;
  margin-top: 18px;
}
.dli2 {
  font-size: 24px;
  color: #5e6575;
  text-align: center;
  margin-top: 10px;
}
.dli2 span {
  font-size: 16px;
}
.ytljb {
  flex: 1;
  height: 100%;
  background-color: #ffffff;
}
.ydblt {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.yonhxq {
  width: 1680px;
  height: 310px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  margin-bottom: 15px;
  border: 1px solid rgba(231, 233, 234, 1);
  display: flex;
}
.ytlja {
  height: 100%;
  width: 896px;
  background-color: #ffffff;
  margin-right: 20px;
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
  height: 258px;
  display: flex;
}
.mk1 {
  width: 200px;
  height: 100%;
}
.mk1 img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 65px;
  height: 65px;
  margin-top: 60px;
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
.daljyk {
  width: 344px;
  height: 199px;
  background: rgba(243, 247, 250, 1);
  display: flex;
  margin-top: 30px;
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