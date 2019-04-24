<template>
  <div class="login">
    <div class="loginbox">
      <p>用户登陆</p>
      <el-form label-position="top" :model="formLogin">
        <el-form-item label="用户名">
          <el-input v-model="formLogin.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
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
      
    };
  },
  methods: {
    //   用户点击登陆所触发的函数
   async submitForm(formName) {
       let res = await this.$axios.post('login',{
         username: this.formLogin.userName,
         passWord: this.formLogin.passWord
       });
      console.log(res);
      if(res.data.meta === '登陆成功'){
          this.$router.push({ path: 'home' })
      }
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
