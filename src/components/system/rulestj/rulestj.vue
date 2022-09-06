<template>
  <div class="layer">
    <!-- 返回 -->
    <div class="zjfh">
      <router-link to="/rules">
        <div class="fhan">返回</div>
      </router-link>
    </div>
    <!-- 添加渠道商规则 -->
    <div class="bittou">
      <div class="bit">添加渠道商规则</div>
      <div class="yhtoux">
        <div class="mzt">添加等级</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入要添加的等级" v-model="grade" clearable></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">等级名称</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入等级名称" v-model="gradename" clearable></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">业绩要求</div>
        <div class="tebl">
          <el-input
            class="s-input"
            type="text"
            placeholder="请输入业绩要求"
            v-model="requirement"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">奖励系数</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入奖励系数" v-model="reward" clearable></el-input>
        </div>
      </div>
      <div class="yhtoux">
        <div class="mzt">排序</div>
        <div class="tebl">
          <el-input class="s-input" type="text" placeholder="请输入排序" v-model="sort" clearable></el-input>
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
      //添加等级
      grade: "",
      //等级名称
      gradename: "",
      //业绩要求
      requirement: "",
      //奖励系数
      reward: "",
      //排序
      sort: ""
    };
  },
  methods: {
    //保存
    submit() {
      var data = {
        //添加等级
        channel_grade: this.grade,
        //等级名称
        channel_gradename: this.gradename,
        //业绩要求
        channel_requirement: this.requirement,
        //奖励系数
        channel_reward: this.reward,
        //排序
        channel_sort: this.sort
      };
      this.api.apiPost(
        "/channelgz/add",
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
            this.$router.push("/rules");
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