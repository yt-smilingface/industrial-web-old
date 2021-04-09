<template>
  <div>
    <el-container class="wrapper">
      <!--主部包含侧边导航栏和主要内容区-->
      <el-container class="wrapper wrapper-container">
        <LeftMenu
          style="margin-left: 40px; height: 600px"
          :index="0"
        ></LeftMenu>
        <!--主要内容区包含主要内容和脚部-->
        <el-container class="wrapper wrapper-content">
          <el-main style="margin-right: 40px">
            <!--主要内容-->
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script src="../../js/moveMonitor/MacroMonitor.js" />

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}
.wrapper {
  width: 100%;
  height: 100%;
  margin: auto;
}
.wrapper-content {
  display: inline-block;
}

/*宏观运行监控*/
.hgyxjc-title {
  text-align: center;
  padding-left: 0px;
  background: linear-gradient(360deg, #40a0d0 0%, #64b5e2 100%);
  color: #ffffff;
  height: 35px;
  line-height: 35px;
}
</style>
