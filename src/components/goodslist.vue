<template>
  <div class="goodsList">
    <el-container class="goodsbigbox">
      <!-- 头部 -->
      <el-header class="goodsheader">
        <breadcrums :itema="'商品管理'" :itemb="'商品列表'"></breadcrums>
      </el-header>
      <!-- 中间主体 -->
      <el-main class="goodsmain">
        <!-- 搜索框 -->
        <div class="searchbox">
          <el-input placeholder="请输入内容" class="input-with-select" v-model="inputContent">
            <el-button slot="append" icon="el-icon-search" @click="searchUsers"></el-button>
          </el-input>
          <el-button type="success" plain>添加商品</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="goodsdata" style="width: 100%" border>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="goods_name" label="商品名称" width="400"></el-table-column>
          <el-table-column prop="goods_price" label="商品价格（元）" width="150"></el-table-column>
          <el-table-column prop="goods_weight" label="商品重量" width="150"></el-table-column>
          <el-table-column label="创建时间" width="200">
            <template slot-scope="scope">{{scope.row.upd_time | timeDisposal}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editGooda(scope.row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteGoodb(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <!-- 底部 -->
      <el-footer class="userfooter">
        <!-- 分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="1"
        ></el-pagination>
      </el-footer>
    </el-container>
    <!-- 删除用户的弹出框 -->
    <el-dialog title="提示" :visible.sync="deleteUser" width="30%">
      <span class="el-icon-warning">是否删除该用户?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteUser = false">取 消</el-button>
        <el-button type="primary" @click="deleteUsers">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索框的相关数据
      inputContent: "",
      // 删除框的相关数据
      deleteUser: false,
      // 商品列表的相关数据
      goodsdata: []
    };
  },
  async created() {
    let res = await this.$axios.get("goods", {
      params: {
        query: "",
        pagenum: 1,
        pagesize: 10
      }
    });
    this.goodsdata = res.data.data.goods;
    console.log(res);
  },
  methods: {
    // 搜索商品的函数
    searchUsers() {},
    // 编辑商品的函数
    editGooda() {},
    // 删除商品的函数
    deleteGoodb() {},
    // 分页器的相关的函数
    handleSizeChange() {},
    handleCurrentChange() {},
    // 删除框的相关函数
    deleteUsers() {}
  }
};
</script>

<style lang = "less">
.goodsList {
  .goodsbigbox {
    padding: 0;
    .goodsheader {
      background-color: #d3dce6;
      display: flex;
      align-items: center;
    }
    .goodsmain {
      padding: 0;
      .searchbox {
        .input-with-select {
          width: 500px;
          margin-right: 5px;
        }
      }
    }
    .userfooter {
    }
  }
}
</style>
