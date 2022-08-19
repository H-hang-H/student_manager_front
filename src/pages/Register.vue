<template>
  <div>
    <el-form :rules="rules" ref="loginform" :model="loginform" class="loginform">
      <h3 class="logintitle">注册系统</h3>
      <el-form-item prop="username" label="用户名">
        <el-input type="text" auto-complete="false" v-model="loginform.username" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" auto-complete="false" v-model="loginform.password" placeholder="密码为6-13位" />
      </el-form-item>
      <el-form-item class="btn_foot">
        <el-button type="primary" size="default" @click="register">注册</el-button>
        <el-button type="info" size="default" @click="toreturn">已有账号，返回登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      loginform: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: "请输手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输密码，6-12位", trigger: "blur" }],
      }
    }
  },
  methods: {
    register() {
      let formdata = new URLSearchParams()
      formdata.append('username', this.loginform.username)
      formdata.append('password', this.loginform.password)
      this.$store.dispatch('getregister',formdata).then(res=>{
        if(res.status===0){
          this.$message.success('注册成功,请进行登录')
          this.$router.push('/login')
        }else{
          this.$message.error(res.message)
        }
      })
    },
    toreturn() {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.loginform {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.logintitle {
  margin: 0px auto 40px auto;
  text-align: center;
}

.btn_foot {
  text-align: center;
}
</style>