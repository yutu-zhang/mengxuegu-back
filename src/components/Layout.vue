<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">
        <AppNavBar>
          
        </AppNavBar>
      </el-aside>

      <el-container>
        <el-header>
          <AppHeader></AppHeader>
        </el-header>
        <el-main>
          <AppMain>  <router-view></router-view></AppMain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
import AppNavBar from "./AppNavBar";
import AppMain from "./AppMain";
export default {
  name: "",
  data() {
    return {};
  },
  components: {
    AppHeader,
    AppNavBar,
    AppMain,
  },
};
</script>


<style scoped>
.el-header{
  background-color: #eff2f7;
  color: #333;
}

.el-aside {
  background-color: rgb(84, 92, 100);
  color: #333;
}

.el-main {
  background-color: #fff;
  color: #333;
  line-height: 60px;
}

.el-container{
    height: 100%;
    width: 100%;
}
.layout{
    height: 100%;
    width: 100%;
}
</style>