<template>
  <el-row :style="loginWrapper" class="login">
    <el-col :span="24" class="login-top">
      <div class="text-icon">
        <el-image :src="items[0]" style="width: 300px; height: 38px" />
        <el-image :src="items[1]" style="width: 350px; height: 18px" />
      </div>
      <div class="system-name" :style="loginSystemName">
        <el-image :src="systemName" alt="" style="width: 38%; height: 43px" />
      </div>
    </el-col>
    <el-col :span="24" style="background: #44aeff">
      <el-form
        ref="loginForm"
        :model="loginForm"
        label-width="0px"
        label-position="left"
        class="form-box"
        v-loading="loading"
        :element-loading-text="'正在登录' + '...'"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.6)"
        :rules="rules"
        :style="formStyle"
        status-icon
      >
        <h3 class="login-zf" style="">
          <span>政府登录</span>
        </h3>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            type="text"
            auto-complete="on"
            placeholder="用户名"
            autofocus
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="密码"
            type="password"
            @keyup.native.enter="onLogin('loginForm')"
          ></el-input>
        </el-form-item>
        <el-checkbox
          style="margin: 0 0 35px 0"
          v-model="isRememberPwd"
          target="_blank"
          >下次自动登录</el-checkbox
        >
        <!-- <el-button type="text" get="_blank" class="forget-pass"
          >忘记密码</el-button
        > -->
        <el-form-item style="text-align: center">
          <el-button
            type="primary"
            @click="onLogin('loginForm')"
            style="width: 280px"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24" class="login-bottom">
      <el-image :src="copyright" style="width: 243px; height: 21px" />
    </el-col>
  </el-row>
</template>

<script src="../js/Login.js" />

<style scoped>
.login {
  background: url("../../assets/login/beijing1.png");
  background-size: cover;
}
.login-top {
  /*background: url("../../assets/login/beijing2.png") repeat-x;*/
}
.text-icon {
  display: grid;
  padding-top: 20px;
  padding-left: 35px;
}
.system-name {
  width: 100%;
  text-align: center;
}
.login-bottom {
  text-align: center;
  position: absolute;
  bottom: 28px;
}
.form-box {
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(0, 0, 0, 0.02);
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -moz-border-radius: 4px;
  background-clip: padding-box;
  margin-bottom: 20px;
  background-color: #f9fafc;
  /*border: 2px solid #fff;*/
  width: 320px;
  padding: 0px 28px 15px 28px;
}
.login-zf {
  background: #44aeff;
  color: #fff;
  font-size: 24px;
  text-align: center;
  line-height: 45px;
  font-family: PingFang SC;
  letter-spacing: 4px;
  margin: 0px -28px 25px -28px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
/deep/ .el-input__inner {
  border-radius: 24px;
}
.forget-pass {
  position: absolute;
  right: 33px;
  padding-top: 0px;
}

h3 > span {
  cursor: pointer;
  margin: 0 3px;
}
</style>
