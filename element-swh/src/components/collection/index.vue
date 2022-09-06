<template>
  <div class="tps-m">
    <div class="fruit">
      <el-carousel :interval="5000" type="card" height="530px">
        <el-carousel-item>
          <img class="jdimg" src="../../assets/images/t1.jpg">
        </el-carousel-item>
        <el-carousel-item>
          <img class="jdimg" src="../../assets/images/t2.jpg">
        </el-carousel-item>
        <el-carousel-item>
          <img class="jdimg" src="../../assets/images/t3.jpg">
        </el-carousel-item>
        <el-carousel-item>
          <img class="jdimg" src="../../assets/images/t4.jpg">
        </el-carousel-item>
        <el-carousel-item>
          <img class="jdimg" src="../../assets/images/t5.jpg">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList:[]
    };
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
.fruit {
  width: 1400px;
  height: 555px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 120px;
  overflow: hidden;
}
.jdimg{
  width: 100%;
  height: 100%;
}
</style>
