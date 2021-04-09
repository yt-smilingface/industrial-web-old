<template>
  <el-row>
    <el-col>
      <div style="width: 100%">
        <div class="signMeg-box-head">
          <span class="signMeg-box-head-span">基本信息</span>
        </div>
        <div class="basic-information">
          <table class="fill-Audit-Details-table1">
            <tr style="margin: 0px; padding: 0px">
              <td class="Fill-Audit-Details1">报表编号</td>
              <td class="Fill-Audit-Details2">
                {{ tableData.fillNum }}
              </td>
              <td class="Fill-Audit-Details1">报表名称</td>
              <td class="Fill-Audit-Details2">
                {{ tableData.fillName }}
              </td>
              <td class="Fill-Audit-Details1">上报企业</td>
              <td class="Fill-Audit-Details2">
                {{ tableData.fillRelatedVo.companyName }}
              </td>
            </tr>
            <tr style="margin: 0px; padding: 0px">
              <td class="Fill-Audit-Details1">填报期别</td>
              <td class="Fill-Audit-Details2">
                <div v-if="tableData.fillType === 0">月报</div>
                <div v-if="tableData.fillType === 1">季报</div>
                <div v-if="tableData.fillType === 2">年报</div>
                <div v-if="tableData.fillType === 3">一次</div>
              </td>
              <td class="Fill-Audit-Details1">本次填报期次</td>
              <td class="Fill-Audit-Details2">
                <div>{{tableData.fillPeriod}}</div>
               
              </td>
              <td class="Fill-Audit-Details1">上报时间</td>
              <td class="Fill-Audit-Details2">
                {{ tableData.fillRelatedVo.submitTime }}
              </td>
            </tr>
          </table>
        </div>
        <div class="signMeg-box-head">
          <span class="signMeg-box-head-span">填报内容</span>
        </div>
        <div class="basic-information">
          <table class="fill-Audit-Details-table2" id="addReportForm">
            <tr
              style="margin: 0px; padding: 0px"
              v-for="(itme, index) in tableData.fillRelatedVo.dynamicFill"
            >
              <td
                v-if="formIndex === '1'"
                class="enterprise-business-table3"
                colspan="3"
                style="line-height: 38px"
              >
                {{ itme.name }}：{{ itme.value }}
              </td>
              <td
                v-else
                class="enterprise-business-table3"
                colspan="3"
                style="line-height: 38px"
              >
                {{ itme.name }}：{{ itme.value }}
              </td>
            </tr>
          </table>
        </div>
        <div>
          <div class="signMeg-box-head">
            <span class="signMeg-box-head-span">审核信息</span>
          </div>
          <div class="signMeg-box-cont">
            <div>
              是否通过 ：
              <el-select
                :disabled="formIndex === '1' ? false : true"
                size="small"
                v-model="selectData.reviewStatus"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in isPassOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div style="dispaly: flex">
              <span style="width: 20%; line-height: 160px">审核意见 ：</span>
              <el-input
                :disabled="formIndex === '1' ? false : true"
                style="width: 80%"
                type="textarea"
                :rows="6"
                v-model="selectData.reviewOpinion"
              >
              </el-input>
            </div>
            <div style="text-align: center; margin-top: 28px">
              <el-button
                v-if="formIndex === '1'"
                type="primary"
                @click="submitAuditOpinion"
                style="width: 120px; margin-right: 40px"
                >提 交</el-button
              >
              <el-button @click="cancelAuditOpinion" style="width: 120px"
                >取 消</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script src="../../../js/directCar/makeReport/FillAuditDetails.js"/>

<style>
.basic-information {
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
  margin-top: 27px;
  margin-bottom: 22px;
  padding: 17px 30px;
}

/*基本信息*/
.enterprise-business-info {
  width: 100%;
  margin-bottom: 10px;
  margin-top: 15px;
}
table {
  border-spacing: 0px;
}
.basic-information table td {
  height: 38px;
  border: 1px solid #cfcfcf;
  text-align: center;
  font-size: 12px;
}
.Fill-Audit-Details1 {
  width: 10.3%;
  background: #f5f8ff;
}
.Fill-Audit-Details2 {
  width: 21%;
  text-align: left;
  padding-left: 20px;
}
.Fill-Audit-Details3 {
  width: 35.3%;
  background: #ffffff;
  text-align: left;
  padding-left: 20px;
}
.Fill-Audit-Details4 {
  width: 18%;
  text-align: left;
  padding-left: 20px;
}
.signMeg-box-cont {
  margin-top: 30px;
  background-color: #fff;
  box-shadow: 3px 3px 3px 3px #eee;
  padding: 10px 30px;
}
.fill-Audit-Details-table1,
.fill-Audit-Details-table2 {
  border: 1px solid #cfcfcf;
  margin-top: 18px;
  width: 100%;
  margin: auto;
}
.fill-Audit-Details-table2 tr td {
  text-align: left;
}
</style>