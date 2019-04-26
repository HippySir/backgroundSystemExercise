<template>
  <div id="roleList">
    <div class="topa">
      <breadcrums :itema="'权限列表'" :itemb="'角色列表'"></breadcrums>
    </div>
    <div class="addbutton">
      <el-button>添加角色</el-button>
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
  </div>
</template>

   

<script>
export default {
  data() {
    return {
      roleData: []
    };
  },
  async created() {
    // 初始化页面的数据
    let res = await this.$axios.get("roles");
    console.log(res);
    this.roleData = res.data.data;
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
