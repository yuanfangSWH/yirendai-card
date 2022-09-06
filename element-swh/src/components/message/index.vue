<template>
  <div class="tps-m">
    <div class="fruit">
      <div class="lsjt" v-for="item in themessage" :key="item.member_id" :id="item.member_id" @click="appdiu(item.member_id)" >
        <el-row>
          <el-col :span="1">
            <div class="mlt"></div>
          </el-col>
          <el-col :span="18">
            <div class="mlt">ID = {{item.member_id}} 用户名 = {{ item.member_name }}</div>
          </el-col>
          <el-col :span="4">
            <div class="mlt" style="text-align: center;">{{ item.member_mobile }}</div>
          </el-col>
          <el-col :span="1">
            <div class="mlt">
              <i class="el-icon-delete" @click="disappear(item.member_id)"></i>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="cg" @click="wjaltj()">下一页数据</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      themessage: []
    };
  },
  created() {
    let token = localStorage.getItem("landing");
    if (token == null || token == "") {
      this.$message({
        showClose: true,
        message: "登陆已过期",
        type: "warning",
        position: "bottom-right"
      });
      this.$router.push("/home");
    } else {
      /*this.api.apiPost(
        "/pull/article",
        null,
        (status, res) => {
          if (status) {
            this.themessage = res.data;
          } else {
            this.$message({
              showClose: true,
              message: "数据获取失败",
              type: "error",
              position: "bottom-right"
            });
          }
        },
        "get"
      );*/
      let aa = {"month_yeji":0,"yeji":0,"team_total_num":375,"sub_member":[{"member_id":"116659","member_name":"Y72260","member_mobile":"0**","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/avatar\/2018\/05\/15271433003100.jpg","member_pro_level":"2","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-03-16"},{"member_id":"116668","member_name":"\u5289\u707f\u68ee.","member_mobile":"185****5566","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/avatar\/2018\/06\/15302530963630.jpg","member_pro_level":"2","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-03-16"},{"member_id":"116690","member_name":"\u5c0f\u80a5\u80d6","member_mobile":"181****1323","member_avatar":"https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/YConHRH5GCuvDcZsCf20XOHicglNUQRpTPplNiazV9v2bqt1afvEynmSv2yteP7PbibdiaSYc8E6bcyTJuLib0uV65w\/0","member_pro_level":"1","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-03-16"},{"member_id":"116702","member_name":"xiao@_\u725b","member_mobile":"185****7768","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/avatar\/2018\/04\/15244650013398.jpg","member_pro_level":"2","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-03-16"},{"member_id":"137801","member_name":"\ue32e \u5c0f\u5b87\u5b99","member_mobile":"139****2776","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/avatar\/2018\/06\/15282682266336.jpg","member_pro_level":"2","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-05-15"},{"member_id":"149360","member_name":"\u4ee3\u5457\u5ba2373612","member_mobile":"181****6227","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/avatar\/2018\/07\/15325109739454.png","member_pro_level":"2","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-06-14"},{"member_id":"155401","member_name":"\u4ee3\u5457\u5ba2420702","member_mobile":"188****5024","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/video\/2018\/05\/15276610681576.png","member_pro_level":"1","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-07-06"},{"member_id":"155403","member_name":"\u4ee3\u5457\u5ba2443630","member_mobile":"181****0240","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/video\/2018\/05\/15276610681576.png","member_pro_level":"2","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-07-06"},{"member_id":"155407","member_name":"\u4ee3\u5457\u5ba2795352","member_mobile":"156****3513","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/video\/2018\/05\/15276610681576.png","member_pro_level":"1","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-07-06"},{"member_id":"169489","member_name":"13824888001","member_mobile":"138****8001","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/video\/2018\/05\/15276610681576.png","member_pro_level":"1","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-09-07"}],"page":{"pageParam":"page","pageSizeParam":"per-page","forcePageParam":true,"route":null,"params":null,"urlManager":null,"validatePage":true,"totalCount":"35","defaultPageSize":10,"pageSizeLimit":[1,50]}}
      this.themessage = aa.sub_member;
      console.log("数据："+JSON.stringify(this.themessage))
    }
  },
  methods: {
    disappear(datalx) {
      $("#" + datalx).fadeOut(500);
    },
    appdiu(zcti){
      alert("成功触发："+zcti)
    },
    wjaltj(){
    let bb={"sub_member":[{"member_id":"169851","member_name":"13986275542","member_mobile":"139****5542","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/video\/2018\/05\/15276610681576.png","member_pro_level":"1","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-09-09"},{"member_id":"170853","member_name":"15902323102","member_mobile":"159****3102","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/video\/2018\/05\/15276610681576.png","member_pro_level":"1","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-09-13"},{"member_id":"170959","member_name":"15078019954","member_mobile":"150****9954","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/video\/2018\/05\/15276610681576.png","member_pro_level":"1","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-09-14"},{"member_id":"171582","member_name":"18225343288","member_mobile":"182****3288","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/video\/2018\/05\/15276610681576.png","member_pro_level":"1","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-09-18"},{"member_id":"171830","member_name":"13542385053","member_mobile":"135****5053","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/video\/2018\/05\/15276610681576.png","member_pro_level":"1","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-09-19"},{"member_id":"172130","member_name":"15902109856","member_mobile":"159****9856","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/video\/2018\/05\/15276610681576.png","member_pro_level":"1","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-09-20"},{"member_id":"172367","member_name":"18745787858","member_mobile":"187****7858","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/video\/2018\/05\/15276610681576.png","member_pro_level":"1","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-09-21"},{"member_id":"174402","member_name":"18506234603","member_mobile":"185****4603","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/video\/2018\/05\/15276610681576.png","member_pro_level":"1","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-10-06"},{"member_id":"174689","member_name":"15047544384","member_mobile":"150****4384","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/video\/2018\/05\/15276610681576.png","member_pro_level":"1","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-10-08"},{"member_id":"174697","member_name":"13467275751","member_mobile":"134****5751","member_avatar":"http:\/\/kashenimg.oss-cn-shenzhen.aliyuncs.com\/video\/2018\/05\/15276610681576.png","member_pro_level":"1","teamnum":"\u52a0\u8f7d\u4e2d...","thorder":"\u52a0\u8f7d\u4e2d...","thyeji":"\u52a0\u8f7d\u4e2d...","all":"\u52a0\u8f7d\u4e2d...","date":"2018-10-08"}],"page":{"pageParam":"page","pageSizeParam":"per-page","forcePageParam":true,"route":null,"params":null,"urlManager":null,"validatePage":true,"totalCount":"35","defaultPageSize":10,"pageSizeLimit":[1,50]}}
    //this.themessage.push(bb.sub_member);
    //this.themessage = Object.assign({}, this.themessage, bb.sub_member)
    this.themessage = this.themessage.concat(bb.sub_member)
      console.log("数据："+JSON.stringify(this.themessage))
  }



  }
};
</script>

<style scoped>
.fruit {
  width: 1200px;
  height: 555px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  overflow: hidden;
}
.lsjt {
  width: 100%;
  height: 20px;
  -moz-border-radius: 15px;
  -webkit-border-radius: 15px;
  border-radius: 15px;
  margin-bottom: 10px;
  background: rgba(66, 161, 141, 0.8);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.mlt {
  height: 20px;
  font-size: 16px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cwtx {
  width: 50px;
  height: 20px;
  display: block;
}
.el-icon-delete {
  cursor: pointer;
}
.el-icon-delete:hover {
  opacity: 0.7;
}
.el-icon-delete:after {
  opacity: 1;
}
.cg{
  position:absolute;
  width: 200px;
  height: 50px;
  line-height: 50px;
  color: aliceblue;
  background-color: black;
  right: 0;
  top: 200px;
}
</style>

