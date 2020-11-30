<template> 
  <div class="appbox">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
        style="text-align: center; font-size: 22px; font-weight: 550"
      >
        <span></span>
      </div>
      <div class="text item">
        <el-form
          :model="loginForm"
          :rules="loginFormRules"
          ref="loginFormRef"
          label-width="100px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <!-- <el-button type="primary" @click="onLogin('loginFormRef')">登录</el-button> -->
            <el-button type="primary" @click="onLogin('loginFormRef')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
      
  </div>
</template>


<script>
// import { login ,getInfo } from "../api/login.js";
export default {
  name: "",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {}, //方法
  methods: {
    onLogin(formName) {
        this.$router.push('/layout')
    //   this.$refs[formName].validate(async valid => {
    //     console.log(valid);
    //     if(valid){
    //       const res = await login(this.loginForm.username,this.loginForm.password)
    //       // console.log(res)
    //       // if(res.flag){
    //         this.$router.push('/Layout/homepage')
    //       // }else {
    //       //   message.PromptMessage("登录失败","error")
    //       // }
    //     } else {
    //       return false;
    //     }

    //   });
      // this.$refs[formName].validate((valid) => {
      //   console.log(formName);
      //   if (!valid) return;
      //   login(this.loginForm.username, this.loginForm.password).then((res) => {
      //     console.log(res);
      //   });
      // });
    },
  },
};
</script>

<style scoped>
.appbox {
  width: 100% !important;
  height: 100% !important;
  background-color: skyblue;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  position: fixed;
  top: 35%;
  left: 33%;
}
.demo-ruleForm {
  padding: 10px 30px;
  box-sizing: border-box;
  /* width: 400px; */
}
</style>