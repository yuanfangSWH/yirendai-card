<template>
  <div class="layer">
    <!-- 下架 -->
    <div class="black-div" v-if="exitBounced">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">商品下架</div>
        </div>
        <div class="b-nr">
          <dl>确定要下架【{{valueData.name}}】吗？</dl>
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
          <div class="b-wz1">商品上架</div>
        </div>
        <div class="b-nr">
          <dl>确定要上架【{{valueData.name}}】吗？</dl>
          <div class="b-ann">
            <el-button class="b-ant" @click="shelves2(2)">取消上架</el-button>
            <el-button type="primary" @click="shelves2(3)">确认上架</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 删除商品 -->
    <div class="black-div" v-if="exitBounced3">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">是否将【{{valueData.name}}】商品删除?</div>
        </div>
        <div class="b-nr">
          <dl>确定要删除吗？</dl>
          <div class="b-ann">
            <el-button class="b-ant" @click="shelves3(2)">取消删除</el-button>
            <el-button type="primary" @click="shelves3(3)">确认删除</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改排序 -->
    <div class="black-div" v-if="exitBounced4">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">{{valueData.name}}</div>
        </div>
        <div class="b-nr">
          <div class="lsdpxys">
            <div class="fushengm">输入排序：</div>
            <el-input class="tebddinne" type="primary" v-model="xiugData" clearable></el-input>
          </div>
          <div class="b-ann">
            <el-button class="b-ant" @click="xiugai(2)">取消修改</el-button>
            <el-button type="primary" @click="xiugai(3)">确认修改</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索 -->
    <div class="search-div">
      <router-link to="/integraltj">
        <div class="tjia">添加商品</div>
      </router-link>
      <div class="s-srk">
        <img class="s-tb" src="../../../assets/images/soutb.png" />
        <div class="srk">
          <el-input
            class="s-input"
            type="primary"
            placeholder="输入商店名进行搜索"
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
        <div class="tab-div tab-a" v-bind:class="{ choose: state==1 }" @click="tab(1)">商品列表</div>
        <div class="tab-div tab-b" v-bind:class="{ choose: state==2 }" @click="tab(2)">下架商品</div>
      </div>
      <!-- 商品列表 -->
      <div class="l-nr-a" v-show="state==1">
        <div class="title">
          <div class="li">编号</div>
          <div class="li">商品图片</div>
          <div class="li" style="flex:2;">商品信息</div>
          <div class="li">卷后价</div>
          <div class="li">商品价格</div>
          <div class="li">补贴礼金</div>
          <div class="li">到手价</div>
          <div class="li">积分数量</div>
          <div class="li">商品数量</div>
          <div class="li">状态</div>
          <div class="li">创建时间</div>
          <div class="li">排序</div>
          <div class="li">操作</div>
        </div>
        <div class="title" v-for="(item,key) in cardData" :key="key">
          <div class="li">{{item.id}}</div>
          <div class="li">
            <img :src="item.main_img" />
          </div>
          <div class="li" style="flex:2;">{{item.name}}</div>
          <div class="li">{{item.actual_price}}元</div>
          <div class="li">{{item.old_price}}元</div>
          <div class="li">{{item.lijin_price}}元</div>
          <div class="li">{{item.now_price}}元</div>
          <div class="li">{{item.jifen_num}}</div>
          <div class="li">{{item.shop_number}}</div>
          <div class="li">
            <span style="color: #000000;" v-if="item.status=='1'">上架状态</span>
            <span style="color: #000000;" v-else>下架状态</span>
          </div>
          <div class="li">{{item.created_at}}</div>
          <div class="li">{{item.sort}}</div>
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
      <!-- 下架商品 -->
      <div class="l-nr-b" v-show="state==2">
        <div class="title">
          <div class="li">编号</div>
          <div class="li">商品图片</div>
          <div class="li" style="flex:2;">商品信息</div>
          <div class="li">卷后价</div>
          <div class="li">商品价格</div>
          <div class="li">补贴礼金</div>
          <div class="li">到手价</div>
          <div class="li">积分数量</div>
          <div class="li">商品数量</div>
          <div class="li">状态</div>
          <div class="li">创建时间</div>
          <div class="li">排序</div>
          <div class="li">操作</div>
        </div>
        <div class="title" v-for="(item,key) in cardData" :key="key">
          <div class="li">{{item.id}}</div>
          <div class="li">
            <img :src="item.main_img" />
          </div>
          <div class="li" style="flex:2;">{{item.name}}</div>
          <div class="li">{{item.actual_price}}元</div>
          <div class="li">{{item.old_price}}元</div>
          <div class="li">{{item.lijin_price}}元</div>
          <div class="li">{{item.now_price}}元</div>
          <div class="li">{{item.jifen_num}}</div>
          <div class="li">{{item.shop_number}}</div>
          <div class="li">
            <span style="color: #000000;" v-if="item.status=='1'">上架状态</span>
            <span style="color: #000000;" v-else>下架状态</span>
          </div>
          <div class="li">{{item.created_at}}</div>
          <div class="li">{{item.sort}}</div>
          <div class="li">
            <span class="li-abq1" style="margin-left: 0px;" @click="shelves2(1,item)">上架</span>
            <span class="li-abq1" style="margin-left: 5px;" @click="xiugai(1,item)">修改</span>
            <span class="li-abq2" style="margin-left: 5px;" @click="shelves3(1,item)">删除</span>
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
      totalCount: 1,
      //下架弹框
      exitBounced: false,
      //上架弹框
      exitBounced2: false,
      //删除弹框
      exitBounced3: false,
      //修改排序弹框
      exitBounced4: false,
      //当前选择的数据
      valueData: [],
      //排序输入框
      xiugData: ""
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
        "/shop/index",
        "get",
        "",
        params,
        (status, judge, res) => {
          if (status) {
            this.cardData = res.data.shop;
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
      this.loadingData();
    },
    //下架
    shelves(value, data) {
      if (value == 1) {
        this.valueData = data;
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
        this.valueData = data;
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
        id: this.valueData.id,
        status: value
      };
      this.api.apiPost(
        "/shop/pullos",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            //初始化
            this.valueData = "";
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
        this.valueData = data;
        this.exitBounced3 = true;
      } else if (value == 2) {
        this.exitBounced3 = false;
      } else if (value == 3) {
        var data = {
          id: this.valueData.id
        };
        this.api.apiPost(
          "/shop/delete",
          "post",
          data,
          "",
          (status, judge, res) => {
            if (status) {
              //初始化
              this.valueData = "";
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
    //修改排序
    xiugai(value, data) {
      if (value == 1) {
        this.valueData = data;
        this.xiugData = data.sort;
        this.exitBounced4 = true;
      } else if (value == 2) {
        this.exitBounced4 = false;
      } else if (value == 3) {
        if (this.xiugData == "" || this.xiugData == undefined) {
          this.$message({
            showClose: true,
            message: "排序字段不能为空",
            type: "error",
            position: "bottom-right"
          });
        } else {
          this.exitBounced4 = false;
          this.xiugpxData();
        }
      }
    },
    //修改排序API
    xiugpxData() {
        var data = {
          id: this.valueData.id,
          sort:this.xiugData
        };
        this.api.apiPost(
          "/shop/saveedit",
          "post",
          data,
          "",
          (status, judge, res) => {
            if (status) {
              //初始化
              this.valueData = "";
              this.xiugData = "";
              this.loadingData();
              this.exitBounced4 = false;
              this.$notify({
                title: "修改成功",
                type: "success",
                position: "bottom-right"
              });
            } else {
              this.exitBounced4 = false;
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
span {
  color: #037aff;
}
.li-abq1 {
  color: #037aff;
  margin-left: 25px;
}
.li-abq2 {
  margin-left: 0px;
  color: #e52e16;
}
.li img {
  width: 90px;
  height: 50px;
  padding-top: 5px;
}
.li {
  overflow: hidden;
  text-overflow: ellipsis;
}
.lsdpxys {
  width: 300px;
  height: 40px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  padding-top: 70px;
  line-height: 40px;
}
.tebddinne {
  flex: 1;
}
.fushengm {
  width: 100px;
  height: 40px;
}
</style>