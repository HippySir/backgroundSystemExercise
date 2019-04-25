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
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="success" plain>添加用户</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="userdata.users" style="width: 100%" border>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="username" label="姓名" width="200"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
          <el-table-column prop="mobile" label="电话" width="200"></el-table-column>
          <el-table-column label="创建时间" width="200">
              <template slot-scope="scope">
                  {{scope.row.create_time | timeDisposal}}
            </template>
          </el-table-column>
          <el-table-column label="用户状态"  width="100">
            <template slot-scope="scope">
              <el-switch
                active-color="#13ce66"
                inactive-color="#ff4949"
                v-model="scope.row.mg_state"
                @change="userState(scope.row.mg_state,scope.row.id)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
              <el-button type="success" icon="el-icon-check" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <!-- 底部 -->
      <el-footer class="userfooter">
        <!-- 分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userdata.total"
        ></el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userdata: {},
      pagenum: 1,
      pagesize: 5
    };
  },
  methods: {
    handleEdit() {},
    handleDelete() {},

    // 分页器相关函数
    handleSizeChange(val) {
      this.pagesize = val;
      this.getUserData(this.pagenum, val);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getUserData();
    },

    // 用户获取请求数据的函数
    async getUserData() {
      let userdata = await this.$axios.get("users", {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      });
      console.log(userdata);
      this.userdata = userdata.data.data;
    },

    // 用户状态改变的函数
    async userState(res, reas) {
      console.log(res);
      let rea = await this.$axios.put(`users/${reas}/state/${res}`);
      console.log(rea);
    }
  },
  created() {
    this.getUserData();
  }
};
</script>

<style lang="less" scope>
.userBox {
  .userbigbox {
    padding: 0;
    .userheader {
      background-color: #d3dce6;
      display: flex;
      align-items: center;
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
