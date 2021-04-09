<template>
  <el-row>
    <el-col
      <div style="width: 100%">
        <div class="signMeg-box-head">
          <span class="signMeg-box-head-span">基本信息</span>
        </div>

        <div class="basic-information">
          <table class="basic-information-table1">
            <tr style="margin: 0px; padding: 0px">
              <td class="enterprise-business-table1">表单编号</td>
              
              <td class="enterprise-business-table2">
                <el-input
                  v-model="tableData.fillNumber"
                  size="medium"
                  placeholder="请输入表单编号"
                  disabled
                ></el-input>
              </td>
              <td class="enterprise-business-table1">表单名称</td>
              <td class="enterprise-business-table2">
                <el-input
                  v-model="tableData.fillName"
                  size="medium"
                  placeholder="请输入表单名称"
                  maxlength="20"
                  :disabled="tableIndex === 1 ? true : false"
                ></el-input>
              </td>
              <td class="enterprise-business-table1">责任机构</td>
              <td class="enterprise-business-table2">
                <el-select
                  size="medium"
                  v-model="tableData.mechanismId"
                  :disabled="tableIndex === 1 ? true : false"
                >
                  <el-option
                    v-for="item in responsibleAgency"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </td>
              <td class="enterprise-business-table1">填报期别</td>
              <td class="enterprise-business-table2">
                <el-select
                  v-model="tableData.fillType"
                  size="medium"
                  placeholder="请选择"
                  :disabled="tableIndex === 1 ? true : false"
                  
                >
                  <el-option
                    v-for="item in reportTypeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr style="margin: 0px; padding: 0px">
              <td class="enterprise-business-table1">填报范围</td>
              <td class="enterprise-business-table2">
                <el-input
                  v-model="tableData.fillScope"
                  size="medium"
                  placeholder="请输入填报范围"
                  disabled
                ></el-input>
              </td>
              <td class="enterprise-business-table1">填报日期</td>
              <td class="enterprise-business-table2">
                <el-date-picker
                  v-model="tableData.cronTime"
                  type="datetime"
                  size="medium"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </td>
              <td class="enterprise-business-table1">开始日期</td>
              <td class="enterprise-business-table2">
                <el-date-picker
                  v-model="tableData.startTime"
                  type="datetime"
                  size="medium"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </td>
              <td class="enterprise-business-table1">截止日期</td>
              <td class="enterprise-business-table2">
                <el-date-picker
                  v-model="tableData.endTime"
                  type="datetime"
                  size="medium"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </td>
            </tr>
            <tr style="margin: 0px; padding: 0px">
              <td class="enterprise-business-table1">填报说明</td>
              <td class="enterprise-business-table2" colspan="7">
                <el-input
                  type="textarea"
                  :rows="3"
                  maxlength="200"
                  size="medium"
                  placeholder="请输入报告说明"
                  v-model="tableData.description"
                  :disabled="tableIndex === 1 ? true : false"
                ></el-input>
              </td>
            </tr>
          </table>
        </div>
        <!--          填报内容      -->
        <div class="signMeg-box-head">
          <span class="signMeg-box-head-span">填报内容</span>
        </div>
        <div class="basic-information" style="display: flex">
          <div class="basic-information-left-top">
            <div class="menuClass">
              <div v-for="(itemOne, index) of menuTitle.data">
                <div class="ul-title" @click="changeMenuStatus(itemOne)">
                  <div class="textTyle">{{ itemOne.directoryName }}</div>
                </div>
                <div v-if="itemOne.status === 1">
                  <div v-for="(itemTwo, index2) of itemOne.childMenu">
                    <div
                      class="levelTwoClass"
                      @click="changeMenuStatus(itemTwo)"
                    >
                      <div class="Sign-Card-ssss">
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
                      <div v-for="(itemThree, index3) of itemTwo.childrenList">
                        <div
                          v-if="itemThree.status === 1"
                          class="levelThreeClassChoose1"
                          @click="changeMenuStatus(itemThree, 1)"
                        >
                          <div class="textTyle">
                            <i
                              class="el-icon-circle-check el-icon-circle-check-two"
                            ></i>
                            {{ itemThree.name }}
                          </div>
                        </div>
                        <div
                          v-else
                          class="levelThreeClass"
                          @click="changeMenuStatus(itemThree, 0)"
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
          <div class="Sign-Card-top-center">
            <i
              class="el-icon-d-arrow-right"
              style="width: 100%; margin-bottom: 29px"
            ></i>
            <i class="el-icon-d-arrow-left" style="width: 100%"></i>
          </div>
          <div style="width: 70%">
            <div class="ul-title">填报表单</div>
            <div class="basic-information">
              <div class="Sign-Card-basic-information">
                <table class="tblr Sign-Card-tblr" id="addReportForm">
                  <!-- <tr style="margin: 0px; padding: 0px">
                    <td class="enterprise-business-table3">单位详情名称 _</td>
                    <td class="enterprise-business-table4">统一社会信用代码</td>
                  </tr>
                  <tr style="margin: 0px; padding: 0px">
                    <td class="enterprise-business-table3">
                      法定代表人（单位负责人） _
                    </td>
                    <td class="enterprise-business-table4">
                      联系电话（含区号）__
                    </td>
                  </tr>
                  <tr style="margin: 0px; padding: 0px">
                    <td class="enterprise-business-table3">单位所在地 -</td>
                    <td class="enterprise-business-table4" rowspan="2">
                      区域代码
                    </td>
                  </tr>
                  <tr style="margin: 0px; padding: 0px">
                    <td class="enterprise-business-table3">市 县（区，市）</td>
                  </tr>
                  <tr style="margin: 0px; padding: 0px">
                    <td class="enterprise-business-table3">网址 _</td>
                    <td class="enterprise-business-table4">邮政编码</td>
                  </tr>
                  <tr style="margin: 0px; padding: 0px">
                    <td class="enterprise-business-table3" colspan="2">
                      请于下列各选项后□中打勾"√"
                    </td>
                  </tr>
                  <tr style="margin: 0px; padding: 0px">
                    <td class="enterprise-business-table3">是否有出口业务</td>
                    <td class="enterprise-business-table4">是否上市公司</td>
                  </tr>
                  <tr style="margin: 0px; padding: 0px">
                    <td class="enterprise-business-table3" colspan="2">
                      登记注册类型
                    </td>
                  </tr>
                  <tr style="margin: 0px; padding: 0px">
                    <td class="enterprise-business-table3">
                      是否为国有控股企业
                    </td>
                    <td class="enterprise-business-table4">单位规模</td>
                  </tr> -->
                  <tr
                    style="margin: 0px; padding: 0px"
                    v-for="(itme, index) in tableData.contentDateReqs"
                  >
                    <td
                      class="enterprise-business-table3"
                      colspan="3"
                      style="line-height: 38px"
                    >
                      {{ itme.name }}
                      <el-button
                        v-if="tableIndex !== 1"
                        type="text"
                        icon="el-icon-close"
                        @click="cancelReportFrom(itme)"
                        style="float: right; margin-right: 15px"
                      ></el-button>
                    </td>
                  </tr>
                </table>
              </div>

            </div>
          </div>
        </div>
        <!--  -->
        <div class="signMeg-box-head">
          <span class="signMeg-box-head-span">填报范围</span>
        </div>
        <div class="basic-information" style="display: flex">
          <div style="width: 22%">
            <ul class="reportbox-ul1" style="margin: 0px 0px 14px 0px">
              <div class="ul-title">企业标签</div>
              <div style="height:320px; overflow: scroll;">
              <li
                @click="handleActive(item)"
                v-for="(item, index) in rangeLiArr"
                :class="rangeIsActive.indexOf(item.id) !== -1 ? 'active' : ''"
                style="margin: 5px 0"
              >
                {{ item.labelName }}
              </li>
              <li>
                
                <el-button @click="handleTo"> <i class="el-icon-plus"></i>添加企业标签</el-button>
              </li>
              </div>
            </ul>
            <!-- <div style="margin: auto; text-align: center">
              <el-button icon="el-icon-plus"> 添加企业标签 </el-button>
            </div> -->
          </div>
          <div class="sign-card-add-ep">
            <i
              class="el-icon-d-arrow-right"
              style="width: 100%; margin-bottom: 29px"
            ></i>
            <i class="el-icon-d-arrow-left" style="width: 100%"></i>
          </div>
          <div style="width: 70%">
            <div class="ul-title">企业范围</div>
            <div class="basic-information" style="min-height: 300px">
              <table class="tblr sign-card-look-tblr">
                <tr
                  style="margin: 0px; padding: 0px"
                  v-for="(item, index) in reportEnterprise"
                >
                  <td class="enterprise-business-table5">
                    {{ item.labelName }}
                    <el-button
                    v-if="tableIndex !== 1"
                      type="text"
                      icon="el-icon-close"
                      @click="cancelReportingEnterprise(item)"
                      style="float: right; margin-right: 15px"
                    ></el-button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="view-reports">
          <div class="reports-buttom-one">
            <el-button
              v-if="tableIndex !== 1"
              type="primary"
              @click="saveFill()"
              >保 &nbsp;&nbsp;&nbsp; 存</el-button
            >
            <el-button @click="cancelSubmit"
              >取 &nbsp;&nbsp;&nbsp; 消</el-button
            >
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script src="../../../js/directCar/makeReport/SignCardLook.js"/>

<style scoped>
.basic-information {
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
  /*margin-top: 27px;*/
  margin-bottom: 22px;
  padding: 17px 30px;
}

table {
  border-spacing: 0px;
  font-size: 14px;
}
.basic-information-table1 {
  border: 1px solid #cfcfcf;
  margin-top: 18px;
  width: 100%;
  margin: auto;
}
.basic-information-table1 td {
  height: 38px;
  border: 1px solid #cfcfcf;
  text-align: center;
  font-size: 12px;
}
.enterprise-business-table1 {
  width: 10%;
  background: #f5f8ff;
}
.enterprise-business-table2 {
  width: 15%;
  text-align: left;
  padding-left: 20px;
}

/*.tblr td{*/
/*    border: 1px solid #ACC8E9;*/
/*}*/
.sign-card-add-ep {
  width: 8%;
  text-align: center;
  margin: auto;
  font-size: 59px;
  color: #9a9a9a;
}
.sign-card-look-tblr {
  border: 0px solid #acc8e9;
  margin-top: 18px;
  width: 100%;
  margin: auto;
}
.enterprise-business-table3 {
  width: 28.3%;
  text-align: left;
}
.enterprise-business-table4 {
  width: 18%;
  text-align: left;
  padding-left: 20px;
}
.enterprise-business-table5 {
  width: 18%;
  text-align: left;
  padding-left: 20px;
  font-size: 16px;
}
/*列表*/
.reportbox-ul1 {
  position: relative;
  width: 100%;
  height: 360px;
  background-color: #fff;
  box-shadow: 3px 3px 3px 3px #eee;
  border-radius: 10px 10px 10px 10px;
  padding-left: 0px !important;
  padding-bottom: 10px;
  /* overflow-y: scroll; */
}
.ul-title {
  height: 40px;
  /* background: linear-gradient(
          180deg,
          #3ab3e8,
          #239bd0 50%,
          #2ba6dc 50%,
          #7bd1ff 94%,
          #7bd1ff
        ); */
  background-color: #0265ba;
  border-radius: 10px 10px 0px 0px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-weight: 500;
  /* position: fixed; */
}

.reportbox-ul1 li {
  list-style: none;
  text-align: center;
  line-height: 40px;
  margin: 15px 0;
}
.reportbox-ul1 li.active {
  background: linear-gradient(90deg, #0265ba 38%, rgba(255, 255, 255, 0.28));
  color: #fff;
}

.reportbox-ul1 li:hover {
  cursor: pointer;
}

/*    填报内容菜单导航*/
.menuClass {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 0px solid #9ed0e5;
  opacity: 1;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
}

.levelOneClass {
  width: 100%;
  height: 35px;
  border: 1px solid #57c0ed;
  background: linear-gradient(360deg, #40a0d0 0%, #64b5e2 100%);
  opacity: 1;
  display: flex;
  cursor: pointer;
}
.levelOneClass .textTyle {
  color: #ffffff;
  text-align: right;
  margin: auto auto;
  font-size: 19px;
  cursor: pointer;
}
.levelTwoClass {
  width: 100%;
  height: 38px;
  background: linear-gradient(0deg, #ffffff 0%, #ffffff 0%);
  opacity: 1;
  font-family: PingFang SC;
  display: flex;
  cursor: pointer;
}
.levelTwoClass .textTyle {
  color: #066b95;
  text-align: center;
  height: 100%;
  font-family: PingFang SC;
  font-size: 16px;
  line-height: 38px;
  height: 38px;
  cursor: pointer;
}
.levelThreeClass {
  width: 100%;
  height: 38px;
  opacity: 1;
  display: flex;
  cursor: pointer;
}
.levelThreeClassChoose1 {
  width: 100%;
  height: 38px;
  opacity: 1;
  display: flex;
  cursor: pointer;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    #0265ba 0%,
    rgba(255, 255, 255, 0.28) 100%
  );
}
.levelThreeClass .textTyle {
  font-size: 15px;
  font-family: PingFang SC;
  color: #006699;
  opacity: 1;
  margin: auto auto auto 15px;
  cursor: pointer;
}
.levelThreeClassChoose1 .textTyle {
  font-size: 15px;
  font-family: PingFang SC;
  color: #ffffff;

  overflow: hidden;
  opacity: 1;
  margin: auto auto auto 10px;
  cursor: pointer;
  overflow: hidden;
}
.Sign-Card-ssss {
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.el-icon-circle-check-two {
  color: white;
  font-size: 18px;
  line-height: 38px;
}
.basic-information-left-top {
  width: 22%;
  height: 500px;
}
.Sign-Card-top-center {
  width: 8%;
  text-align: center;
  margin: auto;
  font-size: 59px;
  color: #9a9a9a;
}
.Sign-Card-tblr {
  border: 1px solid #acc8e9;
  margin-top: 18px;
  width: 100%;
  margin: auto;
}
.Sign-Card-basic-information {
  width: 100%;
  height: 400px;
  overflow: scroll;
}
</style>