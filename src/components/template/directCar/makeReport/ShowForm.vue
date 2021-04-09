<template>
  <div>
    <el-row>
      <el-col>
        <div style="width: 100%">
          <div class="signMeg-box-head">
            <span class="signMeg-box-head-span">基本信息</span>
          </div>
          <div class="basic-information">
            <table
              style="
                border: 1px solid #cfcfcf;
                margin-top: 18px;
                width: 100%;
                margin: auto;
              "
            >
              <tr style="margin: 0px; padding: 0px">
                <td class="enterprise-business-table5">表单编号</td>
                <td class="enterprise-business-table6">
                  {{ tableData.fillNum }}
                </td>
                <td class="enterprise-business-table5">表名称</td>
                <td class="enterprise-business-table6">
                  {{ tableData.fillName }}
                </td>
                <td class="enterprise-business-table5">责任机构</td>
                <td class="enterprise-business-table6">
                  {{ tableData.mechanismName }}
                </td>
                <td class="enterprise-business-table5">填报期别</td>
                <td class="enterprise-business-table6">
                  <div v-if="tableData.fillType === 0">月报</div>
                  <div v-if="tableData.fillType === 1">季报</div>
                  <div v-if="tableData.fillType === 2">年报</div>
                  <div v-if="tableData.fillType === 3">一次</div>
                </td>
              </tr>
              <tr style="margin: 0px; padding: 0px">
                <td class="enterprise-business-table5">填报范围</td>
                <td class="enterprise-business-table6">
                  {{ tableData.fillScope }}
                </td>
                <td class="enterprise-business-table5">填报日期</td>
                <td class="enterprise-business-table6">
                  {{ tableData.cronTime }}
                </td>
                <td class="enterprise-business-table5">开始日期</td>
                <td class="enterprise-business-table6">
                  {{ tableData.startTime }}
                </td>
                <td class="enterprise-business-table5">截止日期</td>
                <td class="enterprise-business-table6">
                  {{ tableData.endTime }}
                </td>
              </tr>
              <tr>
                <td class="enterprise-business-table1">填报说明</td>
                <td class="enterprise-business-table2" colspan="7">
                  {{ tableData.description }}
                </td>
              </tr>
            </table>
          </div>
          <div class="signMeg-box-head">
            <span class="signMeg-box-head-span">填报内容</span>
          </div>
          <div class="basic-information">
            <!-- <table
                    style="
              border: 1px solid #cfcfcf;
              margin-top: 18px;
              width: 100%;
              margin: auto;
            "
            >
              <tr style="margin: 0px; padding: 0px">
                <td class="enterprise-business-table3">单位详情名称 _</td>
                <td class="enterprise-business-table4">统一社会信用代码</td>
              </tr>
              <tr style="margin: 0px; padding: 0px">
                <td class="enterprise-business-table3">
                  法定代表人（单位负责人） _
                </td>
                <td class="enterprise-business-table4">联系电话（含区号）__</td>
              </tr>
              <tr style="margin: 0px; padding: 0px">
                <td class="enterprise-business-table3">单位所在地 __</td>
                <td class="enterprise-business-table4" rowspan="2">区划代码&nbsp;&nbsp;□□□□□□</td>
              </tr>
              <tr style="margin: 0px; padding: 0px">
                <td class="enterprise-business-table3">
                  市 县（区，市）__
                </td>
              </tr>
              <tr style="margin: 0px; padding: 0px">
                <td class="enterprise-business-table3">网址 _</td>
                <td class="enterprise-business-table4">邮编代码&nbsp;&nbsp;□□□□□□</td>
              </tr>
              <tr style="margin: 0px; padding: 0px">
                <td class="enterprise-business-table3" colspan="2">
                  请于下列各选项后□中打勾"√"
                </td>
              </tr>
              <tr style="margin: 0px; padding: 0px">
                <td class="enterprise-business-table3">是否有出口业务
                  <el-radio v-model="radio1" label="1">①.是
                    <span class="selecte-radio" :class="radio1 === '1' ? 'selecte-radio-active': ''">
                      <i v-if="radio1 === '1' " class="el-icon-check"></i>
                    </span>
                  </el-radio>
                  <el-radio v-model="radio1" label="2">②.否
                    <span class="selecte-radio" :class="radio1 === '2' ? 'selecte-radio-active': ''">
                      <i v-if="radio1 === '2' " class="el-icon-check"></i>
                    </span>
                  </el-radio>
                </td>
                <td class="enterprise-business-table4">是否为上市公司
                  <el-radio v-model="radio" label="1">①.是
                    <span class="selecte-radio" :class="radio === '1' ? 'selecte-radio-active': ''">
                      <i v-if="radio === '1' " class="el-icon-check"></i>
                    </span>
                  </el-radio>
                  <el-radio v-model="radio" label="2">②.否
                    <span class="selecte-radio" :class="radio === '2' ? 'selecte-radio-active': ''">
                      <i v-if="radio === '2' " class="el-icon-check"></i>
                    </span>
                  </el-radio>
                </td>
              </tr>
              <tr style="margin: 0px; padding: 0px">
                <td class="enterprise-business-table3" colspan="2">登记注册类型</td>
              </tr>
              <tr style="margin: 0px; padding: 0px">
                <td class="enterprise-business-table3">是否为国有控股企业</td>
                <td class="enterprise-business-table4">单位规模</td>
              </tr>
              <tr style="margin: 0px; padding: 0px">
                <td class="enterprise-business-table3" colspan="2" style="height: 200px;"></td>
              </tr>
            </table> -->
            <table class="tblr show-form-tblr" id="addReportForm">
              <tr
                style="margin: 0px; padding: 0px"
                v-for="(itme, index) in tableData.contentJson"
              >
                <td
                  class="enterprise-business-table3"
                  colspan="3"
                  style="line-height: 38px"
                >
                  {{ itme.name }}
                  <el-button
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
      </el-col>
    </el-row>
  </div>
</template>

<script src="../../../js/directCar/makeReport/ShowForm">
</script>

<style>
.enterprise-business-table5 {
  width: 9.3%;
  background: #f5f8ff;
}
.enterprise-business-table6 {
  width: 12%;
  text-align: left;
  padding-left: 20px;
}
.selectedname {
  margin-left: 18px;
}
.selectedInput {
  width: 10px;
  height: 10px;
  border: 1px solid #000;
  display: inline-block;
}
.selectedInput.active {
  background: url("https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1262052542,2936163283&fm=26&gp=0.jpg");
  background-size: cover;
}
/*table td{border: 1px solid #ACC8E9;}*/

.basic-information .el-radio__input {
  display: none;
}
.selecte-radio {
  width: 14px;
  height: 14px;
  border: 1px solid #000;
  display: inline-block;
}
.selecte-radio-active {
  color: #409eff;
  border: 1px solid #409eff;
}
.show-form-tblr {
  border: 1px solid #acc8e9;
  margin-top: 18px;
  width: 100%;
  margin: auto;
}
.show-form-tblr tr td {
  text-align: left !important;
}
</style>