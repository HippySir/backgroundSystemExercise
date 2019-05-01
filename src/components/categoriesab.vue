<template>
  <div class="user_container">
    <!-- 面包屑导航 -->
    <my-bread sectitle="商品管理" thirdtitle="商品分类"></my-bread>
    <!-- 搜索框 -->
    <el-col :span="12">
      <el-button type="success" plain>添加分类</el-button>
    </el-col>
    <!-- 用户列表 -->
    <el-table :data="cateList" row-key="cat_id" border style="width: 100%">
      <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="level" align="left" label="级别" width="180"></el-table-column>
      <el-table-column prop ='cat_deleted'  align="left" label="是否有效"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="primary"
            @click="handleEdit(scope.$index,scope.row)"
            plain
          ></el-button>
          <el-button
            size="mini"
            @click="deleteUser(scope.row)"
            icon="el-icon-delete"
            type="danger"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="1"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateList: [{}, {}],
    };
  },
  methods: {
    // 分类搜索
    async search() {
      let res = await this.$axios.get("categories", {
        params: {
          type: 3
        }
      });

      console.log(res);
      this.cateList = res.data.data;
    },
    // 用户状态的改变
    statechange(row) {
      this.$axios.put(`users/${row.id}/state/${row.mg_state}`);
    },
    //新增用户

    // 用户编辑
    async handleEdit(index, row) {
      // 根据传递过来的数据中的id再次查询数据
      let res = await this.$axios.get(`users/${row.id}`);
      // 将查询过来的数据给editeForm
      this.editeForm = res.data.data;
      // 弹出弹框
      if (res.data.meta.status === 200) {
        this.editeFormVisible = true;
      }
    },

    // 弹出用户角色分配编辑框
    async showRole(row) {
      // 将当前用户的信息保存到rolename字段中
      this.roleUser = row;
      console.log(row);
      this.roleFormVisible = true;
      // 查询所有的角色
      let res = await this.$axios.get("roles");
      this.roleList = res.data.data;
      console.log(res);
    }
  },
  created() {
    // 打开页面渲染数据
    this.search();
  }
};
</script>

<style lang="less">
.user_container {
  background-color: #e9eef3;
}
</style>
