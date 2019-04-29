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
        <el-button
          type="primary"
          class="addButton"
          :disabled="changeover"
          @click="addParameter()"
        >{{changeWord}}</el-button>
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
                  @click="editStaticRolesa(scope.row)"
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
    <!-- 静态参数的添加弹出框 -->
    <el-dialog :title="staticTitle" :visible.sync="dialogStatic">
      <el-form :model="staticForm" :rules="staticRules" ref="staticForm">
        <el-form-item label="静态参数" label-width="120px" prop="staticParameter">
          <el-input v-model="staticForm.staticParameter" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="静态参数值" label-width="120px" prop="staticValues">
          <el-input v-model="staticForm.staticValues" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogStatic = false">取 消</el-button>
        <el-button type="primary" @click="sureStatic">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 动态参数的添加的弹出框 -->
    <el-dialog :title="dayncTitle" :visible.sync="dialogDynamic">
      <el-form :model="dynamicForm" :rules="dynamicRules" ref="dynamicForm">
        <el-form-item label="动态参数" label-width="120px" prop="dynamicParameter">
          <el-input v-model="dynamicForm.dynamicParameter" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDynamic = false">取 消</el-button>
        <el-button type="primary" @click="sureDynamic">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除餐数据的弹出框 -->
    <el-dialog title="提示" :visible.sync="isDeleteParams" width="30%" >
      <span class="el-icon-warning">确认删除该参数码？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDeleteParams = false">取 消</el-button>
        <el-button type="primary" @click="deleteParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDeleteParams: false,
      // 动态参数的弹出框
      staticTitle: "添加静态参数",
      dayncTitle: "添加动态参数",
      options: [],
      selectedOptions: [],
      catIdArr: [],
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
      dynamicAttribute: [],
      // 动态参数里面标签里的相关的属性的数据
      //  inputVisible: false,
      // 添加静态参数的弹出框
      dialogStatic: false,
      staticForm: {
        staticParameter: "",
        staticValues: ""
      },
      staticRules: {
        staticParameter: [
          { required: true, message: "请输入静态参数", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "change"
          }
        ],
        staticValues: [
          { required: true, message: "请输入静态参数值", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "change"
          }
        ]
      },
      // 添加动态参数的弹出框的相关数据
      dialogDynamic: false,
      dynamicForm: {
        dynamicParameter: ""
      },
      dynamicRules: {
        dynamicParameter: [
          { required: true, message: "请输入静态参数", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "change"
          }
        ]
      },
      pararmsData: {},
    };
  },
  methods: {
   async deleteParams () {
      console.log(this.pararmsData);
     let res = await this.$axios.delete(`categories/${this.pararmsData.cat_id}/attributes/${this.pararmsData.attr_id}`);
     console.log(res);
    
      if (this.changeWord === "添加动态参数") {
        this.changeCondition = "many";
        this.dynamicAttribute = await this.getData();
        console.log(this.dynamicAttribute);
      } else {
        this.changeCondition = "only";
        this.staticAttribute = await this.getData();
        console.log(this.staticAttribute);
      }
       this.isDeleteParams = false;

    },
    // 静态参数里面的编辑和删除函数
    editStaticRolesa(res) {
      this.staticTitle = "编辑静态参数";
      this.dialogStatic = true;
      this.staticForm.staticParameter = res.attr_name;
      this.staticForm.staticValues = res.attr_vals;
      console.log(res);
    },
    isStaticDelete(res) {
      this.pararmsData = res;
    },

    // 动态参数下的编辑和删除函数
    editRolesa(res) {
      this.dayncTitle = "编辑动态参数";
      this.dialogDynamic = true;
      this.dynamicForm.dynamicParameter = res.attr_name;
      console.log(res);
    },
    isDelete(res) {
      this.pararmsData = res;
       this.isDeleteParams = true;
    },

    // 添加静态参数的有关函数
    async sureStatic() {
      this.dialogStatic = false;
      let res = await this.$axios.post(
        `categories/${this.catIdArr[this.catIdArr.length - 1]}/attributes`,
        {
          attr_name: this.staticForm.staticParameter,
          attr_sel: "many",
          attr_vals: this.staticForm.staticValues
        }
      );
      console.log(res);
    },
    // 添加动态参数的有关函数
    async sureDynamic() {
      this.dialogDynamic = false;
      let res = await this.$axios.post(
        `categories/${this.catIdArr[this.catIdArr.length - 1]}/attributes`,
        {
          attr_name: this.dynamicForm.dynamicParameter,
          attr_sel: "only"
        }
      );
      console.log(res);
    },
    // 添加参数的函数
    async addParameter() {
      if (this.changeWord === "添加静态参数") {
        console.log(this.catIdArr);
        this.dialogStatic = true;
        this.staticTitle = "添加静态参数";
      } else {
        this.dialogDynamic = true;
        console.log(this.catIdArr);
        this.dayncTitle = "添加动态参数";
      }
    },
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
      this.catIdArr = res;
      this.changeover = false;
      this.goodsId = res[res.length - 1];
      if (this.changeWord === "添加静态参数") {
        this.staticAttribute = await this.getData();
        console.log(this.staticAttribute);
      } else {
        this.dynamicAttribute = await this.getData();
        console.log(this.dynamicAttribute, "123");
      }
    }
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
