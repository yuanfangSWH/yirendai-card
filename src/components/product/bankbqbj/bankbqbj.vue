<template>
  <div class="layer">
    <!-- 返回 -->
    <div class="zjfh">
      <router-link to="/bankbq">
        <div class="fhan">返回</div>
      </router-link>
    </div>
    <!-- 信用卡标签编辑 -->
    <div class="bittou">
      <div class="bit">信用卡标签编辑</div>
      <div class="yhtoux">
        <div class="mzt">标签名</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入标签名" v-model="goodsData" clearable></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">排序</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入排序" v-model="rulesData" clearable></el-input>
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
      //id
      idData: "",
      //标签名
      goodsData: "",
      //排序
      rulesData: ""
    };
  },
  //生命周期-页面初始化完成加载
  created() {
    this.loadingData(this.$route.query.id);
  },
  methods: {
    //加载数据
    loadingData(id) {
       var data = {
        bank_tab_id: id
      };
      this.api.apiPost(
        "/banktab/edit",
        "poet",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            //银行标签id
            this.idData = res.data.bank_tab_id;
            //银行标签名称
            this.goodsData = res.data.bank_tab_name;
            //银行标签排序
            this.rulesData = res.data.bank_tab_sort;
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
    //保存
    submit() {
      var data = {
        //银行标签id
        bank_tab_id: this.idData,
        //银行标签名称
        bank_tab_name: this.goodsData,
        //银行标签排序
        bank_tab_sort: this.rulesData
      };
      this.api.apiPost(
        "/banktab/saveedit",
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
            this.$router.push("/bankbq");
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
.tsad{
  padding-top: 30px;
  padding-bottom: 20px;
}
.mzt2{
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
/* 添加用户 */
.bittou {
  width: 1680px;
  height: 648px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(231, 233, 234, 1);
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
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
  width: 60px;
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
</style>