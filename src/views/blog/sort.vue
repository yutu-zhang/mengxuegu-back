<template>
    
  <div class="Sort">
    <!--  查询  -->
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="分类名称:">
        <el-input v-model.trim="query.name"></el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select
          v-model="query.status"
          clearable
          filterable
          style="width: 85px"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.code"
            :label="item.name"
            :value="item.code"
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

    <!-- 数据列表 -->
    <el-table :data="list" border highlight-current-row style="width: 100%">
      <!-- type="index"获取索引值，从1开始 ，label显示标题，prop 数据字段名，width列宽 -->
      <el-table-column align="center" type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="分类名称"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="sort"
        label="排序"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="remark"
        label="备注"
      ></el-table-column>
      <el-table-column align="center" prop="status" label="状态" width="160">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{ scope.row.status ? "正常" : "禁用" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <!-- @click="handleEdit(scope.row.id)" -->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 修改 弹框 -->
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 分页 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.current"
      :page-sizes="[20, 10, 50]"
      :page-size="this.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total"
    >
    </el-pagination>

    <!-- 新增以及编辑 组件 -->
    <sort-edit
      :title="edit.title"
      :visible="edit.visible"
      :formData="edit.formData"
      :remoteClose="remoteClose"
    ></sort-edit>
  </div>
</template>


<script>
// 状态下拉
const statusOptions = [
  { code: 0, name: "禁用" },
  { code: 1, name: "正常" },
];
import sortEdit from "./sortEdit";
import {
  getBlogSort,
  getDeleBlogSort,
  deleBlogSort,
  findBlogSort,
} from "@/api/blogSort.js";
export default {
  name: "",
  components: { sortEdit },
  data() {
    return {
      list: [],
      query: {
        // 条件查询
        // name: "",
        // status: "",
      },
      current: 1,
      size: 10,
      total: null,
      ///
      formLabelWidth: "120px",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      dialogFormVisible: false,
      statusOptions, //状态
      edit: {
        title: "",
        visible: false,
        formData: {
          id: null,
          name: "",
          sort: null,
          remark: "",
        },
      },
    };
  },
  filters: {
    statusFilter(status) {
      const sta = { 0: "danger", 1: "success" };
      return sta[status];
    },
  },
  created() {
    this.getSortList();
  },
  mounted() {}, //方法
  methods: {
    async getSortList() {
      let res = await getBlogSort(this.query, this.current, this.size);
      this.list = res.data.data.records;
      this.total = res.data.data.total;
    },

    // 编辑
    async handleEdit(id) {
      let res = await findBlogSort(id);
      // console.log(res);
      if (res.data.code == 20000) {
        this.edit.formData = res.data.data;
        this.edit.title = "编辑";
        this.edit.visible = true;
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
      this.getSortList();
    },
    // 删除
    handleDelete(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 调用删除接口
          const dele = await deleBlogSort();
          console.log(dele);
          if (dele.data.code == 20000) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
          this.getSortList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 查询
    async queryData() {
      // const finds = await findBlogSort(this.query);
      // console.log(finds);
      // this.list = finds.data.data;
      // this.total = finds.data.data
      this.current = 1;
      this.getSortList();
    },
    // 分页
    handleSizeChange(val) {
      this.size = val;
      this.getSortList();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.getSortList();
    },
    // 触发关闭弹出的新增修改子组件窗口
    remoteClose() {
      this.edit.visible = false;
      this.getSortList()
    },
  },
};
</script>

<style scoped>
.el-form {
  height: 60px;
  line-height: 60px;
}
</style>