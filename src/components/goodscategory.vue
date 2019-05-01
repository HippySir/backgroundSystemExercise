<template>
  <div id="goodsCategory">
    <div class="topa">
      <breadcrums :itema="'商品管理'" :itemb="'商品分类'"></breadcrums>
    </div>
    <div class="addbutton">
      <el-button @click="addGoodsCategory">添加分类</el-button>
    </div>
    <template>
      <el-table :data="goodsData" style="width: 100%" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table :data="scope.row.children" style="width: 100%" :show-header="false">
              <el-table-column type="expand">
                <template slot-scope="scopes" class="numba">
                  <el-table :data="scopes.row.children" style="width: 100%" :show-header="false">
                    <el-table-column prop="cat_name"></el-table-column>
                    <el-table-column prop="level"></el-table-column>
                    <el-table-column prop="isValid"></el-table-column>
                    <el-table-column>
                      <template slot-scope="scope">
                        <!-- 商品分类编辑按钮 -->
                        <el-button
                          type="primary"
                          icon="el-icon-edit"
                          size="mini"
                          @click="editRolesa(scope.row)"
                        ></el-button>
                        <!-- 商品删除按钮 -->
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          size="mini"
                          @click="isDelete(scope.row)"
                        ></el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column prop="cat_name"></el-table-column>
              <el-table-column prop="level"></el-table-column>
              <el-table-column prop="isValid"></el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <!-- 商品分类编辑按钮 -->
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="editRolesa(scope.row)"
                  ></el-button>
                  <!-- 商品删除按钮 -->
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="isDelete(scope.row)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="分类名称" prop="cat_name"></el-table-column>
        <el-table-column label="级别" prop="level"></el-table-column>
        <el-table-column label="是否有效" prop="isValid"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 商品分类编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editRolesa(scope.row)"
            ></el-button>
            <!-- 商品删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="isDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCatedgory"
    ></el-pagination>
    <!-- 添加角色的弹框 -->
    <el-dialog title="添加商品分类" :visible.sync="addDialog">
      <el-form :model="addForm">
        <el-form-item label="分类名称" label-width="120px" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px" prop="describe">
          <!-- 弹出框的级联菜单 -->
          <el-cascader
            :options="cascadeData"
            v-model="selectedOptions"
            @change="handleChange"
            :props="propa"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addRole('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑商品分类的弹窗 -->
    <el-dialog title="编辑商品分类" :visible.sync="editDialog">
      <el-form :model="editForm">
        <el-form-item label="分类名称" label-width="120px" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editRole('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除的弹出框 -->
    <el-dialog title="提示" :visible.sync="deleteVisible" width="30%">
      <span class="el-icon-warning">是否删除此商品分类？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="suretoDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 添加分类的弹出框的相关数据
      addForm: {},
      addDialog: false,
      selectedOptions: [],
      roleData: [],
      cascadeData: [],
      propa: {
        children: "children",
        value: "cat_id",
        label: "cat_name"
      },
      //表格里面商品相关的数据
      goodsData: {},
      // 编辑商品分类的相关的数据
      editForm: {},
      editDialog: false,
      //删除分类的相关参数
      deleteVisible: false,
      //  分页器的相关的数据
      totalCatedgory: 0,
      pageSize: 5,
      currentPage: 1,
      ida: 0,
    };
  },
  created() {
    this.getGoodsData();
  },
  methods: {
    // 添加商品分类的函数
    async addGoodsCategory() {
      this.addDialog = true;
      let res = await this.$axios.get("categories", {
        params: {
          type: [2]
        }
      });
      this.cascadeData = res.data.data;
      console.log(res.data.data);
    },

    // 将处理级联数据的代码封装成为一个函数
    cascadeMethod(res, id) {
      //  console.log(arr);
      var ida = 0;
      for (var i = 0; i < res.length - 1; i++) {
        console.log(res[i].cat_id,id);

        if (res[i].cat_id === id) {
          console.log(res[i].cat_level,'ni');
          this.ida = res[i].cat_level;
          return;
         
         
        }

        if (res[i].children) {
          this.cascadeMethod(res[i].children, id);
        }
      }
     
    
    },

    //将获取商品分类数据的代码封装成为一个函数
    async getGoodsData() {
      let res = await this.$axios.get("categories", {
        params: {
          type: [1, 2, 3],
          pagenum: this.currentPage,
          pagesize: this.pageSize
        }
      });
      // console.log(res);
      this.processingData(res.data.data.result);
      this.goodsData = res.data.data.result;
      console.log(this.goodsData);
      this.totalCatedgory = res.data.data.total;
    },

    // 将数据的处理的方法封装成为一个函数
    processingData(res) {
      res.forEach(v => {
        if (v.cat_deleted === false) {
          v.isValid = "有效";
        } else {
          v.isValid = "无效";
        }
        if (v.cat_level === 0) {
          v.level = "一级";
        } else if (v.cat_level === 1) {
          v.level = "二级";
        } else {
          v.level = "三级";
        }
        if (v.children) {
          this.processingData(v.children);
        }
      });
    },

    //添加商品分类的级联菜单的相关的函数
   async handleChange(res) {
    
     this.cascadeMethod(this.cascadeData, res[res.length - 1]);
      console.log(this.ida);
      let resba = await this.$axios.post('categories',{
        cat_pid: res[res.length-1],
        cat_name: this.addForm.username,
        cat_level: this.ida+1,
      });
      console.log(resba);
    },
    // 编辑的函数
    editRolesa() {},
    // 删除的有关函数
    isDelete() {},
    //删除分类弹出框的有关的函数
    suretoDelete() {},
    //分页器相关的函数
    handleSizeChange(res) {
      this.pageSize = res;
      cosnole.log(res);
    },
    handleCurrentChange(res) {
      this.currentPage = res;
      this.getGoodsData();
    }
  }
};
</script>

<style lang="less">
#goodsCategory {
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

  .numsa {
    margin: 10px;
  }
  .el-table__expanded-cell {
    padding: 0;
  }
}
</style>
