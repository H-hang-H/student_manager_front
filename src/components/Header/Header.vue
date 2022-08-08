<template>
  <el-container>
    <el-header>
      <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/Home">主页</el-menu-item>
        <el-menu-item index="/Manager">消息中心</el-menu-item>
        <el-menu-item index="/project">项目</el-menu-item>
        <el-menu-item index="/order">订单管理</el-menu-item>
        <el-menu-item index="/login" @click="logout">退出登录</el-menu-item>
      </el-menu>
    </el-header>
  </el-container>
</template>

<script>

export default {
  name: 'Header',
  data() {
    return {
    };
  },
  methods: {
    handleSelect(key) {
      if(key==='/login'){
        this.$store.state.login.flag = false;
        this.$router.push(key)
      }else{
        this.$router.push(key)
      }
    },
    // 退出登录，清空token
    logout(){
      // 清除token
      this.$store.dispatch('logout')

    }
  }
}
</script>

<style scoped>
</style>