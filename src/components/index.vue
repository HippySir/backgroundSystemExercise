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
            <el-menu default-active="users" class="el-menu-vertical-demo" router>
              <el-submenu :index="index + ''" v-for="(item,index) in listPermission" :key="index">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{item.authName}}</span>
                </template>
                <el-menu-item-group v-for="(itema,indexa) in item.children" :key="indexa">
                  <el-menu-item :index="itema.path" class="el-icon-menu">{{itema.authName}}</el-menu-item>
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
    return {
      listPermission: [],
    }
  },
  methods: {
    // 退出功能的函数
    dropout(){
      sessionStorage.removeItem('token')
      this.$router.push('login');
       this.$message({
          message: '退出登陆成功！',
          type: 'success'
        });
    }
  },
 async created() {
    // 发送请求获取权限列表数据来渲染左侧菜单
    let res = await this.$axios.get('menus');
    this.listPermission = res.data.data;
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
        height: 100%;
        overflow: auto;
        background-color: red;
        padding: 0;
      }
      .main {
        height: 100%;
        overflow: auto;
        padding: 0 20px;
        background-color: #e9eef3;
      }
    }
  }
}
</style>
