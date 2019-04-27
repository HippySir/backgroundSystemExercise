<template>
  <div class="permission">
    <div class="headers">
      <breadcrums :itema="'权限管理'" :itemb="'权限列表'"></breadcrums>
    </div>
    <div class="mains">
      <template>
        <el-table :data="rightData" style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
          <el-table-column prop="path" label="路径" width="180"></el-table-column>
          <el-table-column prop="level" label="层级"></el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            rightData: [
               
            ],
        }
    },
   async created() {
     let res = await this.$axios.get('rights/list');
     console.log(res);
     this.rightData = res.data.data;
    },
};
</script>

<style lang = 'less'>
    .permission {
         .headers {
             height: 60px;
             display: flex;
             flex-direction: column;
             justify-content: center;
         }
         .mains {

         }
    }
</style>
