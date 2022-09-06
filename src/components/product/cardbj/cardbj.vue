<template>
  <div class="layer">
    <!-- 返回 -->
    <div class="zjfh">
      <router-link to="/card">
        <div class="fhan">返回</div>
      </router-link>
    </div>
    <!-- 信用卡编辑 -->
    <div class="bittou">
      <div class="bit">信用卡编辑</div>
      <div class="yhtoux">
        <div class="mzt">选择银行</div>
        <div class="tebl">
          <el-select v-model="xialj" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.bank_id"
              :label="item.bank_name"
              :value="item.bank_id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">卡种名称</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="text"
            placeholder="请输入银行卡种名称"
            v-model="goodsData"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">权益描述</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="text"
            placeholder="请输入银行卡权益描述"
            v-model="phoneData"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">申请链接</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入申请链接" v-model="urlData" clearable></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">卡片标签</div>
        <div class="tebl">
          <el-checkbox-group v-model="checkboxGroup">
            <el-checkbox-button
              v-for="(item,key) in labelData"
              :label="item.bank_label_id"
              :key="key"
            >{{item.bank_label_name}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <div class="yhtoux tsad">
        <div class="mzt2">卡片素材</div>
        <div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :http-request="upload"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="portrait" :src="portrait" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">排序</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="primary"
            placeholder="请输入排序"
            v-model="numberData"
            clearable
          ></el-input>
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
      //卡种名称
      goodsData: "",
      //权益描述
      phoneData: "",
      //申请链接
      urlData: "",
      //标签
      labelData: [],
      //选中的标签数组
      checkboxGroup: [],
      //卡片素材
      portrait: "",
      //头像图片b64格式
      portraitData: "",
      //排序
      numberData: "",
      //选择的下拉值
      xialj: "",
      //下拉数据
      options: []
    };
  },
  //生命周期-页面初始化完成加载
  created() {
    this.loadingData(this.$route.query.id);
  },
  methods: {
    //加载数据
    loadingData(id) {
      this.api.apiPost(
        "/creditcard/addreq",
        "get",
        "",
        "",
        (status, judge, res) => {
          if (status) {
            this.options = res.data.bank;
            this.labelData = res.data.lable;
            this.loadingData2(id);
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
    loadingData2(id) {
      var data = {
        bank_card_id: id
      };
      this.api.apiPost(
        "/creditcard/edit",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            //信用卡id
            this.idData = res.data.bankcard.bank_card_id;
            //信用卡名称
            this.goodsData = res.data.bankcard.bank_card_name;
            //信用卡描述
            this.phoneData = res.data.bankcard.bank_card_desc;
            //申请链接
            this.urlData = res.data.bankcard.bank_card_url;
            //卡片图片
            this.portrait = res.data.bankcard.bank_card_img;
            //排序
            this.numberData = res.data.bankcard.bank_card_sort;
            //银行下拉
            this.xialj = res.data.bank.bank_id;
            //标签
            for (var i = 0; i < res.data.lable.length; i++) {
              this.checkboxGroup.push(
                parseInt(res.data.lable[i].bank_label_id)
              );
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
    //保存
    submit() {
      var data = {
        //银行id
        bank_id: this.xialj,
        //信用卡名称
        bank_card_name: this.goodsData,
        //信用卡描述
        bank_card_desc: this.phoneData,
        //申请链接
        bank_card_url: this.urlData,
        //信用卡标签id
        bank_label_id: this.checkboxGroup,
        //信用卡图片
        bank_card_img: this.portraitData,
        //排序
        bank_card_sort:this.numberData,
        //信用卡id
        bank_card_id: this.idData
      };
      this.api.apiPost(
        "/creditcard/saveedit",
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
            this.$router.push("/card");
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
    //上传图片限制方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //得到图片
    upload(e) {
      var _this = this;
      var reader = new FileReader();
      reader.readAsDataURL(e.file);
      reader.onload = function(e) {
        //设置图片显示
        _this.portrait = e.target.result;
        // 读取到的图片数据编码 转成base64后将此编码字符串传给后台即可
        _this.portraitData = e.target.result;
      };
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