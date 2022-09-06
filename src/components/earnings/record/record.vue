<template>
  <div class="layer">
    <!-- 失效订单退回 -->
    <div class="black-div" v-if="exitBounced">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">失效订单退回</div>
        </div>
        <div class="b-nr">
          <div class="tixdwz" style="padding-top: 35px;">
            <div>用户姓名：{{valueData.user_nickname}}</div>
            <div class="tixwz2">用户手机号：{{valueData.take_phone}}</div>
          </div>
          <div class="tixdwz">提现卡号：{{valueData.take_card}}</div>
          <div class="tixdwz">
            <div class="tixwz1">提现渠道：{{valueData.take_status}}</div>
            <div class="tixwz2">
              退回原因：{{valueData.getdata}}
            </div>
          </div>
          <div class="tixdwz">提现金额：{{valueData.take_money}}元</div>
          <div class="b-ann">
            <el-button class="b-ant" @click="shelves(2)">取消返回</el-button>
            <el-button type="primary" @click="shelves(3,valueData)">确认返回</el-button>
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
      <div class="l-tab">
        <div class="tab-div tab-a" v-bind:class="{ choose: state==1 }" @click="tab(1)">通过订单</div>
        <div class="tab-div tab-b" v-bind:class="{ choose: state==2 }" @click="tab(2)">失败订单</div>
      </div>
      <!-- 通过订单 -->
      <div class="l-nr-a" v-show="state==1">
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
        <div class="title" v-for="(item,key) in cardData1" :key="key">
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
            <span class="li-abq2" style="color: #8A8A8A;">通过的订单</span>
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
      <!-- 失败订单 -->
      <div class="l-nr-a" v-show="state==2">
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
        <div class="title" v-for="(item,key) in cardData2" :key="key">
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
          <div class="li">(未定)</div>
          <div class="li">{{item.take_money}}元</div>
          <div class="li">{{item.take_card}}</div>
          <div class="li">{{item.take_time}}</div>
          <div class="li" style="text-align: left;">
            <span class="li-abq2" @click="shelves(1,item)" >退回</span>
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
      //切换状态
      state: 1,
      //搜索数据
      searchData: "",
      //分页
      page: 1,
      //数据条件
      status: 1,
      //已申卡数据
      cardData1: "",
      //未申卡数据
      cardData2: "",
      //总数据
      totalCount: 1,
      //失效订单退回弹框
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
    //切换
    tab(value) {
      if (this.state == value) {
        //加载框
        let loadingInstance = Loading.service();
        setTimeout(function() {
          //关闭加载框
          loadingInstance.close();
        }, 300);
      } else {
        this.state = value;
        //初始化分页
        this.page = 1;
        if (value == 1) {
          this.status = 1;
          this.loadingData();
        } else {
          this.status = 4;
          this.loadingData();
        }
        //加载框
        let loadingInstance = Loading.service();
        setTimeout(function() {
          //关闭加载框
          loadingInstance.close();
        }, 300);
      }
    },
    //加载数据
    loadingData() {
      var params = {
        page: this.page,
        search: this.searchData,
        status: this.status
      };
      this.api.apiPost(
        "/cashlist/index",
        "get",
        "",
        params,
        (status, judge, res) => {
          if (status) {
            if (this.status == 1) {
              this.cardData1 = res.data.result;
            } else {
              this.cardData2 = res.data.result;
            }
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
    //回退
    shelves(value, group) {
      if (value == 1) {
        this.valueData = group;
        this.exitBounced = true;
      } else if (value == 2) {
        this.exitBounced = false;
      } else if (value == 3) {
        var data = {
          //提现id
          take_id: group.take_id,
          //用户id
          user_id: group.user_id,
          //原因
          reason : group.card_getdata
        };
        this.api.apiPost(
          "/cashlist/saveedit",
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
  color: #e52e16;
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
.tixwz1 {
  line-height: 28px;
}
.tixwz2 {
  padding-left: 50px;
}
.b-ann {
  padding-top: 15px;
}
</style>