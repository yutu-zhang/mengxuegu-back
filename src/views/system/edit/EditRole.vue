<template>
  <el-dialog :title="title" :visible.sync="visible" :before-close="handleClose">
    <el-form :model="formData" width="400" align="center" ref="formData" status-icon :title="title" :rules="rules">
      <el-form-item prop="name" label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="formData.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="备注：" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="formData.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm('formData')">确 定</el-button>
    </div>
  </el-dialog>
</template>


<script>
import {addRole,updataRole} from '@/api/role'
export default {
  name: "",
  props: {
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      default: {},
    },
    remoteClose: Function,
  },
  data() {
    return {
      rules:{
        name:[{ required: true, message: "请输入角色名称", trigger: "blur" }],
      },
      formLabelWidth: "120px",
    };
  },
  created() {},
  mounted() {}, //方法
  methods: {
    handleClose(done) {
      this.$refs['formData'].resetFields()
      this.remoteClose();
    },
    submitForm(){
        // this.submitAdd()
      if(this.formData.id){
        this.submitUpdata()
      }else {
        this.submitAdd()
      }
    },
    submitAdd(){
      this.$refs['formData'].validate(async (valid)=>{
        if(valid){
          const res = await addRole()
          // console.log(res);
          if(res.data.code === 20000){
            this.$message({
              message:'新增成功',
              type:'success'
            })
            this.handleClose()
          }else {
            this.$message({
              message:'新增失败',
              type:'error'
            })
          }
        }
      })
    },
    // 编辑
    submitUpdata(){
      this.$refs['formData'].validate(async (valid)=>{
        if(valid){
          const res = await updataRole()
          // console.log(res);
          if(res.data.code === 20000){
            this.$message({
              message:'编辑成功',
              type:'success'
            })
            this.handleClose()
          }else {
            this.$message({
              message:'编辑失败',
              type:'error'
            })
          }
        }
      })
    }
  },
};
</script>

<style scoped>
</style>