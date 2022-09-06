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
            placeholder="输入用户名和手机号码进行搜索"
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
        <div class="tab-div tab-a" v-bind:class="{ choose: state==1 }" @click="tab(1)">领取成功</div>
        <div class="tab-div tab-b" v-bind:class="{ choose: state==2 }" @click="tab(2)">已使用</div>
      </div>
      <!-- 已领取 -->
      <div class="l-nr-a" v-show="state==1">
        <div class="title">
          <div class="li">编号</div>
          <div class="li">商品图片</div>
          <div class="li">商品信息</div>
          <div class="li">剩余数量</div>
          <div class="li">商品价格</div>
          <div class="li">用户ID</div>
          <div class="li">用户姓名</div>
          <div class="li">用户手机号</div>
          <div class="li">购买口令</div>
          <div class="li">领取时间</div>
          <div class="li">操作</div>
        </div>
        <div class="title" v-for="(item,key) in cardData" :key="key">
          <div class="li">{{item.id}}</div>
          <div class="li">
            <img src="item.main_img" />
          </div>
          <div class="li">{{item.name}}</div>
          <div class="li">{{item.shop_number}}件</div>
          <div class="li">{{item.old_price}}元</div>
          <div class="li">{{item.user_id}}</div>
          <div class="li">{{item.user_name}}</div>
          <div class="li">{{item.user_phone}}</div>
          <div class="li">{{item.tkl}}</div>
          <div class="li">{{item.create_at}}</div>
          <div class="li">
            <span class="li-abq1">已领取</span>
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
      <!-- 已使用 -->
      <div class="l-nr-b" v-show="state==2">
        <div class="title">
           <div class="li">编号</div>
          <div class="li">商品图片</div>
          <div class="li">商品信息</div>
          <div class="li">剩余数量</div>
          <div class="li">商品价格</div>
          <div class="li">用户ID</div>
          <div class="li">用户姓名</div>
          <div class="li">用户手机号</div>
          <div class="li">购买口令</div>
          <div class="li">领取时间</div>
          <div class="li">操作</div>
        </div>
        <div class="title" v-for="(item,key) in cardData" :key="key">
          <div class="li">{{item.id}}</div>
          <div class="li">
            <img src="item.main_img" />
          </div>
          <div class="li">{{item.name}}</div>
          <div class="li">{{item.shop_number}}件</div>
          <div class="li">{{item.old_price}}元</div>
          <div class="li">{{item.user_id}}</div>
          <div class="li">{{item.user_name}}</div>
          <div class="li">{{item.user_phone}}</div>
          <div class="li">{{item.tkl}}</div>
          <div class="li">{{item.create_at}}</div>
          <div class="li">
            <span class="li-abq2" >已使用</span>
          </div>
        </div>
        <div class="paging">
          <el-pagination
            background
            layout="prev, pager, next,jumper"
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
      //搜索数据
      searchData: "",
      //数据
      cardData: [],
      //分页
      page: 1,
      //数据条件
      status: 1,
      //总数据
      totalCount: 1
    };
  },
  //生命周期-页面初始化完成加载
  created() {
    this.loadingData();
  },
  methods: {
    //切换状态
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
          this.status = 0;
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
        "/shoprecord/index",
        "get",
        "",
        params,
        (status, judge, res) => {
          if (status) {
            this.cardData = res.data.shoprecord;
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
    //搜索
    search() {
      this.loadingData();
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
  color: #037aff;
  margin-left: 5px;
}
.li-abq2 {
  margin-left: 5px;
  color: #A5A5A5;
}
.li img {
  width: 90px;
  height: 50px;
  padding-top: 5px;
}
</style>