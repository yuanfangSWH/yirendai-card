<template>
  <div class="layer">
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
        <div class="an" @click="search">搜索</div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="list-div">
      <div class="l-tab">
        <div class="tab-div tab-a" v-bind:class="{ choose: state==1 }" @click="tab(1)">已推广用户</div>
        <div class="tab-div tab-b" v-bind:class="{ choose: state==2 }" @click="tab(2)">未推广用户</div>
      </div>
      <!-- 已推广用户 -->
      <div class="l-nr-a" v-show="state==1">
        <div class="title">
          <div class="li">编号</div>
          <div class="li">用户头像</div>
          <div class="li">用户ID</div>
          <div class="li">用户名</div>
          <div class="li">用户等级</div>
          <div class="li">真实姓名</div>
          <div class="li">余额</div>
          <div class="li">上级用户名</div>
          <div class="li">团队人数</div>
          <div class="li">直推合伙人</div>
          <div class="li">累计收入</div>
          <div class="li">注册时间</div>
          <div class="li">状态</div>
          <div class="li">操作</div>
        </div>
        <div class="title" v-for="(item,key) in cardData1" :key="key">
          <div class="li">{{key}}</div>
          <div class="li">
            <img :src="item.user_avatar" />
          </div>
          <div class="li">{{item.user_id}}</div>
          <div class="li">{{item.user_nickname}}</div>
          <div class="li">
            <span v-if="item.user_is_hehuo==1">合伙人</span>
            <span v-else>普通用户</span>
          </div>
          <div class="li">{{item.user_name}}</div>
          <div class="li">{{item.user_money}}元</div>
          <div class="li">{{item.user_pidname}}</div>
          <div class="li">{{item.tdnum}}人</div>
          <div class="li">{{item.hhnum}}人</div>
          <div class="li">{{item.money}}</div>
          <div class="li">{{item.user_reg_time}}</div>
          <div class="li">{{item.user_status}}</div>
          <div class="li" style="text-align: left;">
            <span class="li-abq1" @click="skxq(item.user_id)">详情</span>
            <span class="li-abq2" @click="skbj(item.user_id)">编辑</span>
          </div>
        </div>
        <div class="paging">
          <el-pagination
            background
            layout="prev, pager, next, jumper"
            :total="totalCount"
            @current-change="jumpData"
          ></el-pagination>
        </div>
      </div>
      <!-- 未推广用户 -->
      <div class="l-nr-b" v-show="state==2">
        <div class="title">
          <div class="li">编号</div>
          <div class="li">用户头像</div>
          <div class="li">用户ID</div>
          <div class="li">用户名</div>
          <div class="li">用户等级</div>
          <div class="li">真实姓名</div>
          <div class="li">余额</div>
          <div class="li">上级用户名</div>
          <div class="li">团队人数</div>
          <div class="li">直推合伙人</div>
          <div class="li">累计收入</div>
          <div class="li">注册时间</div>
          <div class="li">状态</div>
          <div class="li">操作</div>
        </div>
        <div class="title" v-for="(item,key) in cardData2" :key="key">
          <div class="li">{{key}}</div>
          <div class="li">
            <img :src="item.user_avatar" />
          </div>
          <div class="li">{{item.user_id}}</div>
          <div class="li">{{item.user_nickname}}</div>
          <div class="li">
            <span v-if="item.user_is_hehuo==1">合伙人</span>
            <span v-else>普通用户</span>
          </div>
          <div class="li">{{item.user_name}}</div>
          <div class="li">{{item.user_money}}元</div>
          <div class="li">{{item.user_pidname}}</div>
          <div class="li">{{item.tdnum}}人</div>
          <div class="li">{{item.hhnum}}人</div>
          <div class="li">{{item.money}}</div>
          <div class="li">{{item.user_reg_time}}</div>
          <div class="li">{{item.user_status}}</div>
          <div class="li" style="text-align: left;">
            <span class="li-abq1" @click="wskxq(item.user_id)">详情</span>
            <span class="li-abq2" @click="wskbj(item.user_id)">编辑</span>
          </div>
        </div>
        <div class="paging">
          <el-pagination
            background
            layout="prev, pager, next,jumper"
            :page-size="10"
            :total="totalCount"
            @current-change="jumpData2"
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
      //搜索数据
      searchData: "",
      //分页
      page: 1,
      //已申卡数据
      cardData1: "",
      //未申卡数据
      cardData2: "",
      //总数据
      totalCount: 1
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
          this.loadingData();
        } else {
          this.loadingData2();
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
        search: this.searchData
      };
      this.api.apiPost(
        "/partner/index",
        "get",
        "",
        params,
        (status, judge, res) => {
          if (status) {
            this.cardData1 = res.data.result;
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
    //加载数据2
    loadingData2() {
      var params = {
        page: this.page,
        search: this.searchData
      };
      this.api.apiPost(
        "/partner/notytguser",
        "get",
        "",
        params,
        (status, judge, res) => {
          if (status) {
            this.cardData2 = res.data.result;
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
    //下一页2
    jumpData2(val) {
      this.page = val;
      this.loadingData2();
    },
    //搜索
    search() {
      if (this.state == 1) {
        this.loadingData();
      } else {
        this.loadingData2();
      }
    },
    //申卡详情
    skxq(id) {
      this.$router.push({
        path: "/cooperationa",
        query: {
          id: id
        }
      });
    },
    //申卡编辑
    skbj(id) {
      this.$router.push({
        path: "/cooperationb",
        query: {
          id: id
        }
      });
    },
    //未申卡详情
    wskxq(id) {
      this.$router.push({
        path: "/cooperationawei",
        query: {
          id: id
        }
      });
    },
    //未申卡编辑
    wskbj(id) {
      this.$router.push({
        path: "/cooperationbwei",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style scoped>
span {
  color: #037aff;
}
.li-abq1 {
  margin-left: 25px;
}
.li-abq2 {
  margin-left: 20px;
}
.li img {
  width: 50px;
  height: 50px;
  padding-top: 5px;
}
</style>