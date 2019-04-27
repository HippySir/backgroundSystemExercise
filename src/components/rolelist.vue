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
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editRolesa(scope.row)"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="isDelete(scope.row)"></el-button>
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
    <!-- 编辑角色的弹窗 -->
    <el-dialog title="编辑角色" :visible.sync="editDialog">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="角色名称" label-width="120px" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px" prop="describe">
          <el-input v-model="addForm.describe"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editRole('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除的弹出框 -->
    <el-dialog title="提示" :visible.sync="deleteVisible" width="30%">
      <span class="el-icon-warning">确认删除该角色吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="canleDelete">取 消</el-button>
        <el-button type="primary" @click="suretoDelete">确 定</el-button>
      </span>
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
      },
      //编辑角色的相关数据
      editDialog: false,
      // 删除有关的函数
      deleteVisible: false
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
    },

    // 编辑角色的函数
    editRole(res) {
      this.$refs[res].validate(async valid => {
        if (valid) {
          let res = await this.$axios.put(`roles/${this.addForm.id}`, {
            roleName: this.addForm.username,
            roleDesc: this.addForm.describe
          });
          this.getMessage();
          console.log(res);
        } else {
          console.log("请按照要求填写数据！");
          return false;
        }
      });
      this.editDialog = false;
    },
    editRolesa(res) {
      console.log(res);
      this.editDialog = true;
      this.addForm.username = res.roleName;
      this.addForm.describe = res.roleDesc;
      this.addForm.id = res.id;
    },

    // 删除的有关的函数
    canleDelete() {
      this.$message({
        showClose: true,
        message: "已取消删除！"
      });
    },
   async suretoDelete() {
    let res = await this.$axios.delete(`roles/${ this.addForm.id}`);
    this.deleteVisible = false;
    this.getMessage();
    console.log(res);
    },
    isDelete(res) {
      this.deleteVisible = true;
      this.addForm.id = res.id;
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
