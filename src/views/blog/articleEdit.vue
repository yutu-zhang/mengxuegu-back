<template>
    <el-dialog
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
  >
    <el-from
      ref="formData"
      :model="formData"
      status-icon
      lable-width="100px"
      lable-position="right"
    >
      <el-form-item label="标题：">
        <el-input v-model="formData.title" readonly />
      </el-form-item>
      <el-form-item label="标签："> </el-form-item>
      <el-form-item label="主图：">
        <img :src="formData.imageUrl" class="avatar" />
      </el-form-item>
      <el-form-item label="是否公开：">
        <el-radio-group v-model="formData.ispublic" disabled>
          <el-radio :label="0">不公开 </el-radio>
          <el-radio :label="1">公开 </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介：">
        <el-input
          v-model="formData.summary"
          type="textarea"
          :autosize="{ minRows: 2 }"
          readonly
        />
      </el-form-item>
      <el-form-item label="内容"> </el-form-item>
      <el-form-item align="center" v-if="isEdit">
        <el-button @click="auditSuccess()" type="primary">审核通过</el-button>
        <el-button @click="auditFail()" type="danger">审核不通过</el-button>
      </el-form-item>
    </el-from>
  </el-dialog>
</template>


<script>
import { getById, getCategoryAndLabel, } from "../../api/bolgArticle";
export default {
  name: "",
  props: {
    id: null,
    isEdit: true, // false为查看详情 true为审核
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    remoteClose: Function,
  },
  data() {
    return {
      formData: {},
      lableOptions: [],
    };
  },
  created() {},
  watch:{
      visible(val){
          if(val){
              this.getArticleById()
          }
      }
  },
  mounted() {}, //方法
  methods: {
    // 关闭弹框
    handleClose() {
      this.remoteClose();
    },

    // 审核通过
    auditSuccess() {},
    // 审核不通过
    auditFail() {},

    // 查看文章详情
    async getArticleById(){
        const res = await getById(this.id)
        console.log(res);
        // this.formData = res.data.data
    },
    // 获取所有分类与标签
    async getLableOptions(){
        const res = await getCategoryAndLabel()
        console.log(res);
        this.lableOptions = res.data.data
    }

  },
};
</script>

<style scoped>
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>