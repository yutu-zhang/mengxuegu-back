<template>
    
  <div>
    <!--  查询  -->
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="标签名称:">
        <el-input v-model.trim="query.name"></el-input>
      </el-form-item>
      <el-form-item label="分类名称:" prop="categoryId">
        <el-select v-model="query.categoryId" clearable filterable>
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-search"
          type="primary"
          @click="queryData(query.name)"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" class="filter-item" @click="reload"
          >重置</el-button
        >
        <el-button
          type="primary"
          @click="openAdd"
          icon="el-icon-circle-plus-outline"
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <!--   表格 -->
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="180"> </el-table-column>
      <el-table-column prop="name" label="标签名称"> </el-table-column>
      <el-table-column prop="categoryName" label="分类名称"> </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>

    <!-- 新增与编辑 弹框 -->
    <lable-edit
      :categoryList="categoryList"
      :title="edit.title"
      :visible="edit.visible"
      :formData="edit.formData"
      :remoteClose="remoteClose"
    ></lable-edit>
  </div>
</template>


<script>
const statusOptions = [
  { code: 0, name: "禁用" },
  { code: 1, name: "正常" },
];
import {
  getBlogLable,
  findBlogLable,
  addBlogLable,
  deleBlogLable,
  updataBlogLable,
  getNormalList
} from "../../api/blogLable";
// 引入新增组件
import lableEdit from "./lableEdit";
export default {
  name: "",
  components: { lableEdit },
  data() {
    return {
      query: {
        // // 查询
        // name: "",
        // status: "",
        // categoryId:"",
      },
      tableData: [], // 表格
      page: {
        current: 1,
        size: 20,
        total: 0,
      },
      statusOptions, // 下拉框状态
      dialogVisible: false,
      categoryList:[],
      edit: {
        //
        title: "",
        visible: false,
        formData: { status:null, id: null, name: "", sort: null, remark: "" },
      },
    };
  },
  created() {
    this.getLableaDate();
    this.getCategoryList()
  },
  mounted() {}, //方法
  methods: {
    //  获取表格数据
    async getLableaDate() {
      const res = await getBlogLable(this.query,this.page.current, this.page.size);
      //   console.log(res);
      this.tableData = res.data.data.records;
      this.page.total = res.data.data.total;
    },

    // 关闭新增与修改的组件弹框
    remoteClose() {
      // this.formData ={},
      this.edit.visible = false;
      this.getLableaDate()
    },

    // 编辑
    async handleEdit(id){
      const res = await findBlogLable(id)  //查询接口获取id
        console.log(res.data.data);
      if(res.data.code == 20000){
        this.edit.formData = res.data.data
        this.edit.visible = true;
        this.edit.title = "编辑";

      }else {
        this.$message({
          type:'error',
          message:'查询数据失败 '
        })
      }
    },

    // 新增
    openAdd() {
      this.edit.visible = true;
      this.edit.title = "新增";
    },
    // 重置
    reload() {
      this.query = {};
      this.getLableaDate();
    },
    // 查询
    async queryData(val) {
      const fin = await findBlogLable(val);
      // console.log(fin);
      this.page.current = 1;
      // this.tableData = fin.config.data
      this.query ={}
      this.getLableaDate();
    },
    // 删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const dele = await deleBlogLable(id);
          console.log(dele);
          if (dele.data.code == 20000) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 分页
    handleSizeChange(val) {
      this.page.size = val;
      this.getLableaDate();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getLableaDate();
    },

    // 获取所有状态为正常的分类 用于条件查询
    async getCategoryList(){
      const res = await getNormalList()
      // console.log(res);
      this.categoryList = res.data.data
    }
  },
};
</script>

<style scoped>
</style>