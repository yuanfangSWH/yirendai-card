<template>
  <div class="layer">
    <!-- 下架 -->
    <div class="black-div" v-if="exitBounced">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">文章下架</div>
        </div>
        <div class="b-nr">
          <dl>确定要下架【{{xuanzdshuj.article_title}}】吗？</dl>
          <div class="b-ann">
            <el-button class="b-ant" @click="shelves(2)">取消下架</el-button>
            <el-button type="primary" @click="shelves(3)">确认下架</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 上架 -->
    <div class="black-div" v-if="exitBounced2">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">文章上架</div>
        </div>
        <div class="b-nr">
          <dl>确定要上架【{{xuanzdshuj.article_title}}】吗？</dl>
          <div class="b-ann">
            <el-button class="b-ant" @click="shelves2(2)">取消上架</el-button>
            <el-button type="primary" @click="shelves2(3)">确认上架</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 删除 -->
    <div class="black-div" v-if="exitBounced3">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">文章删除</div>
        </div>
        <div class="b-nr">
          <dl>确定要删除【{{xuanzdshuj.article_title}}】吗？</dl>
          <div class="b-ann">
            <el-button class="b-ant" @click="shelves3(2)">取消删除</el-button>
            <el-button type="primary" @click="shelves3(3)">确认删除</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索 -->
    <div class="search-div">
      <router-link to="/articletj">
        <div class="tjia">添加文章</div>
      </router-link>
    </div>
    <!-- 列表 -->
    <div class="list-div">
      <div class="l-tab">
        <div class="tab-div tab-a" v-bind:class="{ choose: state==1 }" @click="tab(1)">发布中</div>
        <div class="tab-div tab-b" v-bind:class="{ choose: state==2 }" @click="tab(2)">回收站</div>
      </div>
      <!-- 发布中 -->
      <div class="l-nr-a" v-show="state==1">
        <div class="title">
          <div class="li">编号</div>
          <div class="li">文章标题</div>
          <div class="li">创建时间</div>
          <div class="li">修改时间</div>
          <div class="li">阅读量</div>
          <div class="li">分类</div>
          <div class="li">排序</div>
          <div class="li">操作</div>
        </div>
        <div class="title" v-for="(item,key) in cardData" :key="key">
          <div class="li">{{item.article_id}}</div>
          <div class="li ycyc">{{item.article_title}}</div>
          <div class="li">{{item.created_at}}</div>
          <div class="li">{{item.updated_at}}</div>
          <div class="li">{{item.article_readingl}}</div>
          <div class="li">
            <span v-if="item.article_boutique=='1'">精品</span>
            <span v-else>普通</span>
          </div>
          <div class="li">{{item.article_sort}}</div>
          <div class="li">
            <span class="li-abq2" @click="shelves(1,item)">下架</span>
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
      <!-- 回收站 -->
      <div class="l-nr-b" v-show="state==2">
        <div class="title">
          <div class="li">编号</div>
          <div class="li">文章标题</div>
          <div class="li">创建时间</div>
          <div class="li">修改时间</div>
          <div class="li">阅读量</div>
          <div class="li">分类</div>
          <div class="li">状态</div>
          <div class="li">排序</div>
          <div class="li">操作</div>
        </div>
        <div class="title" v-for="(item,key) in cardData" :key="key">
          <div class="li">{{item.article_id}}</div>
          <div class="li ycyc">{{item.article_title}}</div>
          <div class="li">{{item.created_at}}</div>
          <div class="li">{{item.updated_at}}</div>
          <div class="li">{{item.article_readingl}}</div>
          <div class="li">
            <span v-if="item.article_boutique=='1'">精品</span>
            <span v-else>普通</span>
          </div>
          <div class="li">{{item.article_status}}</div>
          <div class="li">{{item.article_sort}}</div>
          <div class="li">
            <span class="li-abq1" @click="shelves2(1,item)">上架</span>
            <span class="li-abq1" @click="skbj(item.article_id)">编辑</span>
            <span class="li-abq2" @click="shelves3(1,item)">删除</span>
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
      //数据
      cardData: [],
      //数据条件
      status: 1,
      //分页
      page: 1,
      //总数据
      totalCount: 1,
      //下架弹框
      exitBounced: false,
      //上架弹框
      exitBounced2: false,
      //删除弹框
      exitBounced3: false,
      //当前选中的数据
      xuanzdshuj: []
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
        status: this.status
      };
      this.api.apiPost(
        "/article/index",
        "get",
        "",
        params,
        (status, judge, res) => {
          if (status) {
            this.cardData = res.data.article;
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
    //搜索
    search() {
      if (this.state == 1) {
        this.loadingData();
      } else {
        this.loadingData2();
      }
    },
    //下架
    shelves(value, data) {
      if (value == 1) {
        this.xuanzdshuj = data;
        this.exitBounced = true;
      } else if (value == 2) {
        this.exitBounced = false;
      } else if (value == 3) {
        this.exitBounced = false;
        this.ShelvesAPI(0);
      }
    },
    //上架
    shelves2(value, data) {
      if (value == 1) {
        this.xuanzdshuj = data;
        this.exitBounced2 = true;
      } else if (value == 2) {
        this.exitBounced2 = false;
      } else if (value == 3) {
        this.exitBounced2 = false;
        this.ShelvesAPI(1);
      }
    },
    //上下架接口
    ShelvesAPI(value) {
      var data = {
        article_id: this.xuanzdshuj.article_id,
        article_status: value
      };
      this.api.apiPost(
        "/article/pullos",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            //初始化
            this.xuanzdshuj = [];
            this.loadingData();
            if (value == 1) {
              this.$notify({
                title: "上架成功",
                type: "success",
                position: "bottom-right"
              });
            } else {
              this.$notify({
                title: "下架成功",
                type: "success",
                position: "bottom-right"
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
    },
    //删除
    shelves3(value, data) {
      if (value == 1) {
        this.xuanzdshuj = data;
        this.exitBounced3 = true;
      } else if (value == 2) {
        this.exitBounced3 = false;
      } else if (value == 3) {
        var data = {
          article_id: this.xuanzdshuj.article_id
        };
        this.api.apiPost(
          "/article/delete",
          "post",
          data,
          "",
          (status, judge, res) => {
            if (status) {
              //初始化
              this.xuanzdshuj = [];
              this.loadingData();
              this.exitBounced3 = false;
              this.$notify({
                title: "删除成功",
                type: "success",
                position: "bottom-right"
              });
            } else {
              this.exitBounced3 = false;
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
    },
    //回收站编辑
    skbj(id) {
      this.$router.push({
        path: "/articlebj",
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
  color: #037aff;
  margin-left: 25px;
}
.li-abq2 {
  margin-left: 25px;
  color: #e52e16;
}
.li img {
  width: 90px;
  height: 50px;
  padding-top: 5px;
}
.ycyc{
  white-space: nowrap;
           overflow: hidden;
            text-overflow: ellipsis;
}
</style>