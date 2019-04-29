<template>
  <div class="goodscategory">
    <div class="breadbar">
      <breadcrums :itema="'商品管理'" :itemb="'分类参数'"></breadcrums>
    </div>
    <el-alert title="注意：只允许为第三级分类设置相关参数" type="warning" show-icon class="remindLabel"></el-alert>
    <!-- 级联菜单 -->
    <span class="selectCategory">前选择商品的分类：</span>
    <el-cascader :options="options" v-model="selectedOptions" @change="handleChange"  :props="props"></el-cascader>
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick" >
         <el-button type="primary" class="addButton"  :disabled="changeover">{{changeWord}}</el-button>
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
      selectedOptions: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
      },
      activeName: 'first',
      changeover: true,
      changeWord: '静态属性',
      changeCondition: 'only',
      // 下部表格的相关的数据
      roleData: [],
      goodsId: 0,
    };
  },
  methods: {
    // 将获取商品参数的代码封装成为函数
    async getData () {
       let resa = await this.$axios.get(`categories/${this.goodsId}/attributes`,{
        params: {
          sel:  this.changeCondition,
        }
      });
      console.log(resa);
    },
    // tab栏点击时的函数
    handleClick (tab,event) {
      console.log(tab,event);
      if(tab.label === '动态参数'){
          this.changeWord = '添加动态参数';
          this.changeCondition = 'many';
           this.getData (); 
      }else{
          this.changeWord = '添加静态参数';
          this.changeCondition = 'only';
           this.getData (); 
      }
    },
    // 级联菜单的相关函数
   async handleChange(res) {
      this.changeover = false;
      this.goodsId = res[res.length - 1];
      this.getData (); 
     
    },
    // 编辑的相关函数
    editRolesa() {},
    // 删除的相关函数
    isDelete() {}
  },
  async created() {
    let res = await this.$axios.get(`categories`);
    console.log(res);
    this.options = res.data.data;

  },
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
        .addButton {
          margin-bottom: 15px;
        }
    }
</style>
