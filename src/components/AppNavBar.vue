<template>
    
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :router="true"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/homepage">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>博客管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/blog/article">文章管理</el-menu-item>
          <el-menu-item index="/blog/sort">分类管理</el-menu-item>
          <el-menu-item index="/blog/lable">标签管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/advert/index">
        <i class="el-icon-s-home"></i>
        <span slot="title">广告管理</span>
      </el-menu-item>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/system/user">用户管理</el-menu-item>
          <el-menu-item index="/system/role">角色管理</el-menu-item>
          <el-menu-item index="/system/menu">菜单管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item style="color:#409EFF">
        <i class="el-icon-paperclip" style="color:#409EFF"></i>
        <router-link target="_blank" tag="span" to="http://www.mengxuegu.com/" >梦学谷官网</router-link>
        <!-- <span slot="title">梦学谷官网</span> -->
      </el-menu-item>
    </el-menu>
      
  </div>
</template>


<script>
export default {
  name: "",
  data() {
    return {
        isCollapse: false,
    };
  },
  created() {},
  mounted() {}, //方法
  methods: {},
};
</script>

<style scoped>
</style>