<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" >
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{itema}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{itemb}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props:['itema','itemb'],
};
</script>

<style lang="less">
    
</style>
