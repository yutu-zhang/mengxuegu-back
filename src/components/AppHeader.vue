<template>
    
  <div>
    <el-breadcrumb separator="/" class="top">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
      
  </div>
</template>


<script>
export default {
  name: "",
  data() {
    return {};
  },
  created() {},
  mounted() {}, //方法
  methods: {},
};
</script>

<style scoped>
.top {
    line-height: 60px;
}
</style>