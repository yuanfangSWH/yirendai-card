<template>
  <div class="layer">
    <!-- 下架 -->
    <div class="black-div" v-if="exitBounced">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">活动弹框下架</div>
        </div>
        <div class="b-nr">
          <dl>确定要下架活动弹框吗？</dl>
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
          <div class="b-wz1">活动弹框上架</div>
        </div>
        <div class="b-nr">
          <dl>确定要上架活动弹框吗？</dl>
          <div class="b-ann">
            <el-button class="b-ant" @click="shelves2(2)">取消上架</el-button>
            <el-button type="primary" @click="shelves2(3)">确认上架</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 海报删除 -->
    <div class="black-div" v-if="exitBounced3">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">活动弹框删除</div>
        </div>
        <div class="b-nr">
          <dl>确定要删除活动弹框吗？</dl>
          <div class="b-ann">
            <el-button class="b-ant" @click="shelves3(2)">取消删除</el-button>
            <el-button type="primary" @click="shelves3(3)">确认删除</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索 -->
    <div class="search-div">
      <router-link to="/bouncedtj">
        <div class="tjia">添加活动弹框</div>
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
          <div class="li">弹窗素材</div>
          <div class="li">活动描述</div>
          <div class="li">活动链接</div>
          <div class="li">创建时间</div>
          <div class="li">状态</div>
          <div class="li">操作</div>
        </div>
        <div class="title" v-for="(item,key) in cardData" :key="key">
          <div class="li">{{item.popup_id}}</div>
          <div class="li">
            <img :src="item.popup_img" />
          </div>
          <div class="li">{{item.popup_desc}}</div>
          <div class="li">{{item.popup_href}}</div>
          <div class="li">{{item.created_at}}</div>
          <div class="li"><span style="color: #000000;" v-if="item.status=='1'">上架状态</span><span style="color: #000000;" v-else>下架状态</span></div>
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
          <div class="li">弹窗素材</div>
          <div class="li">活动描述</div>
          <div class="li">活动链接</div>
          <div class="li">创建时间</div>
          <div class="li">状态</div>
          <div class="li">操作</div>
        </div>
        <div class="title" v-for="(item,key) in cardData" :key="key">
          <div class="li">{{item.popup_id}}</div>
          <div class="li">
            <img :src="item.popup_img" />
          </div>
          <div class="li">{{item.popup_desc}}</div>
          <div class="li">{{item.popup_href}}</div>
          <div class="li">{{item.created_at}}</div>
          <div class="li"><span style="color: #000000;" v-if="item.status=='1'">上架状态</span><span style="color: #000000;" v-else>下架状态</span></div>
          <div class="li">
            <span class="li-abq1" @click="shelves2(1,item)">上架</span>
            <span class="li-abq1" @click="skbj(item.popup_id)">编辑</span>
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
import axios from "axios";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      //切换状态
      state: 1,
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
      //当前选择的数据
      valueData: []
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
        "/popup/index",
        "get",
        "",
        params,
        (status, judge, res) => {
          if (status) {
            this.cardData = res.data.popup;
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
        popup_id: this.valueData.popup_id,
        status: value
      };
      this.api.apiPost(
        "/popup/pullos",
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
          popup_id: this.valueData.popup_id,
        };
        this.api.apiPost(
          "/popup/delete",
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
    //回收站编辑
    skbj(id) {
      this.$router.push({
        path: "/bouncedbj",
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
</style>