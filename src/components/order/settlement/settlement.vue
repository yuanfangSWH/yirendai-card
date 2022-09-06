<template>
  <div class="layer">
    <!-- 一键打款 -->
    <div class="black-div" v-if="exitBounced1">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">批量结算</div>
        </div>
        <div class="b-nr">
          <div class="tebdwz2">是否将【{{number}}】条订单一键打款?</div>
          <div class="b-ann" style="padding-top: 10px;">
            <el-button class="b-ant" @click="Qshe(2)">取消审核</el-button>
            <el-button type="primary" @click="Qshe(3)">确认审核</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 结算打款 -->
    <div class="black-div" v-if="exitBounced2">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">结算打款</div>
        </div>
        <div class="b-nr">
          <div class="tixdwz">
            <div class="blzbw">
              <div class="yhdmz" style="padding-top: 20px;">申请人姓名：{{xuanzdshuj.apply_username}}</div>
              <div class="yhdmz">申请人手机号：{{xuanzdshuj.apply_phone}}</div>
              <div class="yhdmz">产品名称：{{xuanzdshuj.bank_card_name}}</div>
            </div>
            <div class="blzbw">
              <div class="tebdshur">
                平台收益：
                {{xuanzdshuj.pt_money}}元
              </div>
              <div class="tebdshur">
                用户收益：
                {{xuanzdshuj.user_money}}元
              </div>
              <div class="tebdshur">
                上级返佣：
                {{xuanzdshuj.p_user_money}}元
              </div>
              <div class="tebdshur">
                越级返佣：
                {{xuanzdshuj.pp_user_money}}元
              </div>
            </div>
          </div>
          <div class="b-ann" style="padding-top: 10px;">
            <el-button class="b-ant" @click="Jshun(2)">取消审核</el-button>
            <el-button type="primary" @click="Jshun(3)">确认审核</el-button>
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
        <div class="an">搜索</div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="list-div">
      <div class="l-tab">
        <div class="tab-div tab-a" v-bind:class="{ choose: state==1 }" @click="tab(1)">待结算</div>
        <div class="tab-div tab-b" v-bind:class="{ choose: state==2 }" @click="tab(2)">已结算</div>
      </div>
      <!-- 待查询 -->
      <div class="l-nr-a" v-show="state==1">
        <!-- 选择条件 -->
        <div class="xuanxi">
          <div class="dldm">
            <div class="szkrq">输入订单数：</div>
            <div class="tbdxzd">
              <el-input
                class="tebddinne"
                type="primary"
                placeholder="输入订单数量"
                v-model="searchData"
                clearable
              ></el-input>条
              <span class="zjdtin">按条全选</span>
            </div>
            <div class="tebantg" @click="Qshe(1)">一键打款</div>
          </div>
        </div>
        <div class="title">
          <div class="li">
            <el-button @click="setAllNo">全选/反选</el-button>
          </div>
          <div class="li">编号</div>
          <div class="li">用户头像</div>
          <div class="li">用户ID</div>
          <div class="li">申请人姓名</div>
          <div class="li">申请人手机号</div>
          <div class="li" style="flex:2;">申请人身份证</div>
          <div class="li">平台收益</div>
          <div class="li">用户返佣</div>
          <div class="li">上级返佣</div>
          <div class="li">越级返佣</div>
          <div class="li">产品名称</div>
          <div class="li">订单号</div>
          <div class="li">提交时间</div>
          <div class="li">操作</div>
        </div>
        <div class="title" v-for="(item,key) in cardData" :key="key">
          <div class="li">
            <input type="checkbox" name="love" v-model="groupData" :value="item.apply_id" />
          </div>
          <div class="li">{{key}}</div>
          <div class="li">
            <img :src="item.user_avatar" />
          </div>
          <div class="li">{{item.user_id}}</div>
          <div class="li">{{item.apply_username}}</div>
          <div class="li">{{item.apply_phone}}</div>
          <div class="li" style="flex:2;">{{item.apply_idcard}}</div>
          <div class="li">{{item.pt_money}}元</div>
          <div class="li">{{item.user_money}}元</div>
          <div class="li">{{item.p_user_money}}元</div>
          <div class="li">{{item.pp_user_money}}元</div>
          <div class="li">{{item.bank_card_name}}</div>
          <div class="li">{{item.apply_id}}</div>
          <div class="li">{{item.apply_time}}</div>
          <div class="li" style="text-align: left;">
            <!-- <span class="li-abq1" style="color: #E52E16;">撤回</span> -->
            <span class="li-abq2" style="color: #037aff;" @click="Jshun(1,item)"  >结算</span>
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
      <!-- 已完成 -->
      <div class="l-nr-a" v-show="state==2">
        <div class="title">
          <div class="li">编号</div>
          <div class="li">用户头像</div>
          <div class="li">用户ID</div>
          <div class="li">申请人姓名</div>
          <div class="li">申请人手机号</div>
          <div class="li" style="flex:2;">申请人身份证</div>
          <div class="li">平台收益</div>
          <div class="li">用户返佣</div>
          <div class="li">上级返佣</div>
          <div class="li">越级返佣</div>
          <div class="li">产品名称</div>
          <div class="li">订单号</div>
          <div class="li">提交时间</div>
        </div>
        <div class="title" v-for="(item,key) in cardData" :key="key">
          <div class="li">{{key}}</div>
          <div class="li">
            <img :src="item.user_avatar" />
          </div>
          <div class="li">{{item.user_id}}</div>
          <div class="li">{{item.apply_username}}</div>
          <div class="li">{{item.apply_phone}}</div>
          <div class="li" style="flex:2;">{{item.apply_idcard}}</div>
          <div class="li">{{item.pt_money}}元</div>
          <div class="li">{{item.user_money}}元</div>
          <div class="li">{{item.p_user_money}}元</div>
          <div class="li">{{item.pp_user_money}}元</div>
          <div class="li">{{item.bank_card_name}}</div>
          <div class="li">{{item.apply_id}}</div>
          <div class="li">{{item.apply_time}}</div>
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
import { Loading } from "element-ui";
export default {
  data() {
    return {
      //切换状态
      state: 1,
      //条件
      conditions: 5,
      //搜索数据
      searchData: "",
      //分页
      page: 1,
      //总数据量
      totalCount: 1,
      //数据
      cardData: [],
      //结算打款
      exitBounced1: false,
      //一键打款
      exitBounced2: false,
      //全选数据
      checkAll: true,
      //选中的数据id
      groupData: [],
      //数据数量
      number: 1,
      //当前选中的数据
      xuanzdshuj: []
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
        //初始化分页
        this.page = 1;
        this.state = value;
        if (value == 1) {
          //待查询
          this.conditions = 5;
          this.loadingData();
        } else {
          //待审核
          this.conditions = 1;
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
    //全选/全不选操作
    setAllNo() {
      //初始化数据
      this.groupData = [];
      var loves = document.getElementsByName("love");
      if (this.checkAll) {
        this.checkAll = false;
        for (var i = 0; i < loves.length; i++) {
          loves[i].checked = true;
          //数据添加
          this.groupData.push(loves[i].value);
        }
      } else {
        this.checkAll = true;
        //数据清空
        this.groupData = [];
        for (var i = 0; i < loves.length; i++) {
          loves[i].checked = false;
        }
      }
    },

    //加载数据
    loadingData() {
      var params = {
        //分页
        page: this.page,
        //搜索
        search: this.searchData,
        //条件
        status: this.conditions
      };
      this.api.apiPost(
        "/settlement/index",
        "get",
        "",
        params,
        (status, judge, res) => {
          if (status) {
            this.cardData = res.data.apply;
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
    //一键结算的弹框
    Qshe(value) {
      if (this.groupData != "") {
        if (value == 1) {
          this.exitBounced1 = true;
          this.number = this.groupData.length;
        } else if (value == 2) {
          this.exitBounced1 = false;
        } else if (value == 3) {
          this.exitBounced1 = false;
          this.yijsh();
        }
      }
    },
    //一键API
    yijsh() {
      var data = {
        //订单ID
        ids: this.groupData
      };
      this.api.apiPost(
        "/applycard/jiesuanall",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            this.loadingData();
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
    //结算的弹框
    Jshun(value,data) {
        if (value == 1) {
          this.xuanzdshuj = data;
          this.exitBounced2 = true;
        } else if (value == 2) {
          this.exitBounced2 = false;
        } else if (value == 3) {
          this.exitBounced2 = false;
          this.chehdin();
        }
    },
    //结算
    chehdin(id) {
      var data = {
        //订单ID
        id: this.xuanzdshuj.apply_id
      };
      this.api.apiPost(
        "/applycard/jiesuan",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            this.xuanzdshuj = [];
            this.loadingData();
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
    }
  }
};
</script>
<style scoped>
span {
  color: #037aff;
}
.li-abq1 {
  margin-left: 20px;
}
.li-abq2 {
  margin-left: 40px;
  color: #e52e16;
}
.li img {
  width: 50px;
  height: 50px;
  padding-top: 5px;
}
/* 选择条件 */
.xuanxi {
  width: 100%;
  height: 82px;
  border-bottom: 1px #e7e9ea solid;
}
.zjdtin {
  line-height: 81px;
  font-size: 14px;
  color: #037aff;
  margin-left: 30px;
  cursor: pointer;
}
.dldm {
  width: 100%;
  height: 81px;
  display: flex;
  line-height: 81px;
  font-size: 14px;
}
.xiwz {
  width: 128px;
  height: 100%;
  text-align: center;
}
.xidiv {
  width: 220px;
  height: 100%;
}
.xiteb {
  flex: 1;
  height: 100%;
}
.tesdind {
  width: 320px;
  height: 100%;
  float: right;
}
.tebddinne {
  width: 190px;
  margin-right: 10px;
}
.szkrq {
  width: 128px;
  height: 100%;
  text-align: center;
}
.tbdxzd {
  flex: 1;
  height: 100%;
}
.tebantg {
  width: 100px;
  height: 40px;
  margin-right: 44px;
  background: rgba(3, 122, 255, 1);
  text-align: center;
  line-height: 40px;
  color: #ffffff;
  margin-top: 20px;
}
.tbdxzd span {
  padding-left: 10px;
  padding-right: 10px;
}
/* 弹框 */
.bounced {
  width: 650px;
  height: 380px;
  background: rgba(255, 255, 255, 1);
  position: relative;
  top: 50%;
  margin-top: -235px;
  left: 50%;
  margin-left: -325px;
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
  width: 100%;
  display: flex;
}
.blzbw {
  flex: 1;
}
.yhdmz {
  font-size: 14px;
  color: #404448;
  text-indent: 60px;
  line-height: 80px;
}
.tebd {
  width: 152px;
  margin-left: 10px;
  margin-right: 10px;
}
.tebdshur {
  width: 100%;
  height: 42px;
  font-size: 14px;
  color: #404448;
  line-height: 42px;
  display: flex;
  padding-top: 16px;
}
.tebdwz2 {
  color: #404448;
  font-size: 14px;
  text-align: center;
  padding-top: 130px;
  padding-bottom: 90px;
}
.tebdxial {
  width: 300px;
  height: 42px;
  font-size: 14px;
  color: #404448;
  line-height: 42px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 50px;
}
</style>