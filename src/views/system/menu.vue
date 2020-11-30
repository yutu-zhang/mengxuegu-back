<template>
    
  <div>
    <!-- 查询 -->
    <el-form :inline="true" size="mini" style="line-height:30px">
      <el-form-item label="角色名称:">
        <el-input v-model.trim="query.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="queryData"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" class="filter-item" @click="reload"
          >重置</el-button
        >
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-circle-plus-outline"
          @click="handleAdd"
          >新增</el-button
        >
      </el-form-item>
    </el-form>



    <!--  -->
    <el-table
      :data="list"
      row-key="id"
      border
      highlight-current-row
      style="width: 100%"
    >
      <!-- type="index"获取索引值，从1开始 ，label显示标题，prop 数据字段名，width列宽 -->
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="60"
      ></el-table-column>
      <el-table-column align="left" prop="name" label="名称"></el-table-column>
      <el-table-column
        align="center"
        prop="url"
        label="请求地址"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="code"
        label="权限标识"
      ></el-table-column>
      <el-table-column align="center" prop="type" label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type === 1">目录</span>
          <span v-if="scope.row.type === 2">菜单</span>
          <span v-if="scope.row.type === 3">按钮</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="code" label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="sort"
        label="排序"
      ></el-table-column>
      <el-table-column align="center" label="操作" width="260">
        <template slot-scope="scope">
          <el-button
            @click="handleAdd(scope.row.id)"
            size="mini"
            type="primary"
            icon="el-icon-circle-plus-outline"
            >新增</el-button
          >
          <el-button @click="handleEdit(scope.row.id)" size="mini"
            >编辑</el-button
          >
          <el-button
            @click="handleDelete(scope.row.id)"
            size="mini"
            type="danger"
          >
            删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
      
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[10, 20, 50]"
      :page-size="page.size"
      :total="page.total"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>


<script>
import { getMenuList ,deleteMenu} from "../../api/menu";
export default {
  name: "",
  data() {
    return {
      query: {},
      list: [],
      page:{
        size:20,
        current:1,
        total:0
      },
    };
  },
  created() {
    this.getMenuData();
  },
  mounted() {}, //方法
  methods: {
    async getMenuData() {
      const res = await getMenuList(this.query,this.page.current,this.page.size);
      // console.log(res);
      this.list = res.data.data;
      this.total = res.data.total
    },
    // 删除
    handleDelete(id) {
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const dele = await deleteMenu(id)
          console.log(dele);
          if(dele.data.code === 20000){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
          this.getMenuData()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 分页
    handleSizeChange(val){
      this.page.size = val
      this.getMenuData()
    },
    handleCurrentChange(val){
      this.page.current = val
      this.getMenuData()
    },
    // 新增
    handleAdd(id) {
      console.log("新增", id);
    },
    handleEdit(id) {
      console.log("编辑", id);
    },

    // 查询
    queryData(){
      this.getMenuData()
      this.page.current =1
      this.query ={}
    },
    // 重置
    reload(){
      this.query ={}
      this.getMenuData()
    },
    // 新增
    // handleAdd(){

    // },


  },
};
</script>

<style scoped>
</style>