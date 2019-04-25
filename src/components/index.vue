<template>
  <div class="index">
    <el-container class="bigContainer">
      <!-- 头部 -->
      <el-header class="header">
        <el-row>
          <el-col :span="8" class="line">
            <img src="../assets/image/logo.png" alt>
          </el-col>
          <el-col :span="8" class="line">
            <div class="titleWord">电商管理系统</div>
          </el-col>
          <el-col :span="8" class="line">
            <el-button class="quit" @click="dropout">退出</el-button>
          </el-col>
        </el-row>
      </el-header>
      <!-- 下部容器 -->
      <el-container class="container">
        <!-- 左侧 -->
        <el-aside class="aside">
          <el-row class="tac">
            <el-menu default-active="2" class="el-menu-vertical-demo">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-2" class="el-icon-menu">用户列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-2" class="el-icon-menu">角色列表</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="1-2" class="el-icon-menu">权限管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-2" class="el-icon-menu">商品列表</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="1-2" class="el-icon-menu">分类参数</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="1-2" class="el-icon-menu">商品分类</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>订单管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-2" class="el-icon-menu">订单列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据统计</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-2" class="el-icon-menu">数据报表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-row>
        </el-aside>
        <!-- 右侧 -->
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    // 退出功能的函数
    dropout(){
      console.log('ha')
      sessionStorage.removeItem('token')
      this.$router.push('login');
    }
  },
  created() {
    // 在这里验证浏览器有没有token
    if (!sessionStorage.getItem("token")) {
      console.log("123456");
      // this.$router.push('login');
      this.$router.push({path:'/login'});
      this.$message.error('请先登录！');
    }
  }
};
</script>

<style lang="less" scope>
.index {
  height: 100%;
  .bigContainer {
    height: 100%;
    .header {
      background-color: #b3c0d1;
      .line {
        height: 60px;
        line-height: 60px;
      }
      img {
      }
      .titleWord {
        height: 60px;
        text-align: center;
        line-height: 60px;
        color: white;
        font-family: "微软雅黑";
        font-size: 20px;
      }
      .quit {
        margin-top: 10px;
        float: right;
      }
    }
    .container {
      .aside {
        width: "200px";
        background-color: red;
        padding: 0;
      }
      .main {
        padding: 0 20px;
        background-color: #e9eef3;
      }
    }
  }
}
</style>
