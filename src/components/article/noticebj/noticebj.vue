<template>
  <div class="layer">
    <!-- 返回 -->
    <div class="zjfh">
      <router-link to="/notice">
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
          <el-input
            type="textarea"
            class="s-input"
            :rows="2"
            placeholder="请输入通知内容"
            v-model="neirData"
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">是否置顶</div>
        <div class="tebl">
          <el-checkbox v-model="checked">
            <span v-if="checked">启用</span>
            <span v-else>禁用</span>
          </el-checkbox>
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
      //通知标题
      goodsData: "",
      //通知内容
      neirData: "",
      //是否置顶
      checked: true
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
        m_notice_id: id
      };
      this.api.apiPost(
        "/notice/edit",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            //id
            this.idData = res.data.m_notice_id;
            //标题
            this.goodsData = res.data.m_notice_title;
            //内容
            this.neirData = res.data.m_notice_content;
            //置顶状态
            var is_stick = res.data.is_stick;
            //是否置顶判断
            if (is_stick == 1) {
              this.checked = true;
            } else {
              this.checked = false;
            }
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
              position: "bottom-right"
            });
          }
        }
      );
    },
    //保存
    submit() {
      //是否置顶判断
      if (this.checked) {
        var is_stick = "1";
      } else {
        var is_stick = "0";
      }
      var data = {
        m_notice_id: this.idData,
        m_notice_title: this.goodsData,
        m_notice_content: this.neirData,
        is_stick:is_stick
      };
      this.api.apiPost(
        "/notice/saveedit",
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
            this.$router.push("/notice");
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
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