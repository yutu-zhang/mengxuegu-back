<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
    width="600px"
  >
    <el-form
      :model="formData"
    ref="formData"
      status-icon
      :title="title"
      :rules="rules"
    >
      <el-form-item label="广告图片：" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          action=""
          accept="image/"
          :show-file-list="false"
          :http-request="uploadMainImg"
        >
          <img
            v-if="formData.imageUrl"
            :src="formData.imageUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="广告标题："
        prop="title"
        :label-width="formLabelWidth"
      >
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item
        label="广告链接："
        prop="title"
        :label-width="formLabelWidth"
      >
        <el-input v-model="formData.advertUrl"></el-input>
      </el-form-item>

      <el-form-item
        label="跳转方式："
        prop="advertTarget"
        clearable
        :label-width="formLabelWidth"
      >
        <el-select v-model="formData.advertTarget" placeholder="请选择">
          <el-option label="新窗口打开" value="_blank"></el-option>
          <el-option label="当前窗口打开" value="_self"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态：" prop="status" :label-width="formLabelWidth">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="广告位置："
        prop="position"
        :label-width="formLabelWidth"
      >
        <el-input-number
          v-model="formData.position"
          :min="1"
          :max="100000"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="排序：" prop="sort" :label-width="formLabelWidth">
        <el-input-number
          v-model="formData.sort"
          :min="1"
          :max="1000000"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm('formData')"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>


<script>
import { uploadImg, deleteImg ,addAdvert,updataAdvert} from "../../api/advert";
export default {
  name: "",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    formData: {
      type: Object,
      default: {},
    },
    oldImageUrl: String,
    remoteClose: Function,
  },
  data() {
    return {
      //   visible: false,
      formLabelWidth: "120px",
      rules: {
        // 校验规则
        imageUrl: [
          { required: true, message: "请上传广告图片", trigger: "blur" },
        ],
        title: [{ required: true, message: "请输入广告标题", trigger: "blur" }],
        advertUrl: [
          { required: true, message: "请输入广告链接", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        position: [
          { required: true, message: "请输入广告位置", trigger: "blur" },
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {}, //方法
  methods: {
    //   关闭tankuang
    handleClose(done) {
      this.$refs["formData"].resetFields();
      this.remoteClose();
    },

    //
    submitForm() {
        this.$refs['formData'].validate((valid) => {
            // console.log(valid);
            if(valid){
                // 校验成功 提交表单数据
                this.submitData()
            }else{
                return false
            }
        })
    },
    // 异步 提交方法
    async submitData(){
        const response = null
        if(this.formData.id){
            response = await updataAdvert(this.formData)
        }else {
            response = await addAdvert(this.formData)
        }

        if(res.data.code === 20000){
            this.$message({
                type:'success',
                message:'保存成功'
            })
            this.handleClose()
        }else {
            this.$message({
                message:'保存成功',
                type:'error'
            })
        }
    },

    //上传图片
    async uploadMainImg(file) {
      const data = new FormData();
      data.append("file", file.file);
      // 发送请求上传
      const res = await uploadImg(data);
      console.log(res);
      if (res.data.code == 20000) {
        this.deleteImg(); //防止图片多次上传 上传成功后，把原来图片删除
        this.formData.imageUrl = res.data.data;
      } else {
        this.$message({
          showClose: true,
          message: "上传失败",
          type: "error",
        });
      }
    },
    // 删除主图
    async deleteImg() {
      if (this.formData.imgUrl && this.formData.imgUrl !== this.oldImageUrl) {
        await deleteImg(this.formData.imageUrl); //删除
      }
    },
  },
};
</script>

<style scoped>
/* 图片上传 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-upload,
.avatar-uploader-icon[data-v-218f38bb] {
  border: 1px dashed #dcdfe6 !important ;
}
</style>