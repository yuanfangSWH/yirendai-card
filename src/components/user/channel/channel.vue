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
          <div class="li">渠道名称</div>
          <div class="li">用户名</div>
          <div class="li">余额</div>
          <div class="li">团队人数</div>
          <div class="li">直推合伙人</div>
          <div class="li">累计收入</div>
          <div class="li">注册时间</div>
          <div class="li">状态</div>
          <div class="li">操作</div>
        </div>
        <div class="title" v-for="(item,key) in cardData" :key="key">
          <div class="li">{{item.user_id}}</div>
          <div class="li">
            <img :src="item.user_avatar" />
          </div>
          <div class="li">{{item.user_name}}</div>
          <div class="li">{{item.user_nickname}}</div>
          <div class="li">{{item.user_money}}元</div>
          <div class="li">{{item.hhnum}}人</div>
          <div class="li">{{item.hhnum}}人</div>
          <div class="li">{{item.money}}</div>
          <div class="li">{{item.user_reg_time}}</div>
          <div class="li">{{item.user_status}}</div>
          <div class="li" style="text-align: left;">
            <span class="li-abq1" @click="skxq(item.user_id)">详情</span>
            <span class="li-abq2" @click="wskbj(item.user_id)">编辑</span>
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
      //分页
      page: 1,
      //数据
      cardData: "",
      //总数据
      totalCount: 1
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
        search: this.searchData
      };
      this.api.apiPost(
        "/channel/index",
        "get",
        "",
        params,
        (status, judge, res) => {
          if (status) {
            this.cardData = res.data.user;
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
    //编辑
    wskbj(id) {
      this.$router.push({
        path: "/channelbj",
        query: {
          id: id
        }
      });
    },
    //详情
    skxq(id) {
      this.$router.push({
        path: "/channela",
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
  margin-left: 40px;
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