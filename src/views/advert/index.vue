<template>
    
  <div>
    <!-- 条件查询 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="广告标题:">
        <el-input size="mini" v-model.trim="query.title"></el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select
          size="mini"
          v-model="query.status"
          clearable
          filterable
          style="width: 85px"
        >
          <el-option
            v-for="(item, index) in statusOptions"
            :key="index"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-search"
          size="mini"
          type="primary"
          @click="queryData"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="reload"
          >重置</el-button
        >
        <el-button
          type="primary"
          @click="add"
          size="mini"
          icon="el-icon-circle-plus-outline"
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 数据渲染 -->
    <el-table :data="list" border highlight-current-row style="width: 100%">
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="60"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="title"
        label="广告标题"
      ></el-table-column>
      <el-table-column align="center" label="广告图片">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.imageUrl"
            :preview-src-list="[scope.row.imageUrl]"
            style="width: 90px; height: 60px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="advertUrl" label="广告链接" align="center"></el-table-column>
      <el-table-column align="center" prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" type="danger">禁用</el-tag>
          <el-tag v-if="scope.row.status === 1" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
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

    <!-- 分页 -->
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

    <!-- 新增 编辑 组件 -->
    <edit
      :visible="edit.visible"
      :title="edit.title"
      :oldImageUrl="edit.oldImageUrl"
      :formData="edit.formData"
      :remoteClose ="remoteClose"
    ></edit>
  </div>
</template>


<script>
import Edit from "./edit.vue";
import { getAdvertList, deleteAdvert ,getAdverId } from "../../api/advert";
const statusOptions = [
  { code: 0, name: "禁用" },
  { code: 1, name: "正常" },
];
export default {
  components: { Edit },
  name: "",
  data() {
    return {
      list: [],
      page: {
        total: 0,
        current: 1,
        size: 20,
      },
      query: {}, // 查询条件
      statusOptions,
      edit: {
        title: "",
        visible: false,
        oldImageUrl: null, //修改前的照片url
        formData: {
          imageUrl: null, // 不然上传新图片不可立刻预览
        },
      },
    };
  },
  created() {
    this.getAdvertData();
  },
  mounted() {}, //方法
  methods: {
    // 数据渲染
    async getAdvertData() {
      const res = await getAdvertList(
        this.query,
        this.page.current,
        this.page.size
      );
        // console.log(res.data.data.records);
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
          const res = await deleteAdvert(id);
          if (res.data.code == 20000) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
          this.getAdvertData();
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
      // 每页显示的数据
      this.page.size = val;
      this.getAdvertData();
    },
    handleCurrentChange(val) {
      // 改变页码
      this.page.current = val;
      this.getAdvertData();
    },

    // 查询
    queryData() {
      this.getAdvertData();
      this.page.current = 1;
      // this.query = {}
    },
    // 重置
    reload() {
      this.query = {};
      this.getAdvertData();
    },

    // 关闭弹框
    remoteClose(){
      this.edit.formData = {imageUrl:null}
      this.edit.visible = false
      this.getAdvertData()
    },

    // 新增
    add() {
      this.edit.title = "新增";
      this.edit.visible = true
      // console.log("新增", id);
    },
    // 编辑
    async handleEdit(id) {
      const res = await getAdverId(id)
      console.log(res);
      if(res.data.code===20000){
        this.edit.formData = res.data.data
        this.edit.oldImageUrl = res.data.data.imageUrl 
      }
      this.edit.title = '编辑'
      this.edit.visible = true
    },
  },
};
</script>

<style scoped>
.demo-form-inline {
  line-height: 40px;
}
</style>