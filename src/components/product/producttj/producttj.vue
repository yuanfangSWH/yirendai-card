<template>
  <div class="layer">
    <!-- 返回 -->
    <div class="zjfh">
      <router-link to="/product">
        <div class="fhan">返回</div>
      </router-link>
    </div>
    <!-- 添加用户 -->
    <div class="bittou">
      <div class="bit">添加产品</div>
      <div class="yhtoux">
        <div class="mzt">银行名称</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入银行名称" v-model="goodsData" clearable></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">选择标签</div>
        <div class="tebl">
          <el-checkbox-group v-model="checkboxGroup">
            <el-checkbox-button
              v-for="(item,key) in options"
              :label="item.bank_tab_id"
              :key="key"
            >{{item.bank_tab_name}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <div class="yhtoux tsad">
        <div class="mzt2">银行logo</div>
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
      <div class="yhtoux tsad">
        <div class="mzt2">背景素材</div>
        <div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :http-request="upload2"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="portrait2" :src="portrait2" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="yhtoux tsad">
        <div class="mzt2">产品海报</div>
        <div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :http-request="upload3"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="portrait3" :src="portrait3" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">申请链接</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入申请链接" v-model="urlData" clearable></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">奖励金额</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="primary"
            placeholder="请输入奖励金额"
            v-model="rewardData"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">产品总佣金</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="primary"
            placeholder="请输入产品总佣金"
            v-model="cpdzjinData"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">银行介绍</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="text"
            placeholder="请输入银行介绍"
            v-model="introduceData"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">银行宣传</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="text"
            placeholder="请输入银行宣传"
            v-model="propagandaData"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">银行卡列表描述</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="text"
            placeholder="请输入银行描述"
            v-model="describe"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">结算方式</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入结算方式" v-model="wayData" clearable></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">结算规则</div>
        <div class="tebl" style="line-height: 0;">
          <el-input
            type="textarea"
            class="s-input wtmdduoh"
            :rows="2"
            autosize
            placeholder="请输入结算规则"
            v-model="rulesData"
          ></el-input>
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
      //银行名称
      goodsData: "",
      //申请链接
      urlData: "",
      //排序
      numberData: "",
      //结算规则
      rulesData: "",
      //奖励金额
      rewardData: "",
      //银行介绍
      introduceData: "",
      //银行宣传
      propagandaData: "",
      //银行卡列表描述
      describe:"",
      //产品总佣金
      cpdzjinData: "",
      //结算方式
      wayData: "",
      //背景素材
      portrait2: "",
      //产品海报
      portrait3: "",
      //银行logo
      portrait: "",
      //背景素材b64格式
      portraitData2: "",
      //产品海报b64格式
      portraitData3: "",
      //银行logob64格式
      portraitData: "",
      //选择标签数组
      checkboxGroup: [],
      //标签
      options: []
    };
  },
  //生命周期-页面初始化完成加载
  created() {
    this.loadingData();
  },
  methods: {
    //加载数据
    loadingData() {
      this.api.apiPost("/bank/addreq", "post", "", "", (status, judge, res) => {
        if (status) {
          //标签数据
          this.options = res.data;
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: "error",
            position: "bottom-right"
          });
        }
      });
    },
    //保存
    submit() {
      var data = {
        //银行昵称
        bank_name: this.goodsData,
        //银行logo
        bank_logo: this.portraitData,
        //背景素材
        bank_back_img: this.portraitData2,
        //银行海报
        bank_poster:this.portraitData3,
        //结算方式
        bank_period: this.wayData,
        //结算规则
        bank_rule: this.rulesData,
        //奖励金额
        bank_commission: this.rewardData,
        //产品总佣金
        bank_total_money:this.cpdzjinData,
        //银行介绍
        bank_desc: this.introduceData,
        //银行宣传
        bank_propaganda: this.propagandaData,
        //银行卡列表描述
        bank_describe: this.describe,
        //排序
        bank_sort:this.numberData,
        //标签id
        bank_tab_id: this.checkboxGroup
      };
      this.api.apiPost("/bank/add", "post", data, "", (status, judge, res) => {
        if (status) {
          this.$notify({
            title: "保存成功",
            type: "success",
            position: "bottom-right"
          });
          this.$router.push("/product");
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: "error",
            position: "bottom-right"
          });
        }
      });
    },
    //上传图片限制方法
    beforeAvatarUpload(file) {
      const isImage =
        file.type === "image/png" ||
        file.type == "image/jpg" ||
        file.type == "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error("上传的图片只能是 JPG/NPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过 2MB!");
      }
      return isImage && isLt2M;
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
    },
    //得到图片
    upload2(e) {
      var _this = this;
      var reader = new FileReader();
      reader.readAsDataURL(e.file);
      reader.onload = function(e) {
        //设置图片显示
        _this.portrait2 = e.target.result;
        // 读取到的图片数据编码 转成base64后将此编码字符串传给后台即可
        _this.portraitData2 = e.target.result;
      };
    },
    //得到图片
    upload3(e) {
      var _this = this;
      var reader = new FileReader();
      reader.readAsDataURL(e.file);
      reader.onload = function(e) {
        //设置图片显示
        _this.portrait3 = e.target.result;
        // 读取到的图片数据编码 转成base64后将此编码字符串传给后台即可
        _this.portraitData3 = e.target.result;
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
  width: 100px;
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
.wtmdduoh{
  padding-top: 10px;
}
</style>