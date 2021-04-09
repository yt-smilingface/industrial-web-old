<template>
  <el-container class="wrapper">
    <el-container class="wrapper wrapper-container">
      <el-header class="navigation-backg" style="height: 80px; padding: 0 20px">
        <!--导航-->
        <div class="yunnan-name" @click="$router.push({ path: '/home' })">
          <p>云南省工业经济</p>
          <p>运行监测管理平台</p>
        </div>
        <div class="yunnan-daoHang">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            router
            style="background-color: rgba(255, 255, 255, 0)"
          >
            <el-submenu
              :index="indexs + 1 + ''"
              v-for="(i, indexs) in menu"
              :key="indexs"
            >
              <template slot="title" style="">{{
                menu[indexs].directoryName
              }}</template>
              <el-menu-item
                v-for="(item, index) in menu[indexs].childMenu"
                style="font-size: 16px"
                :index="item.url + '?index=' + item.id"
                :key="index"
                >{{ item.directoryName }}</el-menu-item
              >
            </el-submenu>

            <el-submenu index="111">
              <template slot="title" style="">
                知识库
              </template>
              <el-menu-item index="/researchReport">
                <span @click="$router.push('/researchReport')">行业研报</span>
                </el-menu-item
              >
            </el-submenu>

          </el-menu>
        </div>
        <div class="yunnan-user">
          <span @click="$router.push('/dataQuery')" target="_blank" style="margin-right: 20px;cursor: pointer;color:#fff;">企业查询</span>
          <a href="http://59.216.193.7:8081/2,159272857eb1" target="blank" style="cursor: pointer;color:#fff;text-decoration:none;">使用帮助</a>
          <el-popover placement="top" trigger="hover" v-model="visible2">
            <div>
              <img class="official-account-img" :src="officialAccountImg" />
            </div>
            <el-button class="official-account" slot="reference"
              >微信公众号</el-button
            >
          </el-popover>
          <el-popover
            placement="top"
            width="210"
            trigger="hover"
            v-model="visible"
          >
            <div style="font-size: 16px; line-height: 36px">
              <p>
                账号：<span>{{ userInfo.username }}</span>
              </p>
              <p></p>
              <p>
                处室：<span>{{ userInfo.depName }}</span>
              </p>
              <p>
                职位：<span>{{ userInfo.governmenuserInfoVo.reserved }}</span>
              </p>
            </div>
            <div style="text-align: left; margin: 0">
              <el-button type="text" @click="$router.push('/updateLog')"
                >更新日志</el-button
              >
              <el-button type="text" @click="changePassword"
                >修改密码</el-button
              >
              <el-button type="text" @click="logout">退出登录</el-button>
            </div>
            <span slot="reference">
              <span
                class="el-dropdown-link"
                style="
                  font-size: 18px;
                  color: #ffffff;
                  margin-left: 18px;
                  cursor: pointer;
                "
              >
                <!-- <i class="el-icon-user"></i>  -->
                <!-- 个人中心 -->
                {{ userInfo.governmenuserInfoVo.name
                }}{{ userInfo.governmenuserInfoVo.reserved }}
              </span>
              <el-button
                class="el-icon-user-hover"
                icon="el-icon-caret-bottom"
                size="mini"
              ></el-button>
            </span>
          </el-popover>
        </div>
      </el-header>

      <el-container class="wrapper wrapper-content">
        <!--主体-->
        <breadcrumb></breadcrumb>
        <router-view></router-view>
        <el-footer class="footer" style="margin: 8px auto;"
          >
          <!-- <div>网站地图 网站声明 关于我们</div> -->
          <!-- <div>主办单位：云南省工业和信息化厅</div> -->
          <!-- <div>运营单位：云南数联铭信科技有限公司 滇ICP备00000000 客服热线：400-803-0095</div> -->
          <!-- <div>滇ICP备00000000</div>
          <div>客服热线：400-803-0095</div> -->
          <!-- <div>主办单位：云南省工业和信息化厅 客服邮箱：cqredit@bbdservice.com</div> -->

          <div>维护机构：云南数联铭信有限公司 技术支持电话：133-6837-9065</div>
        </el-footer>
      </el-container>

      <!--        版权-->
    </el-container>
  </el-container>
</template>

<script src="../js/Home.js"/>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}
.wrapper {
  /* width: 98.9vw; */
  width: 100%;
  height: 100%;
  margin: auto;
}
.navigation-backg {
  /*background-image: url("../../assets/navigation.png");*/
  background: #0265ba;
  /*background-repeat: repeat;*/
  background-size: 100% 100%;
}
.yunnan-name {
  display: inline-block;
  vertical-align: top;
  height: 80px;
  width: 176px;
  color: #ffffff;
  font-size: 18px;
  margin-left: 20px;
  line-height: 23px;
  text-align: center;
  font-family: "PingFang SC";
  letter-spacing: 1px;
  margin-top: 24px;
  cursor: pointer;
}
.yunnan-daoHang {
  display: inline-block;
  vertical-align: top;
  /* width: 810px; */
  color: white;
  font-family: "PingFang SC";
  line-height: 70px;
  font-weight: 500;
  /* position: absolute; */
  /* top: 19px; */
  /* left: 300px; */
  margin-left: 20px;
  margin-top: 19px;
}
.yunnan-user {
  display: inline-block;
  /* position: absolute; */
  /* right: 10px; */
  /* top: 40px; */
  float: right;
  margin-top: 40px;
}

.wrapper-content {
  /* width: 78vw;  */
  display: inline-block;
}
.main-content {
  margin-top: 10px;
  overflow: auto;
}

.el-menu-item {
  margin-right: 30px;
  font-size: 16px;
}
/deep/ .el-submenu__title {
  font-size: 16px;
}
/**/
/deep/ .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background: linear-gradient(to bottom, #f1f6fa, #b5e4fe);
}
/deep/ .el-menu--horizontal > .el-submenu:focus .el-submenu__title,
.el-menu--horizontal > .el-submenu:hover .el-submenu__title {
  background: linear-gradient(to bottom, #f1f6fa, #b5e4fe);
  color: #066b95;
}
/*改变台头点击后效果 */
/deep/ .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  color: #0265ba;
  background: linear-gradient(
    360deg,
    #f1f6fa 0%,
    #d7e8ef 38%,
    #ffffff 70%,
    #daf2ff 83%,
    #b5e4fe 83%,
    #b5e4fe 100%
  );
}
/deep/ .el-menu--horizontal > .el-submenu .el-submenu__title {
  /* width: 161px; */
  text-align: center;
  height: 61px;
  line-height: 61px;
  border-bottom: 0px solid transparent;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  background: linear-gradient(
    360deg,
    #569ad4,
    #5fa4de,
    #56a7ec,
    #44a3f6,
    #369ffa,
    #2b9cfe
  );
}
/deep/ .el-menu--horizontal .el-submenu__title i {
  margin-left: 4px;
  color: #fff;
}
/deep/ .el-menu--horizontal .is-active .el-submenu__title i {
  color: #0265ba;
}

/*改变微信公众号*/
/deep/ .el-menu--horizontal > .el-menu-item {
  width: 194px;
  text-align: center;
  height: 61px;
  line-height: 61px;
  border-bottom: 0px solid transparent;
  color: #ffffff;
  background: linear-gradient(
    360deg,
    #569ad4,
    #5fa4de,
    #56a7ec,
    #44a3f6,
    #369ffa,
    #2b9cfe
  );
}
/*改变下拉框选择颜色*/
/deep/ .el-menu--horizontal .el-menu .el-menu-item.is-active,
.el-menu--horizontal .el-menu .el-submenu.is-active > .el-submenu__title {
  color: #303133;
  background: linear-gradient(
    360deg,
    #3ab3e8 0%,
    #239bd0 38%,
    #2ba6dc 70%,
    #7bd1ff 83%,
    #7bd1ff 83%
  );
}
/*下拉框hover属性*/
/deep/ .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  outline: 0;
  color: #ffffff;
  /* background: #0265ba; */
  background: linear-gradient(
    360deg,
    #569ad4,
    #5fa4de,
    #56a7ec,
    #44a3f6,
    #369ffa,
    #2b9cfe
  );
}
/*下拉框字体颜色*/
.el-menu--horizontal .el-menu .el-menu-item,
.el-menu--horizontal .el-menu .el-submenu__title {
  color: #666;
  text-align: center;
  height: 44px;
  line-height: 44px;
  margin-right: 0px;
  transition: all 0s;
}
/* .el-menu--horizontal .el-menu {
  background-color: #7bd1ff;
} */

.footer {
  text-align: center;
  font-size: 13px;
  height: 30px;
  width: 1080px;
  margin: 32px auto 10px;
}
.official-account {
  color: #fff;
  margin-left: 20px;
  font-size: 15px;
  background: #0265ba;
  border: #dddddd solid 0px;
}
.el-icon-user-hover {
  background: #2065ba;
  border: 0px solid #dcdfe6;
  font-size: 15px;
  color: #ffffff;
}
.el-dropdown-link {
  font-size: 16px !important;
}

/* .el-popover {
  opacity: 0 !important;
} */
</style>