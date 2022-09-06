<template>
  <div class="tps-m">
    <div class="fruit">
      <div class="bgsj">
        <el-row style="padding-top: 13px;">
          <el-col :span="3">
            <div class="seiv liys">-商品-</div>
          </el-col>
          <el-col :span="3">
            <div class="seiv liys">-顾客-</div>
          </el-col>
          <el-col :span="4">
            <div class="seiv liys">-地址-</div>
          </el-col>
          <el-col :span="8">
            <div class="seiv liys">-留言-</div>
          </el-col>
          <el-col :span="2">
            <div class="seiv liys">-金额-</div>
          </el-col>
          <el-col :span="4">
            <div class="seiv liys">-日期-</div>
          </el-col>
        </el-row>
        <el-row v-for="item in searchResult" :key="item.id">
          <el-col :span="3">
            <div class="seiv">{{ item.goods }}</div>
          </el-col>
          <el-col :span="3">
            <div class="seiv">{{ item.name }}</div>
          </el-col>
          <el-col :span="4">
            <div class="seiv">{{ item.city }}</div>
          </el-col>
          <el-col :span="8">
            <div class="seiv">{{ item.csentence }}</div>
          </el-col>
          <el-col :span="2">
            <div class="seiv">{{ item.money }}</div>
          </el-col>
          <el-col :span="4">
            <div class="seiv">{{ item.time }}</div>
          </el-col>
        </el-row>
        <div class="gdfyb">
          <div class="fenysj">
            <el-pagination
              @prev-click="before"
              @next-click="next"
              @current-change="change"
              background
              layout="prev, pager, next"
              :total="50"
            ></el-pagination>
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
      searchResult: [],
      //页数
      page: 1,
      //数量
      pageSize: 10
    };
  },
  created() {
    this.pullData();
  },
  methods: {
    pullData() {
      let token = localStorage.getItem("landing");
      if (token == null || token == "") {
        this.$message({
          showClose: true,
          message: "登陆已过期",
          type: "warning",
          position: "bottom-right"
        });
        this.$router.push("/home");
      } else {
        this.api.apiPost(
          "/pull/goods?page=" + this.page + "&pageSize=" + this.pageSize,
          null,
          (status, res) => {
            if (status) {
              this.searchResult = res.data.order;
            } else {
              this.$message({
                showClose: true,
                message: "数据获取失败",
                type: "error",
                position: "bottom-right"
              });
            }
          },
          "get"
        );
      }
    },
    before() {
      if (this.page > 1) {
        this.page--;
      }
    },
    next() {
      if (this.page < 5) {
        this.page++;
      }
    },
    change() {
      this.pullData();
    }
  }
};
</script>

<style scoped>
.fruit {
  width: 1300px;
  height: 570px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  -moz-border-radius: 15px;
  -webkit-border-radius: 15px;
  border-radius: 15px;
  background: rgba(66, 161, 141, 0.8);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.bgsj {
  width: 1200px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
.gdfyb {
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 15px;
}
.fenysj {
  width: 290px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}
.el-row {
  border-bottom: 1px #fff dashed;
}
.seiv {
  height: 44px;
  font-size: 16px;
  text-align: center;
  line-height: 44px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.liys {
  font-size: 20px;
}
</style>
