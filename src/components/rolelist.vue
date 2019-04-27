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
            <el-row v-for="(item,index) in scope.row.children" :key="index">
              <el-col :span="4">
                <el-tag class="numsa" :disable-transitions='true' @close="handleClose(scope.row.children,item,scope.row)" type="warning" closable>{{item.authName}}</el-tag>
              </el-col>
              <el-col :span="20">
                <el-row v-for="(itema,indexa) in item.children" :key="indexa">
                  <el-col :span="6">
                    <el-tag class="numsa" type="info" :disable-transitions='true' @close="handleClose(item.children,itema,scope.row)" closable>{{itema.authName}}</el-tag>
                  </el-col>
                  <el-col :span="18">
                         <el-tag class="numsa" type="success" :disable-transitions='true' closable  @close="handleClose(itema.children,itemc,scope.row)" v-for="(itemc,indexc) in itema.children" :key="indexc">{{itemc.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
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
            <el-button
              type="success"
              icon="el-icon-check"
              size="mini"
              @click="rightDistribution(scope.row)"
            ></el-button>
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
    <!-- 权限编辑的弹出框 -->
    <el-dialog title="权限分配" :visible.sync="rightsVisible">
      <el-tree
        ref="tree"
        :data="rithtData"
        show-checkbox
        node-key="id"
        :default-checked-keys="selectedRight"
        :props="defaultProps"
        default-expand-all
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rightsVisible = false">取 消</el-button>
        <el-button type="primary" @click="rightEdit">确 定</el-button>
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
      // 删除有关的数据
      deleteVisible: false,
      // 编辑角色权限的有关数据
      rithtData: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      rightsVisible: false,
      selectedRight: []
    };
  },
  created() {
    // 初始化页面的数据
    this.getMessage();
  },
  methods: {
   async handleClose (res,rea,red) {
     console.log(red);
      res.splice(res.indexOf(rea), 1);
     let reb = await this.$axios.delete(`roles/${red.id}/rights/${rea.id}`);
     console.log(reb);
     
    },
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
      this.deleteVisible = false;
    },
    async suretoDelete() {
      let res = await this.$axios.delete(`roles/${this.addForm.id}`);
      this.deleteVisible = false;
      this.getMessage();
      console.log(res);
    },
    isDelete(res) {
      this.deleteVisible = true;
      this.addForm.id = res.id;
    },

    // 权限分配的有关函数
    async rightDistribution(res) {
      console.log(res);
      this.selectedRight = [];
      this.addForm.id = res.id;
      this.rightsVisible = true;
      let resa = await this.$axios.get(`rights/tree`);
      console.log(resa);
      this.rithtData = resa.data.data;
      this.detalWith(res);
      console.log(this.selectedRight);
    },
    async rightEdit() {
      //  console.log(this.selectedRight);
      console.log(this.$refs.tree.getCheckedKeys());
      var str = this.$refs.tree.getCheckedKeys().join(",");
      console.log(str);
      let resb = await this.$axios.post(`roles/${this.addForm.id}/rights`, {
        rids: str
      });
      if (resb.data.meta.msg === "更新成功") {
        // console.log('你好吗！');
        this.getMessage();
      }
      // console.log(resb);
      this.rightsVisible = false;
    },
    // 设置递归函数用来处理每个角色的权限
    detalWith(res) {
      if (res.children) {
        res.children.forEach(v => {
          if (v.children) {
            this.detalWith(v);
          } else {
            this.selectedRight.push(v.id);
          }
        });
      }
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

  .numsa {
    margin: 10px;
  }
}
</style>
