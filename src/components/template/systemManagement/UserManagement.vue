<template>
  <el-row>
    <el-col>
      <div class="UserManagement-ssssss">
        <div class="UserManagement-ssssss-two">
          <div class="UserManagement-ssssss-left">
            <div class="UserManagement-basic-information">
              <div class="UserManagement-basic-information-left-top">
                <div class="UserManagement-menuClass">
                  <div v-for="(itemOne, index) of menuTitle.data">
                    <div
                      class="UserManagement-ul-title"
                      @click="changeMenuStatus(itemOne)"
                    >
                      <div class="textTyle">{{ itemOne.directoryName }}</div>
                    </div>
                    <div v-if="itemOne.status === 1">
                      <div v-for="(itemTwo, index2) of itemOne.childMenu">
                        <div
                          class="UserManagement-levelTwoClass"
                          @click="changeMenuStatus(itemTwo)"
                        >
                          <div class="UserManagement-Sign-Card-ssss">
                            <i
                              v-if="itemTwo.status === 1"
                              class="el-icon-caret-bottom"
                              style="color: #c4c4c4; font-size: 30px"
                            ></i>
                            <i
                              v-else
                              class="el-icon-caret-right"
                              style="color: #c4c4c4; font-size: 30px"
                            ></i>
                          </div>
                          <span class="textTyle">{{ itemTwo.name }}</span>
                        </div>
                        <div v-if="itemTwo.status === 1">
                          <div v-for="(itemThree, index3) of itemTwo.childMenu">
                            <div
                              v-if="itemThree.status === 1"
                              class="UserManagement-levelThreeClassChoose1"
                              @click="changeMenuStatus(itemThree, 1)"
                            >
                              <div class="textTyle">
                                <i
                                  class="el-icon-circle-check UM-el-icon-circle-check-two"
                                ></i>
                                {{ itemThree.name }}
                              </div>
                            </div>
                            <div
                              v-else
                              class="UserManagement-levelThreeClass"
                              @click="changeMenuStatus(itemThree, 1)"
                            >
                              <div class="textTyle">
                                {{ itemThree.name }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="UserManagement-ssssss-right">
            <div class="UM-signMeg-box-head">
              <span class="UM-signMeg-box-head-span">用户详情</span>
              <el-button
                v-if="userType === 1"
                size="mini"
                class="signMeg-box-head-btn"
                icon="el-icon-edit"
                @click="leadershipManagement({}, 0)"
              >
                新增领导
              </el-button>
              <el-button
                v-else
                size="mini"
                class="signMeg-box-head-btn"
                icon="el-icon-edit"
                @click="departmentManage({}, 0)"
              >
                新增用户
              </el-button>
            </div>
            <!-- 领导管理 -->
            <div v-if="userType === 1" key="1">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column
                  prop="id"
                  label="序号"
                  align="center"
                  width="80"
                >
                </el-table-column>
                <el-table-column prop="username" label="账号" align="center">
                </el-table-column>
                <el-table-column
                  prop="governmenuserInfoVo.name"
                  label="姓名"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="governmenuserInfoVo.reserved"
                  align="center"
                  label="职位"
                >
                </el-table-column>
                <el-table-column align="cente" label="操作" width="180">
                  <template slot-scope="scope">
                    <el-button
                      @click="leadershipManagement(scope.row, 1)"
                      type="text"
                      size="small"
                      >查看</el-button
                    >
                    <el-button
                      @click="leadershipManagement(scope.row, 2)"
                      type="text"
                      size="small"
                      >修改</el-button
                    >
                    <el-button
                      @click="resetPassword(scope.row)"
                      type="text"
                      size="small"
                      >重置密码</el-button
                    >
                    <el-button
                      @click="dangerDelete(scope.row)"
                      type="text"
                      size="small"
                      class="danger-delete"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 用户管理 -->
            <div v-if="userType === 2" key="2">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column
                  prop="id"
                  label="序号"
                  align="center"
                  width="80"
                >
                </el-table-column>
                <el-table-column prop="username" label="账号" align="center">
                </el-table-column>
                <el-table-column
                  prop="governmenuserInfoVo.name"
                  label="姓名"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="governmenuserInfoVo.reserved"
                  align="center"
                  label="职位"
                >
                </el-table-column>
                <el-table-column prop="depName" align="center" label="机构">
                </el-table-column>
                <el-table-column align="cente" label="操作" width="180">
                  <template slot-scope="scope">
                    <el-button
                      @click="departmentManage(scope.row, 1)"
                      type="text"
                      size="small"
                      >查看</el-button
                    >
                    <el-button
                      @click="departmentManage(scope.row, 2)"
                      type="text"
                      size="small"
                      >修改</el-button
                    >
                    <el-button
                      @click="resetPassword(scope.row)"
                      type="text"
                      size="small"
                      >重置密码</el-button
                    >
                    <el-button
                      @click="dangerDeleteTwo(scope.row)"
                      type="text"
                      size="small"
                      class="danger-delete"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- <div class="department-ssss-fenye">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageSize"
                :page-size="cpage"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              >
              </el-pagination>
            </div> -->
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script src="../../js/systemManagement/UserManagement.js"/>

<style scoped>
.UserManagement-ssssss {
  width: 1280px;
  margin: auto;
}
.UserManagement-ssssss-two {
  width: 100%;
  display: flex;
}
.UserManagement-ssssss-left {
  width: 20%;
  margin-right: 2%;
}
.UserManagement-ssssss-right {
  width: 78%;
}
.UserManagement-basic-information {
  width: 100%;
  border-radius: 5px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
  margin-bottom: 22px;
}
.UserManagement-basic-information-left-top {
  height: 500px;
}

/*    填报内容菜单导航*/
.UserManagement-menuClass {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  border: 0px solid #9ed0e5;
  opacity: 1;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
}

.UserManagement-levelTwoClass {
  width: 100%;
  height: 38px;
  background: linear-gradient(0deg, #ffffff 0%, #ffffff 0%);
  opacity: 1;
  font-family: PingFang SC;
  display: flex;
  cursor: pointer;
}
.UserManagement-ul-title {
  height: 40px;
  background-color: #0265ba;
  border-radius: 10px 10px 0px 0px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-weight: 500;
}
.UserManagement-levelTwoClass .textTyle {
  color: #066b95;
  text-align: center;
  height: 100%;
  font-family: PingFang SC;
  font-size: 16px;
  line-height: 38px;
  height: 38px;
  cursor: pointer;
}
.UserManagement-levelThreeClass {
  width: 100%;
  height: 38px;
  opacity: 1;
  display: flex;
  cursor: pointer;
}
.UserManagement-levelThreeClassChoose1 {
  width: 100%;
  height: 38px;
  opacity: 1;
  display: flex;
  cursor: pointer;
  background: linear-gradient(
    90deg,
    #0265ba 0%,
    rgba(255, 255, 255, 0.28) 100%
  );
}
.UserManagement-levelThreeClass .textTyle {
  font-size: 15px;
  font-family: PingFang SC;
  color: #006699;
  opacity: 1;
  margin: auto auto auto 15px;
  cursor: pointer;
}
.UserManagement-levelThreeClassChoose1 .textTyle {
  font-size: 15px;
  font-family: PingFang SC;
  color: #ffffff;
  opacity: 1;
  margin: auto auto auto 10px;
  cursor: pointer;
  overflow: hidden;
}
.UserManagement-Sign-Card-ssss {
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.UM-el-icon-circle-check-two {
  color: white;
  font-size: 18px;
  line-height: 38px;
}
.UM-signMeg-box-head {
  width: 100%;
  background: linear-gradient(
    90deg,
    #0265ba 1%,
    rgba(255, 255, 255, 0.12) 103%
  );
  height: 50px;
  justify-content: space-between;
  position: relative;
}
.UM-signMeg-box-head-span {
  line-height: 50px;
  font-weight: 600;
  margin-left: 30px;
  color: aliceblue;
  font-size: 18px;
}
.UM-signMeg-box-head-btn {
  position: absolute;
  right: 10px;
  top: 10px;
}
.danger-delete {
  color: #cccccc;
}
</style>