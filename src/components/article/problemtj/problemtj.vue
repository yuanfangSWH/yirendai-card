<template>
  <div class="layer">
    <!-- 返回 -->
    <div class="zjfh">
      <router-link to="/problem">
        <div class="fhan">返回</div>
      </router-link>
    </div>
    <!-- 添加问题 -->
    <div class="bittou">
      <div class="bit">添加问题</div>
      <div class="yhtoux">
        <div class="mzt">通知标题</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入标题" v-model="goodsData" clearable></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">通知内容</div>
        <div class="tebl">
         <div ref="editor" style="text-align:left"></div>
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
import E from 'wangeditor'
export default {
  data() {
    return {
      //通知标题
      goodsData: "",
      //通知内容
      nrData: "",
      //排序
      numberData: ""
    };
  },
  //wangEditor富文本编辑器
  mounted() {
    var editor = new E(this.$refs.editor);
    editor.customConfig.onchange = html => {
      ////通知内容
      this.nrData = html;
    };
    editor.create();
  },
  methods: {
    //保存
    submit() {
      var data = {
        //问题标题
        m_faq_title: this.goodsData,
        //问题内容
        m_faq_content: this.nrData,
         //排序
        m_faq_sort: this.numberData
      };
      this.api.apiPost(
        "/problem/add",
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
            this.$router.push("/problem");
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