<template>
  <div class="addGoods">
    <!-- 顶部面包屑导航 -->
    <div class="breadTap">
      <breadcrums :itema="'商品管理'" :itemb="'商品列表'"></breadcrums>
    </div>
    <!-- 提示框 -->
    <el-alert title="添加商品信息" type="info" center show-icon class="infoReminder"></el-alert>
    <!-- 上部的步骤条 -->
    <el-steps :active="active" finish-status="success" class="proessBar" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 下部切换栏 -->
    <template class="goodsBigbox">
      <el-tabs tab-position="left" @tab-click="switcher" v-model="activeName">
        <!-- 商品基本信息的盒子 -->
        <el-tab-pane label="基本信息" name="first">
          <el-form :model="goodsData" :rules="goodsRules" ref="goodsData" class="demo-ruleForm">
            <el-form-item label="商品名称" prop="goodsName">
              <el-input v-model="goodsData.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goodsPrice">
              <el-input v-model="goodsData.goodsPrice"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goodsWeight">
              <el-input v-model="goodsData.goodsWeight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goodsNum">
              <el-input v-model="goodsData.goodsNum"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goodsNum">
              <el-cascader
                :options="categoryData"
                v-model="selectedOptions"
                @change="handleChange"
                :props="props"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 商品参数 -->
        <el-tab-pane label="商品参数" name="second"></el-tab-pane>
        <!-- 商品属性 -->
        <el-tab-pane label="商品属性" name="third">角色管理</el-tab-pane>
        <!-- 商品图片 -->
        <el-tab-pane label="商品图片" name="fourth">
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1:8888/api/private/v1/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <!-- 商品内容 -->
        <el-tab-pane label="商品内容" name="five">
          <quill-editor
            ref="myTextEditor"
            v-model="content"
            :config="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
          ></quill-editor>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      //   商品基本信息的相关数据
      goodsData: {
        goodsName: 0,
        goodsPrice: 0,
        goodsWeight: 0,
        goodsNum: 0
      },
      activeName: "first",
      goodsRules: {
        goodsName: [
          { required: true, message: "商品名称", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        goodsPrice: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        goodsWeight: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        goodsNum: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ]
      },
      selectedOptions: [],
      props: {
        label: "cat_name",
        children: "children",
        value: "cat_id"
      },
      categoryData: [],
      //   上传图片的时候的相关的数据
      fileList: [],
      //   富文本域的相关数据
      content: "<h2>I am Example</h2>",
      editorOption: {
        // something config
      }
    };
  },
  methods: {
    //   富文本域的相关的方法
    onEditorBlur(editor) {
      console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },

    //   上传图片的相关的回调函数
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    //   级联菜单的相关事件
    handleChange() {},
    // tab切换的时候触发的函数
   async switcher(tab, event) {
      this.active = parseInt(tab.index);
      if (this.active > 4) this.active = 0;
      console.log(tab, event);
      console.log(123);
      if(parseInt(parseInt(tab.index))===1){
        let res = await this.$axios.get(`categories/${6}/attributes`,{
            params:{
                sel:['only']
            }
        })
        console.log(res);
      }
    }
  },
  async created() {
    let res = await this.$axios.get("categories", {
      params: {
        type: [1, 2, 3]
      }
    });
    this.categoryData = res.data.data;
    console.log(res);
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
  },
  mounted() {
    // you can use current editor object to do something(editor methods)
    console.log("this is my editor", this.editor);
    // this.editor to do something...
  }
};
</script>
   
<style lang="less">
.addGoods {
  .breadTap {
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #d3dce6;
    padding-left: 15px;
  }
  .infoReminder {
    margin: 15px 0px;
  }
  .proessBar {
    margin-bottom: 15px;
  }
  .goodsBigbox {
  }
}
</style>
