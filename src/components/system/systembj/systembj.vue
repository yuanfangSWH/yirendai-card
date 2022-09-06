<template>
  <div class="layer">
    <!-- 返回 -->
    <div class="zjfh">
      <router-link to="/system">
        <div class="fhan">返回</div>
      </router-link>
    </div>
    <!-- 管理员编辑 -->
    <div class="bittou">
      <div class="bit">管理员编辑</div>
      <div class="yhtoux">
        <div class="mzt">管理员姓名</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入姓名" v-model="nameData" clearable></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">密码填写</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="text"
            placeholder="请输入密码"
            v-model="passwordData"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">权限选择</div>
        <div class="tebl">
          <el-select v-model="xialj" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">头像</div>
        <div class="tebl">
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
        <div class="mzt">电话</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="primary"
            placeholder="请输入电话"
            v-model="phoneData"
            clearable
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
      //ID
      idData: "",
      //管理员姓名
      nameData: "",
      //密码
      passwordData: "",
      //头像
      portrait: "",
      //头像b64格式
      portraitData: "",
      //电话
      phoneData: "",
      //排序
      numberData: "",
      //选择的下拉值
      xialj: "",
      //权限选择-下拉数据
      options: [
        {
          value: "1",
          label: "暂时无数据"
        }
      ]
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
        admin_id: id
      };
      this.api.apiPost(
        "/admin/edit",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            //id
            this.idData = res.data.admin_id;
            //管理员姓名
            this.nameData = res.data.admin_name;
            //密码
            this.passwordData = res.data.admin_password;
            //头像
            this.portrait = res.data.admin_avatar;
            //电话
            this.phoneData = res.data.admin_phone;
            //排序
            this.numberData = res.data.admin_sort;
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
        //ID
        admin_id: this.idData,
        //管理员姓名
        admin_name: this.nameData,
        //密码
        admin_password: this.passwordData,
        //头像
        admin_avatar: this.portraitData,
        //电话
        admin_phone: this.phoneData,
        //排序
        admin_sort: this.numberData
      };
      this.api.apiPost(
        "/admin/saveedit",
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
            this.$router.push("/system");
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
</style>