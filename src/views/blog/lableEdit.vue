<template>
  <el-dialog
    :title="title"
    width="500px"
    :before-close="handleClose"
    :visible.sync="visible"
  >
    <el-form
      :rules="rules"
      :model="formData"
      status-icon
      ref="formData"
      label-width="100px"
      label-position="right"
      style="width: 400px"
    >
      <el-form-item label="标签名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="分类名称:" prop="categoryId">
        <el-select v-model="formData.categoryId" clearable filterable>
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
        <el-button type="primary" @click="submitForm" size="mini">
          确定</el-button
        >
        <el-button size="mini" @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>


<script>
import { addBlogLable, updataBlogLable } from "../../api/blogLable";
export default {
  name: "",
  props: {
    categoryList: {
      //所有正常状态的分类
      type: Array,
      default: [],
    },
    visible: {
      //弹出隐藏
      type: Boolean,
      default: false,
    },
    title: {
      // 标题
      type: String,
      default: "",
    },
    formData: {
      // 表单数据
      type: Object,
      default: {},
    },
    remoteClose: Function, // 用于关闭窗口
  },
  data() {
    return {
      formLabelWidth: "120px",
      rules: {
        // 校验规则
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        categoryId: [{ required: true, message: "请输入分类名称", trigger: "change" }],
      },
    };
  },
  created() {},
  mounted() {}, //方法
  methods: {
    // 关闭弹窗
    handleClose(done) {
      this.$refs["formData"].resetFields();
      this.remoteClose();
    },
    //提交表单
    submitForm() {
      //  this.submitAdd()
      //   console.log(this.formData.id);
      if (this.formData.id) {
        this.submitAdd();
      } else {
        //   this.submitUpdata
        this.updata();
      }
    },
    // 提交数据添加 新增
    submitAdd() {
      this.$refs["formData"].validate(async (valid) => {
        console.log(valid);
        if (valid) {
          const res = await addBlogLable(this.formData);
          console.log(res);
          if (res.data.code == 20000) {
            this.$message({
              message: "新增成功",
              type: "success",
            });
            // 关闭窗口
            this.handleClose();
            // this.$refs["formData"].resetFields();
          } else {
            this.$message({
              type: "error",
              message: "新增失败",
            });
          }
        }
      });
    },

    // 修改
    updata() {
      this.$refs["formData"].validate(async (valid) => {
        console.log(valid);
        if (valid) {
          const res = await addBlogLable(this.formData);
          console.log(res);
          if (res.data.code == 20000) {
            this.$message({
              message: "编辑成功",
              type: "success",
            });
            // 关闭窗口
            this.handleClose();
          } else {
            this.$message({
              type: "error",
              message: "编辑失败",
            });
          }
        }
      });
    },
  },
};
</script>

<style scoped>
</style>