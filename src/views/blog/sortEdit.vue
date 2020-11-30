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
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number
          style="width: 300px"
          v-model="formData.sort"
          :min="1"
          :max="10000"
        />
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input
          v-model="formData.remark"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入备注"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')" size="mini">
          确定</el-button
        >
        <el-button size="mini" @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>


<script>
import { addBlogSort, updataBlogSort } from "@/api/blogSort";
export default {
  name: "",
  props: {
    visible: { //弹出隐藏
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
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        sort: [{ required: true, message: "请输入排序号", trigger: "change" }],
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
      console.log(this.formData.id);
      if(this.formData.id==true){
          this.updata()
      }else {
        //   this.submitUpdata
          this.submitAdd()
      }

    },
    // 提交数据添加 新增
    submitAdd(formNme) {
      this.$refs["formData"].validate(async (valid) => {
          console.log(valid);
        if (valid) {
          const res = await addBlogSort(this.formData);
            console.log(res);
          if (res.data.code == 20000) {
            this.$message({
              message: "新增成功",
              type: "success",
            });
            // 关闭窗口
            this.handleClose();
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
      this.$refs['formData'].validate(async (valid) => {
          console.log(valid);
        if (valid) {
          const res = await updataBlogSort(this.formData);
            console.log(res);
          if (res.data.code == 20000) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            // 关闭窗口
            this.handleClose();
          } else {
            this.$message({
              type: "error",
              message: "修改失败",
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