<template>
  <div>
    <el-form :rules="rules" ref="loginform" :model="loginform" class="loginform">
      <h3 class="logintitle">登录系统</h3>
      <el-form-item prop="username" label="用户名">
        <el-input type="text" auto-complete="false" v-model="loginform.username" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" auto-complete="false" v-model="loginform.password" placeholder="密码为6-13位"/>
      </el-form-item>
      <el-form-item class="btn_foot">
        <el-button type="primary" size="default" @click="denglu">登录</el-button>
        <el-button type="primary" size="default" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginform: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submit() {
      let flag = false
      this.$axios.post("http://localhost:8081/login", this.loginform).then((res) => {
        flag = res.data
        if (flag) {
          this.$message.success("登录成功");
          this.$router.replace('/home')
          this.loginform = {};
          this.$store.state.login.flag = true;
          console.log(this.$store.state.login.flag);

        } else {
          this.$message.error("账号或者密码错误");
          this.loginform = {};
        }
      });
    },
    denglu() {
      let formdata = new URLSearchParams()
      formdata.append('username', this.loginform.username)
      formdata.append('password', this.loginform.password)
      this.$store.dispatch('getlogin', formdata).then(res => {
        if (res.status !== 0) {
          this.$message.error(res.message)
        }else{
          this.$message.success('登录成功')
          this.$router.push('/home')
        }
      })

    },
    register() {
      this.$router.push('/register')
      this.loginform = {};
    },
  },
};
</script>

<style scoped>
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
