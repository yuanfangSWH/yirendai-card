<template>
  <div class="layer">
    <!-- 分析 -->
    <div class="calculate">
      <div class="c-bt" style="color:#037AFF;font-weight:bold;">
        <div class="tebdkk">数据统计</div>
      </div>
      <div class="c-nr">
        <div class="c-nrdind" style="margin-left: 50px;">
          <dl class="c-wz1">本周申请订单</dl>
          <dl class="c-wz2">(近7日)</dl>
          <dl class="c-wz3">
            {{thisweeksq}}
            <span>件</span>
          </dl>
        </div>
        <div class="c-nrdind">
          <dl class="c-wz1">本周返佣订单</dl>
          <dl class="c-wz2">(近7日)</dl>
          <dl class="c-wz3">
            {{lastweekfy}}
            <span>件</span>
          </dl>
        </div>
        <div class="c-nrdind">
          <dl class="c-wz1">本周预估收入</dl>
          <dl class="c-wz2">(近7日)</dl>
          <dl class="c-wz3">
            {{thisweeksr}}
            <span>元</span>
          </dl>
        </div>
        <div class="c-nrdind">
          <dl class="c-wz1">上周申请订单</dl>
          <dl class="c-wz2">(近7日)</dl>
          <dl class="c-wz3">
            {{lastweeksq}}
            <span>件</span>
          </dl>
        </div>
        <div class="c-nrdind">
          <dl class="c-wz1">上周返佣订单</dl>
          <dl class="c-wz2">(近7日)</dl>
          <dl class="c-wz3">
            {{lastweekfy}}
            <span>件</span>
          </dl>
        </div>
        <div class="c-nrdind">
          <dl class="c-wz1">上周预估收入</dl>
          <dl class="c-wz2">(近7日)</dl>
          <dl class="c-wz3">
            {{lastweeksr}}
            <span>元</span>
          </dl>
        </div>
      </div>
    </div>
    <!-- 图表 -->
    <div class="chart">
      <div class="tb-bt" style="font-weight:bold;">
        实时数据
        <span>（最近一个月）</span>
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
      metrics: ["申请订单", "批核订单", "申请人数"],
      dimension: ["日期"]
    };
    return {
      //上周申请订单
      lastweeksq: "",
      //本周申请订单
      thisweeksq: "",
      //上周收入
      lastweeksr: "",
      //上周收入
      thisweeksr: "",
      //上周返佣订单
      lastweekfy: "",
      //上周返佣订单
      thisweekfy: "",
      // 图表数据
      chartData: {
        columns: ["日期", "申请订单", "批核订单", "申请人数"],
        rows: []
      }
    };
  },
  //生命周期-页面初始化完成加载
  created() {
    this.loadingData();
  },
  methods: {
    //加载数据
    loadingData(id) {
      this.api.apiPost(
        "/cashlist/orderdata",
        "get",
        "",
        "",
        (status, judge, res) => {
          if (status) {
            //上周申请订单
            this.lastweeksq = res.data.lastweeksq;
            //本周申请订单
            this.thisweeksq = res.data.thisweeksq;
            //上周收入
            this.lastweeksr = res.data.lastweeksr;
            //上周收入
            this.thisweeksr = res.data.thisweeksr;
            //上周返佣订单
            this.lastweekfy = res.data.lastweekfy;
            //上周返佣订单
            this.thisweekfy = res.data.thisweekfy;
            this.loadingData2();
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
    loadingData2() {
      this.api.apiPost(
        "/cashlist/hhdata",
        "get",
        "",
        "",
        (status, judge, res) => {
          if (status) {
            //报表数据
            for (var i = 0; i < res.data.length; i++) {
              this.chartData.rows.push({
                '日期': res.data[i].sjbbtime,
                '申请订单': res.data[i].apply,
                '批核订单': res.data[i].return,
                '申请人数':res.data[i].applyuser
              });
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
  margin-top: 15px;
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