<template>
  <div id="roleList">
    <div class="topa">
      <breadcrums :itema="'权限列表'" :itemb="'角色列表'"></breadcrums>
    </div>
    <div class="addbutton">
      <el-button @click="addDialog = true">添加角色</el-button>
    </div>
    <template>
      <el-table :data="roleData" style="width: 100%" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-tag key="你好呀" type="success">{{你好呀}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-button type="success" icon="el-icon-check" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 添加角色的弹框 -->
    <el-dialog title="添加角色" :visible.sync="addDialog">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="角色名称" label-width="120px" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px" prop="describe">
          <el-input v-model="addForm.describe"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addRole('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

   

<script>
export default {
  data() {
    return {
      roleData: [],
      // 增加角色的相关的数据
      addDialog: false,
      addForm: {
        username: "",
        describe: ""
      },
      addRules: {
        username: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "blur" }
        ],
        describe: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    // 初始化页面的数据
    this.getMessage();
  },
  methods: {
    // 获取角色的信息的函数
    async getMessage() {
      let res = await this.$axios.get("roles");
      console.log(res);
      this.roleData = res.data.data;
    },

    // 增加角色的函数
    addRole(res) {
      this.$refs[res].validate(async valid => {
        if (valid) {
          let res = await this.$axios.post("roles", {
            roleName: this.addForm.username,
            roleDesc: this.addForm.describe
          });
          if (res.data.meta.msg === "创建成功") {
            this.getMessage();
            this.$message({
              message: "角色创建成功！",
              type: "success"
            });
          } else {
            this.$message({
              message: "角色创建失败！",
              type: "warning"
            });
          }
          console.log(res);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
#roleList {
  .topa {
    height: 60px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: #d3dce6;
    padding-left: 20px;
  }
  .addbutton {
  }
}
</style>
