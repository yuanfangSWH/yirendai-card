<template>
  <div class="layer">
    <!-- 返回 -->
    <div class="zjfh">
      <router-link to="/integral">
        <div class="fhan">返回</div>
      </router-link>
    </div>
    <!-- 添加商品 -->
    <div class="bittou">
      <div class="bit">添加商品</div>
      <div class="yhtoux">
        <div class="mzt">商品链接/ID</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="text"
            placeholder="请输入商品性质  服务/实物"
            v-model="taobID"
            clearable
          ></el-input>
        </div>
        <div class="ctmcjan" @click="queryID">采集</div>
      </div>
      <div class="yhtoux">
        <div class="mzt">商品图片链接</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="text"
            placeholder="请输入商品图片链接"
            v-model="cardData.mainPic"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">商品兑换数量</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="text"
            placeholder="请输入商品兑换数量"
            v-model="yuehData"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">商品名称</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="text"
            placeholder="请输入商品名称"
            v-model="cardData.dtitle"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">商品销量</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="text"
            placeholder="请输入商品销量"
            v-model="cardData.monthSales"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">商品原价</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="text"
            placeholder="请输入商品原价"
            v-model="cardData.originalPrice"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">优惠卷额</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="text"
            placeholder="请输入优惠卷额"
            v-model="cardData.couponPrice"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">卷后价格</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="text"
            placeholder="请输入卷后价格"
            v-model="cardData.actualPrice"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">到手价</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入到手价" v-model="daoshou" clearable></el-input>
        </div>
      </div>
      <!-- <div class="yhtoux">
        <div class="mzt">佣金比例</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入佣金比例" v-model="goodsData" clearable></el-input>
        </div>
      </div>-->
      <!-- <div class="yhtoux">
        <div class="mzt">商品佣金</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入商品佣金" v-model="goodsData" clearable></el-input>
        </div>
      </div>-->
      <div class="yhtoux">
        <div class="mzt">淘礼金面额</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入优惠卷额" v-model="tljData" clearable></el-input>
        </div>
      </div>
      <!-- <div class="yhtoux">
        <div class="mzt">淘礼金个数</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="text"
            placeholder="请输入淘礼金个数"
            v-model="goodsData"
            clearable
          ></el-input>
        </div>
      </div>-->
      <div class="yhtoux">
        <div class="mzt">积分数量</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入积分数量" v-model="jifData" clearable></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">排序</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入排序" v-model="paixu" clearable></el-input>
        </div>
      </div>

      <div class="yhtoux">
        <div class="mzt"></div>
        <div class="anntf" @click="submit">保存</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //淘宝ID
      taobID: "",
      //数据
      cardData: [],
      //数量
      yuehData: "",
      //积分数量
      jifData: "",
      //淘礼金金额
      tljData: "",
      //到手价
      daoshou: "",
      //排序
      paixu: ""
    };
  },
  methods: {
    //采集
    queryID() {
      if (this.taobID == "") {
        this.$message({
          showClose: true,
          message: "淘宝ID不能为空",
          type: "warning",
          position: "bottom-right"
        });
      } else {
        var params = {
          //淘宝ID
          id: this.taobID
        };
        this.api.apiPost(
          "/shop/getshop",
          "get",
          "",
          params,
          (status, judge, res) => {
            if (status) {
              this.cardData = res.data.data;
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
      }
    },
    //保存
    submit() {
      var data = {
        //商品名称
        name: this.cardData.dtitle,
        //封面图
        main_img: this.cardData.mainPic,
        //商品图文详情列表
        desc_img: this.cardData.detailPics,
        //原价
        old_price: this.cardData.originalPrice,
        //优惠券金额
        coupon_price: this.cardData.couponPrice,
        //优惠券总数量
        coupon_total_num: this.cardData.couponTotalNum,
        //已领优惠券数量
        coupon_receive_num: this.cardData.couponReceiveNum,
        //券后价
        actual_price: this.cardData.actualPrice,
        //到手价
        now_price: this.daoshou,
        //积分数量
        jifen_num: this.jifData,
        //淘礼金金额
        lijin_price: this.tljData,
        //优惠券结束时间
        couponEndTime: this.cardData.couponStartTime,
        //优惠券开始时间
        couponStartTime: this.cardData.couponEndTime,
        //商品数量
        shop_number: this.yuehData,
        //淘宝商品ID
        goodsId: this.cardData.goodsId,
        //大淘客id
        dtkid: this.taobID,
        //排序
        sort: this.paixu
      };
      this.api.apiPost(
        "/shop/saveshop",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            this.$notify({
              title: "保存成功",
              type: "success",
              position: "bottom-right"
            });
            this.$router.push("/integral");
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
    }
  }
};
</script>
<style scoped>
/* 头像上传 */
.tsad {
  padding-top: 30px;
  padding-bottom: 20px;
}
.mzt2 {
  font-size: 14px;
  width: 60px;
  height: 170px;
  line-height: 170px;
  margin-right: 20px;
  margin-left: 70px;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/* 添加产品 */
.bittou {
  width: 1680px;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(231, 233, 234, 1);
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  margin-bottom: 20px;
  padding-bottom: 40px;
}
.bit {
  width: 100%;
  height: 51px;
  border-bottom: 1px #e7e9ea solid;
  line-height: 51px;
  text-indent: 30px;
  font-size: 16px;
}
.yhtoux {
  display: flex;
}
.mzt {
  font-size: 14px;
  width: 100px;
  height: 60px;
  line-height: 60px;
  margin-right: 20px;
  margin-left: 70px;
}
.tebl {
  line-height: 60px;
}
.anntf {
  width: 280px;
  height: 40px;
  background: rgba(3, 122, 255, 1);
  border-radius: 2px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 40px;
  margin-top: 40px;
}
.s-input {
  width: 280px;
}
.ctmcjan {
  width: 90px;
  height: 40px;
  line-height: 40px;
  color: #ffffff;
  text-align: center;
  font-size: 16px;
  background: rgba(3, 122, 255, 1);
  margin-top: 14px;
  margin-left: 30px;
}
</style>