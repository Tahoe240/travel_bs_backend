<script>
import axios from 'axios'
import router from "@/router";
export default {
  name: "LoginComponent",
  data() {
    return {
      ruleForm: {
        username: 'root',
        password: '333',
        verifyCode: ''
      },
      rules: {
        // ...
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur'}
        ],
        verifyCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      },
      loginForm: null,
      captchaSrc: '/api/user/getCaptcha'
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        if(valid) {
          console.log(this.ruleForm)
          axios.post("/api/user/login", this.ruleForm)
              .then(res => {
                if (res.data.code === 200) {

                  this.$message.success({
                    title: 'Success',
                    message: '登录成功！'
                  });
                  localStorage.setItem('token', res.data.data.token);
                  this.$store.commit("updateLoginUser", res.data.data);
                  console.log("login===>user.avatar:"+this.$store.state.login_user.avatar);
                  localStorage.setItem('login_user',JSON.stringify(res.data.data));
                  setTimeout(() => {
                    router.push("/");
                  }, 500);
                } else {
                  this.$message.error({
                    title: '登录出错',
                    message: res.data.message || '未知错误，请稍后重试'
                  });
                }
              })
              .catch(error => {
                console.error(error);
                if(error.response){
                  const errorMessage = error.response.data.message;
                  this.$message.error({
                    title: '登录出错',
                    message: errorMessage || '未知错误，请稍后重试'
                  });
                } else {
                  this.$message.error({
                    title: '登录出错',
                    message: '未知错误，请稍后重试'
                  });
                }
              });
        }
      });
    },
    sendRequest() {
      const token = localStorage.getItem('token');
      console.log('获取到的token:', token)
      axios.get('/api/user/testLog', {
        headers: {
          Authorization: `Bearer ${token}` // 将token添加到请求头部
        }
      })
          .then(response => {
            console.log(response.data); // 打印返回值
          })
          .catch(error => {
            console.error(error);
          });
    },
    updateCaptcha() {
      this.captchaSrc = '/api/user/getCaptcha?time=' + Date.now()
      this.$message.success('验证码已更新')
    },
    autoSubmitForm() {
      if (this.ruleForm.verifyCode.length === 4) {
        this.submitForm();
      }
    }
  },
  watch: {
    // 监听 ruleForm.verifyCode 的变化
    'ruleForm.verifyCode': function(newVal) {
      // 当验证码输入变化时，调用 autoSubmitForm 方法
      this.autoSubmitForm();
    }
  },
  mounted() {
    this.updateCaptcha();
    this.$watch('ruleForm.verifyCode', { immediate: true });
  }
}
</script>


<template>
  <div class="login-view">
    <div class="login-card">
      <div class="title" style="height: 70px;line-height: 60px;">
        <div style="display: flex;">
          <el-image style="width: 160px; height: 60px" :src="require('@/assets/images/common/xingguang-travel.jpg')"
                    fit="fill"></el-image>
          <div style="font-size:28px;margin-left: 10px;line-height: 60px;font-weight: bold;font-style: italic;">
            星光不负赶路人
          </div>
        </div>
      </div>
      <el-form
          ref="loginForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          label-position="left"
          class="demo-ruleForm">

        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="verifyCode">
          <el-row>
            <el-col :span="15">
              <el-input v-model="ruleForm.verifyCode" @input="$forceUpdate()"/>
            </el-col>

            <el-col :span="8" :offset="1">
              <el-image
                  ref="verifyCaptcha"
                  :src="captchaSrc"
                  style="width: 100%; height: 48px"
                  fit="scale-down"
                  @click="updateCaptcha"/>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="success" style="width: 100%;" @click="submitForm">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" style="width: 100%;" @click="$router.push('register')">没有账号？去注册</el-button>
        </el-form-item>
      </el-form>

    </div>

    <!--粒子特效-->
    <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="280"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push">
    </vue-particles>
  </div>
</template>

<style scoped>
.login-view {
  position: relative;
  background-image: url('~@/assets/images/common/login_bg.jpg');
  background-size: cover;
  width: 100vw;
  height: 100vh;
}

.login-card {
  width: 500px;
  height: 400px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  padding: 15px 30px 10px 30px;
  border-radius: 8px;
  box-shadow: 0 0 3px #ddd;
  background-color: white;
}
</style>



