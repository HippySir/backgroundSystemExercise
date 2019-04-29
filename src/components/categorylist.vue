<template>
  <div class="goodscategory">
    <div class="breadbar">
      <breadcrums :itema="'商品管理'" :itemb="'分类参数'"></breadcrums>
    </div>
    <el-alert title="注意：只允许为第三级分类设置相关参数" type="warning" show-icon class="remindLabel"></el-alert>
    <!-- 级联菜单 -->
    <span class="selectCategory">前选择商品的分类：</span>
    <el-cascader :options="options" v-model="selectedOptions" @change="handleChange" :props="props"></el-cascader>
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-button type="primary" class="addButton" :disabled="changeover">{{changeWord}}</el-button>
        <el-tab-pane label="静态参数" name="first">
          <el-table :data="staticAttribute" style="width: 100%" border>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="属性值" prop="attr_vals"></el-table-column>
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
          <el-table :data="dynamicAttribute" style="width: 100%" border @expand-change="expenda">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-tag
                  :key="index"
                  v-for="(item,index) in props.row.params"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(item,props.row)"
                >{{item}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="props.row.inputVisible"
                  v-model="props.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(props.row)"
               
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(props.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column label="商品参数" prop="attr_name"></el-table-column>
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
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      activeName: "first",
      changeover: true,
      changeWord: "添加静态参数",
      changeCondition: "only",
      // 下部表格的相关的数据
      roleData: [],
      goodsId: 0,
      // 静态参数的数据
      staticAttribute: [],
      // 动态属性参数
      dynamicAttribute: []
      // 动态参数里面标签里的相关的属性的数据
      //  inputVisible: false,
    };
  },
  methods: {
    // 动态参数里面标签里的相关的属性的相关的函数
    async handleClose(res, rea) {
      console.log(rea);
      console.log(res);
      rea.params.splice(rea.params.indexOf(res), 1);
      let postData = {};
      postData.attr_name = rea.attr_name;
      postData.attr_sel = rea.attr_sel;
      postData.attr_vals = rea.params.join(",");
      rea.attr_vals = postData.attr_vals;
      const resb = await this.$axios.put(
        `categories/${rea.cat_id}/attributes/${rea.attr_id}`,
        postData
      );
      console.log(resb);
    },
    // 新增某个属性参数的函数
    showInput(res) {
      console.log(res);
      res.inputVisible = true;
    },
    // 新增相关参数的函数
   async handleInputConfirm(rea) {
      console.log(rea.inputValue);
      rea.params.push(rea.inputValue);
      let postData = {};
      postData.attr_name = rea.attr_name;
      postData.attr_sel = rea.attr_sel;
      postData.attr_vals = rea.params.join(",");
      rea.attr_vals = postData.attr_vals;
       const resb = await this.$axios.put(
        `categories/${rea.cat_id}/attributes/${rea.attr_id}`,
        postData
      );
      console.log(resb);
       rea.inputVisible = false;
    },
    // 将某一行展开或者关闭的函数
    expenda(res, rea) {
      let tagData = res.attr_vals.split(",");
      this.$set(
        this.dynamicAttribute[this.dynamicAttribute.indexOf(res)],
        "params",
        tagData
      );
      this.$set(
        this.dynamicAttribute[this.dynamicAttribute.indexOf(res)],
        "inputVisible",
        false
      );
      this.$set(
        this.dynamicAttribute[this.dynamicAttribute.indexOf(res)],
        "inputValue",
        ""
      );
    },
    // 将获取商品参数的代码封装成为函数
    async getData() {
      let resa = await this.$axios.get(
        `categories/${this.goodsId}/attributes`,
        {
          params: {
            sel: this.changeCondition
          }
        }
      );

      return resa.data.data;
    },
    // tab栏点击时的函数
    async handleClick(tab, event) {
      // console.log(tab, event);
      if (tab.label === "动态参数") {
        this.changeWord = "添加动态参数";
        this.changeCondition = "many";
        this.dynamicAttribute = await this.getData();
        console.log(this.dynamicAttribute);
      } else {
        this.changeWord = "添加静态参数";
        this.changeCondition = "only";
        this.staticAttribute = await this.getData();
        console.log(this.staticAttribute);
      }
    },
    // 级联菜单的相关函数
    async handleChange(res) {
      this.changeover = false;
      this.goodsId = res[res.length - 1];
      if (this.changeWord === "添加静态参数") {
        this.staticAttribute = await this.getData();
        console.log(this.staticAttribute);
      } else {
        this.dynamicAttribute = await this.getData();
        console.log(this.dynamicAttribute, "123");
      }
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
  .addButton {
    margin-bottom: 15px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
