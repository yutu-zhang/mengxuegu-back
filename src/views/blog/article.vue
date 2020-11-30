<template>
  <div>
    <!-- 查询添加 -->
    <div class="top">
      <el-form :inline="true" size="mini" style="line-height:30px">
        <el-form-item label="文章标题:">
          <el-input v-model.trim="query.title"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <!-- clearable 清空按钮，filterable 是否可搜索 -->
          <el-select v-model="query.status" clearable filterable style="width: 100px">
            <!-- :value="1" 是数字1，value="1"是字符串“1” 
            0: 已删除, 1:未审核，2:审核通过，3：审核未通过-->
            <el-option :value="1" label="未审核"></el-option>
            <el-option :value="2" label="审核通过"></el-option>
            <el-option :value="3" label="审核未通过"></el-option>
            <el-option :value="0" label="已删除"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="queryData">查询</el-button>
          <el-button icon="el-icon-refresh" class="filter-item" @click="reload">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="title" label="文章标题" align="center"></el-table-column>
      <el-table-column prop="viewCount" label="浏览数" align="center" width="100"></el-table-column>
      <el-table-column prop="thumhup" label="点赞数" align="center" width="100"></el-table-column>
      <el-table-column label="是否公开" align="center" width="120">
        <template slot-scope="scope">
          <!-- 判断返回type类型 展示不同样式 及 字段 -->
          <el-tag
            :type="scope.row.ispublic === 0 ? 'warning' : 'danger'"
          >{{scope.row.ispublic | info}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="状态" align="center" width="150">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1">未审核</el-tag>
          <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
          <el-tag v-if="scope.row.status === 3" type="warning">审核未通过</el-tag>
          <el-tag v-if="scope.row.status === 0" type="danger">已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="最后更新时间" prop="updateDate" align="center">
        <template slot-scope="scope">{{getFormat(scope.row.updateDate)}}</template>
      </el-table-column>
      <el-table-column prop="address" label="操作" align="left" width="240" min-width="210">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="scope.row.status === 1"
            @click="openAudit(scope.row)"
            type="success"
          >审核</el-button>
          <el-button size="mini" type="primary" @click="ShowList(scope.row)">查看</el-button>
          <el-button
            size="mini"
            v-if="scope.row.status !== 0"
            @click="handleDelete(scope.row.id)"
            type="danger"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-sizes="[2, 5, 8, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>

    <!-- 查看编辑弹框 -->
    <el-dialog :visible.sync="dialogFormVisible" width="70%">
      <!-- status-icon 当表单校验不通过时, 输入框右侧有个 x 小图标 -->
      <el-form :model="form" label-width="100px" title="查看" label-position="right">
        <el-form-item label="标题:">
          <el-input v-model="form.title" readonly />
        </el-form-item>
        <el-form-item label="标签:">
          <el-cascader
            style="display: block"
            v-model="form.labelIds"
            :props="{ multiple: true, emitPath: false, children: 'labelList', value: 'id', label: 'name'}"
          />
        </el-form-item>
        <el-form-item label="主图:">
          <img :src="form.imageUrl" style="width:178px; heigth:178px; display:block" />
        </el-form-item>
        <el-form-item label="是否公开:">
          <el-radio-group v-model="form.ispublic" disabled>
            <el-radio :label="0">不公开</el-radio>
            <el-radio :label="1">公开</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="简介:">
          <el-input v-model="form.summary" type="textarea" :autosize="{ minRows: 2 }" readonly />
        </el-form-item>
        <el-form-item label="内容:">
          <mavon-editor ref="md" v-model="form.mdContent" :editable="false" />
        </el-form-item>
        <el-form-item align="center" v-if="isAudit">
          <el-button type="primary">审核通过</el-button>
          <el-button type="danger">审核不通过</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getArtidleList,
  DelArtidleList,
  ShowArtidleList
} from "../../api/blogArticle";
//导入时间
import { format } from "@/utils/date";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: { mavonEditor },
  // 组件状态值
  data() {
    return {
      tableData: [],
      page: {
        total: 0,
        current: 1,
        size: 20
      },
      query: {},
      dialogFormVisible: false,
      form: {
        title: "查看",
        labelIds: "",
        imageUrl: "",
        ispublic: "",
        summary: ""
      },
      isAudit: false
    };
  },
  // 计算属性
  computed: {},
  //过滤器
  filters: {
    // 是否公开
    info(info) {
      if (info == 0) {
        return "公开";
      }
      if (info == 1) {
        return "不公开";
      }
    }
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    //获取列表数据
    async GetList() {
      let data = await getArtidleList(this.page.current, this.page.size);
      this.tableData = data.data.data.records;
      this.page.total = data.data.data.total;
    },
    //分页
    handleSizeChange(val) {
      this.GetList();
      this.size = val;
    },
    handleCurrentChange(val) {
      this.current = val;
      this.GetList();
    },
    //过滤时间
    getFormat(date) {
      return format(date);
    },
    // 查询
    queryData() {
      // 将页码变为第1页
      this.page.current = 1;
      this.GetList();
    },
    // 重置 or 刷新当前页面
    reload() {
      this.query = {};
      this.GetList();
    },
    //删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let data = await DelArtidleList(id);
          this.GetList();
          console.log(data);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async ShowList(res) {
      let data = await ShowArtidleList(res.id);
      this.form = data.data.data;
      this.dialogFormVisible = true;
    },
    //审核
    openAudit(res) {
      this.ShowList(res), (this.isAudit = true);
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
    this.GetList();
  },
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {},
  /**
   * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
   * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
   */
  beforeUpdate() {},
  /**
   * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
   * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
   */
  updated() {},
  /**
   * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
   */
  activated() {},
  /**
   * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
   */
  deactivated() {},
  /**
   * 实例销毁之前调用。在这一步，实例仍然完全可用。
   */
  beforeDestroy() {},
  /**
   * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
   * 所有的事件监听器会被移除，所有的子实例也会被销毁。
   */
  destroyed() {}
};
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped>
.top {
  text-align: left;
}
</style>
