<template>
  <div class="layer">
    <!-- 统计 -->
    <div class="statistical">
      <div class="tonj">
        <div class="t-bt">平台注册用户统计</div>
        <div class="t-nr">
          <div class="t-img">
            <img src="../../assets/images/yhtb1.png" />
          </div>
          <div class="t-wz">
            <div class="t-wzt1">总注册用户</div>
            <div class="t-wzt2">
              {{cardData.usernum}}
              <span>人</span>
            </div>
          </div>
          <div class="t-img">
            <img src="../../assets/images/yhtb2.png" />
          </div>
          <div class="t-wz">
            <div class="t-wzt1">今日新增用户</div>
            <div class="t-wzt2">
              {{cardData.todayusernum}}
              <span>人</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tonj tbldt">
        <div class="t-bt">订单注册统计</div>
        <div class="t-nr">
          <div class="t-img">
            <img src="../../assets/images/bjtb1.png" />
          </div>
          <div class="t-wz">
            <div class="t-wzt1">总订单注册量</div>
            <div class="t-wzt2">
              {{cardData.applynum}}
              <span>件</span>
            </div>
          </div>
          <div class="t-img">
            <img src="../../assets/images/bjtb2.png" />
          </div>
          <div class="t-wz">
            <div class="t-wzt1">总审核订单量</div>
            <div class="t-wzt2">
              {{cardData.applyshnum}}
              <span>件</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tonj">
        <div class="t-bt">信用卡产品统计</div>
        <div class="t-nr">
          <div class="t-img">
            <img src="../../assets/images/yhktb1.png" />
          </div>
          <div class="t-wz">
            <div class="t-wzt1">总信用卡产品量</div>
            <div class="t-wzt2">
              {{cardData.bankcardnum}}
              <span>件</span>
            </div>
          </div>
          <div class="t-img">
            <img src="../../assets/images/yhktb2.png" />
          </div>
          <div class="t-wz">
            <div class="t-wzt1">今日新增信用卡产品量</div>
            <div class="t-wzt2">
              {{cardData.todaycard}}
              <span>件</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分析 -->
    <div class="calculate">
      <div class="c-bt">今日昨天各时段收益分析</div>
      <div class="c-nr">
        <div class="c-nrdind" style="margin-left: 50px;">
          <dl class="c-wz1">今日申请订单</dl>
          <dl class="c-wz2">(0点到当前)</dl>
          <dl class="c-wz3">
            {{cardData2.applyjr}}
            <span>件</span>
          </dl>
        </div>
        <div class="c-nrdind">
          <dl class="c-wz1">今日返佣订单</dl>
          <dl class="c-wz2">(0点到当前)</dl>
          <dl class="c-wz3">
            {{cardData2.applyjrfy}}
            <span>件</span>
          </dl>
        </div>
        <div class="c-nrdind">
          <dl class="c-wz1">今日预估收入</dl>
          <dl class="c-wz2">(0点到当前)</dl>
          <dl class="c-wz3">
            {{cardData2.applyjrsr}}
            <span>元</span>
          </dl>
        </div>
        <div class="c-nrdind">
          <dl class="c-wz1">昨日申请订单</dl>
          <dl class="c-wz2">(0点到当前)</dl>
          <dl class="c-wz3">
            {{cardData2.applyzr}}
            <span>件</span>
          </dl>
        </div>
        <div class="c-nrdind">
          <dl class="c-wz1">昨日返佣订单</dl>
          <dl class="c-wz2">(0点到当前)</dl>
          <dl class="c-wz3">
            {{cardData2.applyzrfy}}
            <span>件</span>
          </dl>
        </div>
        <div class="c-nrdind">
          <dl class="c-wz1">昨日预估收入</dl>
          <dl class="c-wz2">(0点到当前)</dl>
          <dl class="c-wz3">
            {{cardData2.applyzrsr}}
            <span>元</span>
          </dl>
        </div>
      </div>
    </div>
    <!-- 图表 -->
    <div class="chart">
      <div class="tb-bt">
        实时数据
        <span>（统计时间：{{shijData}}）</span>
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
      metrics: ["今日申请订单", "昨日申请订单"],
      dimension: ["日期"]
    };
    return {
      //统计数据
      cardData: [],
      //收益数据
      cardData2: [],
      //图表时间
      shijData: "",
      // 图表数据
      chartData: {
        columns: ["日期", "今日申请订单", "昨日申请订单"],
        rows: []
      }
    };
  },
  //生命周期-页面初始化完成加载
  created() {
    this.loadingData();
    this.loadingData2();
    this.loadingData3();
  },
  methods: {
    //加载统计数据
    loadingData() {
      this.api.apiPost(
        "/data/totaldata",
        "get",
        "",
        "",
        (status, judge, res) => {
          if (status) {
            this.cardData = res.data;
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
    //加载收益数据
    loadingData2() {
      this.api.apiPost(
        "/data/applynum",
        "get",
        "",
        "",
        (status, judge, res) => {
          if (status) {
            this.cardData2 = res.data;
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
    //加载报表数据
    loadingData3() {
      this.api.apiPost("/data/hhdata", "get", "", "", (status, judge, res) => {
        if (status) {
          //报表数据
          for (var i = 0; i < res.data.length; i++) {
            this.chartData.rows.push({
              日期: res.data[i].sjbbtime,
              今日申请订单: res.data[i].apply,
              昨日申请订单: res.data[i].applyzr
            });
            var lengthFK = res.data.length;
            //统计时间
            this.shijData = res.data[lengthFK - 1].sjbbtime;
          }
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: "error",
            position: "bottom-right"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
/* 图表 */
.chart {
  width: 1680px;
  height: auto;
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
/* 分析 */
.calculate {
  width: 1680px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
  background-color: #ffffff;
  border: 1px solid rgba(231, 233, 234, 1);
}
.c-bt {
  width: 100%;
  height: 56px;
  line-height: 56px;
  font-size: 15px;
  text-indent: 20px;
  border-bottom: 1px #b5adac solid;
}
.c-nr {
  width: 100%;
  height: 246px;
  display: flex;
}
.c-nrdind {
  width: 230px;
  height: 150px;
  margin-top: 48px;
  margin-left: 40px;
  background-color: #f3f7fa;
}
.c-wz1 {
  text-align: center;
  font-size: 20px;
  color: #868d9c;
  padding-top: 26px;
}
.c-wz2 {
  text-align: center;
  font-size: 14px;
  color: #b6bcca;
  padding-top: 10px;
}
.c-wz3 {
  text-align: center;
  font-size: 32px;
  color: #5e6575;
  padding-top: 14px;
}
.c-wz3 span {
  font-size: 16px;
}
/* 统计css */
.statistical {
  width: 1680px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  padding-top: 15px;
  margin-bottom: 15px;
}
.tonj {
  width: 550px;
  height: 100%;
  background-color: #ffffff;
  border: 1px solid rgba(231, 233, 234, 1);
}
.t-bt {
  width: 100%;
  height: 56px;
  line-height: 56px;
  font-size: 15px;
  text-indent: 20px;
  border-bottom: 1px #b5adac solid;
}
.t-nr {
  width: 100%;
  height: 108px;
  display: flex;
}
.t-img {
  width: 56px;
  height: 56px;
  margin-left: 50px;
  margin-right: 20px;
  margin-top: 23px;
}
.t-img img {
  width: 56px;
  height: 56px;
}
.t-wz {
  width: 160px;
  height: 56px;
  margin-top: 23px;
}
.t-wzt1 {
  font-size: 14px;
  line-height: 28px;
  color: #adadad;
}
.t-wzt2 {
  font-size: 22px;
}
.t-wzt2 span {
  font-size: 14px;
}
.tbldt {
  margin-left: 10px;
  margin-right: 10px;
}
</style>