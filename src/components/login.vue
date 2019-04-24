<template>
  <div class="login">
    <div class="loginbox">
      <p>用户登陆</p>
      <el-form label-position="top" :model="formLogin" :rules="rules" ref="formLogin">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="formLogin.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input v-model="formLogin.passWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="buttonLogin" @click="submitForm('formLogin')">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLogin: {
        userName: "",
        passWord: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.$axios.post("login", {
            username: this.formLogin.userName,
            passWord: this.formLogin.passWord
          });
          console.log(res);
          if (res.data.meta === "登陆成功") {
            this.$router.push({ path: "home" });
          }
        } else {
          this.$message({
            message: "用户名或者密码输入不正确，请重新输入！",
            type: "warning"
          });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scope>
.login {
  height: 100%;
  width: 100%;
  position: relative;
  background-color: #324152;
  .loginbox {
    padding: 30px 25px 20px;
    background-color: #fff;
    width: 600px;
    position: absolute;
    height: 400px;
    left: 50%;
    top: 50%;
    border-radius: 10px;
    transform: translateX(-50%) translateY(-50%);

    p {
      font-size: 20px;
      font-family: "微软雅黑";
      font-weight: 600;
    }
    .buttonLogin {
      width: 100%;
    }
  }
}
</style>
