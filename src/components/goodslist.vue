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
          <el-button type="success" plain @click="addGoodsa">添加商品</el-button>
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
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="goodsTotal"
        ></el-pagination>
      </el-footer>
    </el-container>
    <!-- 删除用户的弹出框 -->
    <el-dialog title="提示" :visible.sync="deleteGoodsa" width="30%">
      <span class="el-icon-warning">是否删除该商品?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteGoodsa = false">取 消</el-button>
        <el-button type="primary" @click="deleteGoodss">确 定</el-button>
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
      deleteGoodsa: false,
      // 商品列表的相关数据
      goodsdata: [],
    //   查询商品的相关数据
       pagenum: 1,
       pagesize: 10,
    //存储相关商品的信息
      goodsaData: {}, 
    // 分页器的相关的数据
      goodsTotal: 0,

    };
  },
  created() {
      this.getGoods();
  },
  methods: {
    //   增加商品的函数
    addGoodsa () {
        this.$router.push('addGoods');
    },
    //   查询商品的函数
    async getGoods() {
      let res = await this.$axios.get("goods", {
        params: {
          query: this.inputContent,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        }
      });
      this.goodsdata = res.data.data.goods;
      console.log(res);
      this.goodsTotal = res.data.data.total;
    },
    // 搜索商品的函数
    searchUsers() {
        if(this.inputContent == ''){
             this.$message('搜索的内容不能够为空呀亲！');
        }else{
             this.getGoods();
        }
    },
    // 编辑商品的函数
    editGooda() {},
    // 删除商品的函数
    deleteGoodb(res) {
        this.deleteGoodsa = true;
        this.goodsaData = res;
        console.log(res);
      
    },
    async deleteGoodss () {
        let res = await this.$axios.delete(`goods/${this.goodsaData.goods_id}`);
        this.deleteGoodsa = false;
        if (res.data.meta.msg === '删除成功') {
            this.getGoods();
        }
    },
    // 分页器的相关的函数
    handleSizeChange(res) {
        this.pagesize = res;
        this. getGoods() ;

    },
    handleCurrentChange(res) {
       this.pagenum = res;
       this. getGoods() ;
    },
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
