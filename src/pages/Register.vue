<template>
  <div>
    <el-form
      :rules="rules"
      ref="loginform"
      :model="loginform"
      class="loginform"
    >
      <h3 class="logintitle">注册系统</h3>
      <el-form-item prop="username" label="用户名">
        <el-input
          type="text"
          auto-complete="false"
          v-model="loginform.username"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          type="password"
          auto-complete="false"
          v-model="loginform.password"
          placeholder="请输入密码"
        />
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
    name:'Register',
    data() {
        return {
            loginform: {},
            rules: {
                username: [{ required: true, message: "请输用户名", trigger: "blur" }],
                password: [{ required: true, message: "请输密码", trigger: "blur" }],
            }
        }
    },
    methods:{
        register(){
            let flag=true
            this.$axios.get("http://localhost:8081/userslist").then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    if (this.loginform.username == res.data[i].username) {
                        this.$message.error('用户名重复，请重新填写')
                        this.loginform={}
                        flag=false
                    } 
                }
            });
            if(flag){
                this.$axios.post("http://localhost:8081",this.loginform).then((res)=>{
                    if(res.data){
                        this.$message.success('注册成功')
                        this.$router.push('/login')
                        this.loginform={}
                    }else{
                        this.$message.info('注册失败，请重试')
                        this.loginform={}
                    }
                })
            }
        },
        toreturn(){
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
.btn_foot{
    text-align: center;
}
</style>