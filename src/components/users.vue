<template>
  <div class="userBox">
    <el-container class="userbigbox">
      <!-- 头部 -->
      <el-header class="userheader">
        <breadcrums :itema="'用户管理'" :itemb="'用户管理'"></breadcrums>
      </el-header>
      <!-- 中间主体 -->
      <el-main class="usermain">
        <!-- 搜索框 -->
        <div class="searchbox">
          <el-input placeholder="请输入内容"  class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="success" plain>添加用户</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column label="操作">
            <template >
              <el-switch  active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button type="primary" icon="el-icon-edit"></el-button>
              <el-button type="danger" icon="el-icon-delete"></el-button>
              <el-button type="success" icon="el-icon-check"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <!-- 底部 -->
      <el-footer class="userfooter">Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [1,1,1,1,1]
    };
  },
  methods: {
    handleEdit() {},
    handleDelete() {}
  }
};
</script>

<style lang="less" scope>
.userBox {
  .userbigbox {
    padding: 0;
    .userheader {
      background-color: #d3dce6;
    }
    .usermain {
      padding: 0;
      .searchbox {
        .input-with-select {
          width: 500px;
          margin-right: 5px;
        }
      }
    }
    .userfooter {
    }
  }
}
</style>
