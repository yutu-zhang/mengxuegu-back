<template>
  <div>
    <!-- 查询 -->
    <el-form :inline="true" size="mini" style="line-height:30px">
      <el-form-item label="文章标题">
        <el-input v-model.trim="query.title"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="query.status"
          placeholder="请选择"
          clearable
          filterable
          style="width: 100px"
        >
          <el-option label="未审核" :value="1"></el-option>
          <el-option label="审核通过" :value="2"></el-option>
          <el-option label="审核未通过" :value="3"></el-option>
          <el-option label="已删除" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="queryData"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" @click="reload">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 获取数据 -->
    <el-table :data="list" border highlight-current-row style="width: 100%">
      <!-- type="index"获取索引值，从1开始 ，label显示标题，prop 数据字段名，width列宽 -->
      <el-table-column align="center" type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" prop="title" label="文章标题">
      </el-table-column>
      <el-table-column align="center" prop="viewCount" label="浏览量">
      </el-table-column>
      <el-table-column align="center" prop="thumhup" label="点赞数">
      </el-table-column>
      <el-table-column align="center" prop="ispublic" label="是否公开">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.ispublic === 0" type="danger">不公开</el-tag>
          <el-tag v-if="scope.row.ispublic === 1" type="warning">公开</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1">未审核</el-tag>
          <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
          <el-tag v-if="scope.row.status === 3" type="warning"
            >审核未通过</el-tag
          >
          <el-tag v-if="scope.row.status === 0" type="danger">已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updateDate" label="最后更新时间">
        <template slot-scope="scope">
          {{ getFormat(scope.row.updateDate) }}
        </template>
      </el-table-column>
      <el-table-column align="left" label="操作" width="220">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="scope.row.status === 1"
            @click="openAudit(scope.row.id)"
            type="success"
            >审核</el-button
          >
          <el-button
            size="mini"
            v-if="scope.row.status !== 0"
            @click="handleDelete(scope.row.id)"
            type="danger"
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

    <!-- 审核 查看 组件 -->
    <article-edit :id="edit.id" :idEdit="edit.isEdit" :title="edit.title" :visible="edit.visible" :remoteClose="remoteClose" />

  </div>
</template>

<script>
import articleEdit from './articleEdit.vue'
import { format } from "@/utils/date"; //日期转换
import { getArticleList, deleteArticle } from "../../api/bolgArticle";
export default {
  components:{articleEdit},
  data() {
    return {
      list: [],
      page: {
        current: 1,
        size: 20,
        total: 0,
      },
      query: {},
      edit:{
        id:null,
        idEdit:true,  // true审核 false详情
        visible:false,
        title:''
      },
    };
  },
  created() {
    this.getArticleData();
  },
  //方法
  methods: {
    // 日期转换
    getFormat(data) {
      return format(data);
    },
    // 获取数据
    async getArticleData() {
      const res = await getArticleList(
        this.query,
        this.page.current,
        this.page.size
      );
      console.log(res);
      this.list = res.data.data.records;
      this.page.total = res.data.data.total;
    },

    // 分页
    handleSizeChange(val) {
      this.page.size = val;
      this.getArticleData();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getArticleData();
    },

    // 删除
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
            const dele = await deleteArticle(id)
            if(dele.data.code ===20000){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
            this.getArticleData()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    },

    // 重置
    reload() {
      this.query = {};
      this.getArticleData();
    },

    // 查询
    queryData() {
      this.page.current = 1;
      this.getArticleData();
    },

    // 编辑
    handleEdit(id) {
      console.log("编辑", id);
    },
    // 审核
    openAudit(id) {
      this.edit.id = id
      this.edit.title='审核文章'
      this.edit.idEdit = true,
      this.edit.visible = true
      console.log("审核", id);
    },

    // 关闭子组件弹出的窗口
    remoteClose(){
      this.edit.visible = false
      this.getArticleData()
    }
  },
};
</script>

<style scoped>
</style>