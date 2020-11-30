<template>
    
  <div>
    <!-- 查询 -->
    <el-form :inline="true" size="mini" style="line-height: 30px">
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

    <!-- 数据渲染 -->
    <el-table :data="list" border highlight-current-row style="width: 100%">
      <!-- type="index"获取索引值，从1开始 ，label显示标题，prop 数据字段名，width列宽 -->
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="60"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="角色名称"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="remark"
        label="备注"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handlePermission(scope.row.id)"
            size="mini"
            type="success"
            >分配权限</el-button
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

    <!--编辑 新增 组件引入 -->
    <EditRole
      :title="edit.title"
      :visible="edit.visible"
      :formData="edit.formData"
      :remoteClose="remoteClose"
    ></EditRole>

    <!-- 分配权限 -->
    <el-dialog
      title="分配权限"
      :visible.sync="visiblePer"
      width="500px"
      :before-close="perClose"
    >     
      <!-- v-loading 值为 true 显示加载中 -->
      <el-form v-loading="loading" label-width="80px">
        <el-tree
          ref="tree"
          :data="menuList"
          :default-checked-keys="menuIds"
          :props="{ children: 'children', label: 'name' }"
          node-key="id"
          show-checkbox
          accordion
          highlight-current
        />
        <el-form-item align="center">
          <el-button size="mini" @click="perClose">取 消</el-button>
          <el-button size="mini" type="primary" @click="perSubmit('menuList')"
            >确 定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
import {getMenuList} from '@/api/menu.js'
import EditRole from "./edit/EditRole.vue";
import { getRoleList, deleteRoleList, findIdRole ,saveRoleMenu ,getMenuIdsByRoleId} from "../../api/role";
export default {
  name: "",
  components: { EditRole },
  data() {
    return {
      list: [], // 列表数据
      page: {
        // 分页相关
        total: 0, // 总记录数
        current: 1, // 当前页码
        size: 20, // 每页显示20条数据
      },
      query: {}, // 查询条件
      edit: {
        title: "",
        visible: false,
        formData: {},
      },
      // 分配
      roleId:null,
      visiblePer:false,
      menuList:[],
      menuIds:[],
      loading:false
    };
  },
  watch:{
    visible:function(val){
      if(val){
        this.getMenuList()
      }
    }
  },
  created() {
    this.getRoleData();
  },
  mounted() {}, //方法
  methods: {
    async getRoleData() {
      const res = await getRoleList(
        this.query,
        this.page.current,
        this.page.size
      );
      // console.log(res);
      this.list = res.data.data.records;
      this.page.total = res.data.data.total;
    },
    // 删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await deleteRoleList(id);
          if (res.data.code == 20000) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
          this.getRoleData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 当每页显示条数改变后,被触发 , val是最新的每页显示条数
    handleSizeChange(val) {
      this.page.size = val;
      this.getRoleData();
    },
    // 当页码改变后,被触发 , val 是最新的页面
    handleCurrentChange(val) {
      this.page.current = val;
      this.getRoleData();
    },
    // 查询
    queryData() {
      // 将页码变为第1页
      this.page.current = 1;
      this.getRoleData();
      this.query = {};
    },
    // 重置 or 刷新当前页面
    reload() {
      this.query = {};
      this.getRoleData();
    },
    // 关闭编辑及新增组件弹窗
    remoteClose() {
      this.edit.visible = false;
      this.getRoleData();
    },
    // 新增方法
    handleAdd() {
      this.edit.title = "新增";
      this.edit.visible = true;
    },
    // 编辑
    async handleEdit(id) {
      const resid = await findIdRole(id);
      if (resid.data.code === 20000) {
        this.edit.title = "编辑";
        this.edit.visible = true;
        this.edit.formData = resid.data.data;
      }
    },
    // 分配权限 点击
    handlePermission(id) {
      this.visiblePer = true
      this.roleId = id
      console.log("分配权限", id);
    },

    // 分配 确定
    async perSubmit(formName){
      const checkeMenuIds = this.$refs.tree.getcheckedKeys()

      const res = await saveRoleMenu(this.roleId,checkeMenuIds)
      if(res.data.code === 20000){
        this.$message({
          message:'保存成功',
          type:'success'
        })
        this.perClose()
      }else {
        this.message({
          type:'error',
          message:'保存失败'
        })
      }
    },
    // 分配 取消
    perClose(){
      this.visiblePer = false
      this.roleId = null
      this.getRoleData()
    },
    // 查询所有菜单
    async getMenuList(){
      const res = await getMenuList()
      this.menuList = res.data.data
      this.getMenuIdsByRoleId(this.roleId)
      this.loading = false
    },

    async getMenuIdsByRoleId(roleId){
      const res = await getMenuIdsByRoleId(roleId)
      this.menuIds = res.data.data
    }

  },
};
</script>

<style scoped>
</style>