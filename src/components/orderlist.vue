<template>
  <div class="orderlist">
    <!-- 顶部导航栏 -->
    <div class="orderListd">
      <breadcrums :itema="'订单管理'" :itemb="'订单列表'"></breadcrums>
    </div>
    <!--中间表格 -->
    <template>
      <el-table :data="orderData" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="180"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">未付款</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"></el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">{{scope.row.create_time | timeDisposal}}</template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="editOder(scope.row)"
              :size="'small'"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 下部分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[0, 5, 10, 15]"
      :page-size="pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalData"
    ></el-pagination>
    <!-- 编辑元素的弹出框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="editForm">
          <vdistpicker></vdistpicker>
        <el-form-item label="活动区域" label-width="120">
          <el-cascader :options="options" v-model="selectedOptions" @change="handleChange" :props="props"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址:" label-width="120">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="suerData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入省市联动de插件
import Distpicker from 'v-distpicker'

export default {
  data() {
    return {
      // 表格中的相关的数据
      orderData: [],
      //分页器相关的函数
      currentPage: 1,
      pagenum: 5,
      totalData: 0,
    //编辑弹出框的相关的数据
      dialogFormVisible: false,
      editForm: {},
      selectedOptions: [],
      options: [],
      props: {
        
      },
    };
  },
  components: {
      vdistpicker: Distpicker
  },
  methods: {
    // 编辑的订单的相关的函数
    editOder(res) {
      this.dialogFormVisible = true;
    },
    // 分页器的相关的函数
    handleSizeChange(res) {
      console.log(res);
      this.pagenum = res;
      this.getOrderData();
    },
    handleCurrentChange(res) {
      console.log(res);
      this.currentPage = res;
      this.getOrderData();
    },
    // 将获取订单数据的代码封装成为一个函数
    async getOrderData() {
      let res = await this.$axios.get(`orders`, {
        params: {
          pagenum: this.currentPage,
          pagesize: this.pagenum
        }
      });
      console.log(res);
      this.orderData = res.data.data.goods;
      this.totalData = res.data.data.total;
    },
    suerData() {
      this.dialogFormVisible = false;
    },
    // 编辑弹出框的函数
    handleChange (res) {

    }
  },
  created() {
    this.getOrderData();
  }
};
</script>

<style lang="less">
    .orderlist {
        .orderListd {
            height: 60px;
            display: flex;
            align-items: center;
            background-color: #d3dce6;
            padding-left: 15px;
        }
    }
</style>
