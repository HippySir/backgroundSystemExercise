<template>
  <div class="goodscategory">
    <div class="breadbar">
      <breadcrums :itema="'商品管理'" :itemb="'分类参数'"></breadcrums>
    </div>
    <el-alert title="注意：只允许为第三级分类设置相关参数" type="warning" show-icon class="remindLabel"></el-alert>
    <!-- 级联菜单 -->
    <span class="selectCategory">前选择商品的分类：</span>
    <el-cascader :options="options" v-model="selectedOptions" @change="handleChange"></el-cascader>
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="静态参数" name="first">
          <el-table :data="roleData" style="width: 100%" border>
            <el-table-column type="expand">
              <template slot-scope="props">

              </template>
            </el-table-column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column label="商品参数" prop="roleName"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editRolesa(scope.row)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="isDelete(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="动态参数" name="second">
            <el-table :data="roleData" style="width: 100%" border>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column label="属性名" prop="roleName"></el-table-column>
            <el-table-column label="属性值" prop="roleName"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editRolesa(scope.row)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="isDelete(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [],
      selectedOptions: []
    };
  },
  methods: {
    // 级联菜单的相关函数
    handleChange() {},
    // tab切换栏的相关函数
    handleChange() {},
    // 编辑的相关函数
    editRolesa() {},
    // 删除的相关函数
    isDelete() {}
  }
};
</script>

<style lang="less">
    .goodscategory {
        .breadbar {
            height: 60px;
            display: flex;
            align-items: center;
            background-color: #d3dce6;

        }
        .remindLabel {
            margin: 20px 0;
        }
        .selectCategory {

        }
    }
</style>
