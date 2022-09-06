<template>
  <div class="layer">
    <!-- 下架 -->
    <div class="black-div" v-if="exitBounced">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">提现通过</div>
        </div>
        <div class="b-nr">
          <div class="tixdwz" style="padding-top: 35px;">
            <div>用户姓名：{{valueData.user_nickname}}</div>
            <div class="tixwz2">用户手机号：{{valueData.take_phone}}</div>
          </div>
          <div class="tixdwz">提现卡号：{{valueData.take_card}}</div>
          <div class="tixdwz">提现渠道：{{valueData.take_status}}</div>
          <div class="tixdwz">提现金额：{{valueData.take_money}}元</div>
          <div class="b-ann">
            <el-button class="b-ant" @click="shelves(2)">取消通过</el-button>
            <el-button type="primary" @click="shelves(3,valueData)">确认通过</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索 -->
    <div class="search-div">
      <div class="s-srk">
        <img class="s-tb" src="../../../assets/images/soutb.png" />
        <div class="srk">
          <el-input
            class="s-input"
            type="primary"
            placeholder="输入平台用户ID进行搜索"
            v-model="searchData"
            clearable
          ></el-input>
        </div>
        <div class="an" @click="loadingData">搜索</div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="list-div">
      <!-- 已推广用户 -->
      <div class="l-nr-a">
        <div class="title">
          <div class="li">编号</div>
          <div class="li">用户头像</div>
          <div class="li">用户ID</div>
          <div class="li">用户名</div>
          <div class="li">手机号</div>
          <div class="li">用户等级</div>
          <div class="li">姓名</div>
          <div class="li">提现渠道</div>
          <div class="li">提现卡号</div>
          <div class="li">提现金额</div>
          <div class="li">订单号</div>
          <div class="li">提交时间</div>
          <div class="li">操作</div>
        </div>
        <div class="title" v-for="(item,key) in cardData" :key="key">
          <div class="li">{{key}}</div>
          <div class="li">
            <img :src="item.user_avatar" />
          </div>
          <div class="li">{{item.user_id}}</div>
          <div class="li">{{item.user_nickname}}</div>
          <div class="li">{{item.take_phone}}</div>
          <div class="li">
            <span v-if="item.user_is_hehuo==1">合伙人</span>
            <span v-else>普通用户</span>
          </div>
          <div class="li">{{item.take_name}}</div>
          <div class="li">(未定)</div>
          <div class="li">{{item.take_card}}</div>
          <div class="li">{{item.take_money}}元</div>
          <div class="li">(未定)</div>
          <div class="li">{{item.take_time}}</div>
          <div class="li" style="text-align: left;">
            <span class="li-abq2" @click="shelves(1,item)">通过</span>
          </div>
        </div>
        <div class="paging">
          <el-pagination
            background
            layout="prev, pager, next, jumper"
            :page-size="10"
            :total="totalCount"
            @current-change="jumpData"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      //搜索数据
      searchData: "",
      //数据
      cardData: "",
      //分页
      page: 1,
      //总数据
      totalCount: 1,
      //通过弹框
      exitBounced: false,
      //当前选择的数据
      valueData: []
    };
  },
  //生命周期-页面初始化完成加载
  created() {
    this.loadingData();
  },
  methods: {
    //加载数据
    loadingData() {
      var params = {
        page: this.page,
        search: this.searchData,
        status: 2
      };
      this.api.apiPost(
        "/cashlist/index",
        "get",
        "",
        params,
        (status, judge, res) => {
          if (status) {
            this.cardData = res.data.result;
            //总数据量
            this.totalCount = res.page.totalCount;
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
    //下一页
    jumpData(val) {
      this.page = val;
      this.loadingData();
    },
    //通过
    shelves(value, group) {
      if (value == 1) {
        this.valueData = group;
        this.exitBounced = true;
      } else if (value == 2) {
        this.exitBounced = false;
      } else if (value == 3) {
        var data = {
          take_id: group.take_id,
          user_id: group.user_id
        };
        this.api.apiPost(
          "/cashlist/adopt",
          "post",
          data,
          "",
          (status, judge, res) => {
            if (status) {
              //初始化
              this.valueData = [];
              this.loadingData();
              this.exitBounced = false;
              this.$notify({
                title: "通过成功",
                type: "success",
                position: "bottom-right"
              });
            } else {
              this.exitBounced = false;
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
a {
  color: #037aff;
}
.li-abq1 {
  margin-left: 35px;
}
.li-abq2 {
  margin-left: 50px;
  color: #037aff;
}
.li img {
  width: 50px;
  height: 50px;
  padding-top: 5px;
}
/* 通过弹框 */
.bounced {
  width: 600px;
  height: 360px;
  background: rgba(255, 255, 255, 1);
  position: relative;
  top: 50%;
  margin-top: -235px;
  left: 50%;
  margin-left: -300px;
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
.tixdwz {
  display: flex;
  font-size: 14px;
  color: #404448;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 80px;
  line-height: 20px;
}
.tixwz2 {
  padding-left: 50px;
}
.b-ann {
  padding-top: 15px;
}
</style>