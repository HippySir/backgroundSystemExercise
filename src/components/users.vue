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
          <el-input placeholder="请输入内容" class="input-with-select" v-model="inputContent">
            <el-button slot="append" icon="el-icon-search" @click="searchUsers"></el-button>
          </el-input>
          <el-button type="success" plain @click="addDialog = true">添加用户</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="userdata.users" style="width: 100%" border>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="username" label="姓名" width="200"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
          <el-table-column prop="mobile" label="电话" width="200"></el-table-column>
          <el-table-column label="创建时间" width="200">
            <template slot-scope="scope">{{scope.row.create_time | timeDisposal}}</template>
          </el-table-column>
          <el-table-column label="用户状态" width="100">
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
    <!-- 添加用户的弹框 -->
    <el-dialog title="添加用户" :visible.sync="addDialog">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="addForm.mailbox" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="addForm.telephone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUsers('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputContent: "",
      userdata: {},
      pagenum: 1,
      pagesize: 5,
      addDialog: false, //新增用户的显示框的按钮
      addForm: {
        username: "",
        password: "",
        mailbox: "",
        telephone: ""
      },
      addRules: {
        //新增用户的验证规则
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ]
      }
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
          pagesize: this.pagesize,
          query: this.inputContent
        }
      });
      console.log(userdata);
      this.userdata = userdata.data.data;
      if (userdata.data.data.total === 0) {
        this.$message({
          message: "没有相关的用户！",
          type: "warning"
        });
      }
    },

    // 用户状态改变的函数
    async userState(res, reas) {
      console.log(res);
      let rea = await this.$axios.put(`users/${reas}/state/${res}`);
      console.log(rea);
    },

    // 搜索用户的函数
    searchUsers() {
      if (this.query != "") {
        this.getUserData();
      }
    },

    // 添加用户的相关函数
    addUsers(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.$axios.post("users", {
            username: this.addForm.username,
            password: this.addForm.password,
            email: this.addForm.mailbox,
            mobile: this.addForm.telephone
          });
          this.addDialog = false;
          this.$message({
            message: res.data.meta.msg,
            type: "warning"
          });
          // 如果创建成功就刷新页面
          if (res.data.meta.msg === "创建成功") {
            this.getUserData();
          }
          console.log(res);
        } else {
          this.$message({
            message: "请安要求正确输入相关信息！",
            type: "warning"
          });
        }
      });
    }
  },

  created() {
    console.log(123456);
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
