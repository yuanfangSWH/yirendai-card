<template>
  <div class="layer">
    <!-- 返回 -->
    <div class="zjfh">
      <router-link to="/article">
        <div class="fhan">返回</div>
      </router-link>
    </div>
    <!-- 添加问题 -->
    <div class="bittou">
      <div class="bit">添加文章</div>
      <div class="yhtoux">
        <div class="mzt">文章标题</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入标题" v-model="goodsData" clearable></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">是否精品</div>
        <div class="tebl">
          <el-input class="s-input" type="number" placeholder="请输入数字" v-model="fineData"></el-input>
          <span style="color: #037aff;">(注：0为默认普通文章，填写的数字为精品文章所需邀请人数)</span>
        </div>
      </div>
      <div class="yhtoux tsad">
        <div class="mzt2">文章封面</div>
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
        <div class="mzt">文章内容</div>
        <div class="tebl">
          <div ref="editor" style="text-align:left"></div>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">发布分类</div>
        <div class="tebl">
          <el-radio-group v-model="chooseData">
            <el-radio-button
              v-for="item in options"
              :key="item.category_id"
              :label="item.category_id"
            >{{item.category_name}}</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">排序</div>
        <div class="tebl">
          <el-input class="s-input" type="number" placeholder="请输入排序" v-model="sortData"></el-input>
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
import E from "wangeditor";
export default {
  data() {
    return {
      //标题
      goodsData: "",
      //精品数据
      fineData: "",
      //内容
      nrData: "",
      //排序
      sortData: "",
      //分类
      options: [],
      //选中的分类
      chooseData: "1",
      //封面
      portrait: "",
      //封面64格式
      portraitData: ""
    };
  },
  //生命周期-页面初始化完成加载
  created() {
    this.jiazfl();
  },
  //wangEditor富文本编辑器
  mounted() {
    var Bearer = "Bearer ";
    var apitoken = (Bearer += sessionStorage.getItem("tokenData"));
    var editor = new E(this.$refs.editor);
    // 堆叠层级
    editor.customConfig.zIndex = 0;
    // 忽略粘贴内容中的图片
    editor.customConfig.pasteIgnoreImg = true;
    // 隐藏“网络图片”tab
    editor.customConfig.showLinkImg = false;
    // 配置服务器端地址
    editor.customConfig.uploadImgServer =
      "http://king.kayu5.com/v1/article/addcover";
    // 自定义 header
    editor.customConfig.uploadImgHeaders = { apitoken: apitoken };
    // 后端接受上传文件的参数名
    editor.customConfig.uploadFileName = "wz_cover";
    // 将图片大小限制为 2M
    editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;
    // 限制一次最多上传 1 张图片
    editor.customConfig.uploadImgMaxLength = 1;
    // 设置超时时间
    editor.customConfig.uploadImgTimeout = 3000;
    //上传图片的错误提示
    editor.customConfig.customAlert = function(info) {
      // info 是需要提示的内容
      alert("提示：" + info);
    };
    editor.customConfig.uploadImgHooks = {
      fail: (xhr, editor, result) => {
        // 插入图片失败回调
      },
      success: (xhr, editor, result) => {
        // 图片上传成功回调
      },
      timeout: (xhr, editor) => {
        // 网络超时的回调
      },
      error: (xhr, editor) => {
        // 图片上传错误的回调
      },
      customInsert: (insertImg, result, editor) => {
        // 图片上传成功，插入图片的回调
        insertImg(result.data);
        //循环插入图片
        // for (let i = 0; i < 1; i++) {
        // console.log(result)
        //let url = "http://otp.cdinfotech.top"+result.url
        // insertImg(url)
        // }
      }
    };
    editor.customConfig.onchange = html => {
      //内容
      this.nrData = html;
    };
    editor.create();
  },
  methods: {
    //加载分类
    jiazfl() {
      this.api.apiPost(
        "/article/addreq",
        "post",
        "",
        "",
        (status, judge, res) => {
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
    },
    //保存
    submit() {
      if (this.fineData == "" || Number(this.fineData) < 0) {
        this.fineData = 0;
      }
      var data = {
        //标题
        article_title: this.goodsData,
        //0默认普通文
        article_boutique: Number(this.fineData),
        //内容
        article_content: this.nrData,
        //排序
        article_sort: this.sortData,
        //分类
        category_id: this.chooseData,
        //封面
        article_cover: this.portraitData
      };
      this.api.apiPost(
        "/article/add",
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
            this.$router.push("/article");
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