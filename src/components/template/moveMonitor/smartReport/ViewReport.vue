<template>
  <el-row>
    <el-col>
      <div class="view-reports">
        <div style="width: 100%">
          <div class="signMeg-box-head">
            <span class="signMeg-box-head-span">基本信息</span>
          </div>
          <div class="basic-information">
            <table class="basic-information-table1">
              <tr style="margin: 0px; padding: 0px">
                <td class="enterprise-business-table1">报告编号</td>
                <td class="enterprise-business-table2">
                  {{ tableData.reportId }}
                </td>
                <td class="enterprise-business-table1">报告名称</td>
                <td class="enterprise-business-table2">
                  {{ tableData.reportName }}
                </td>
                <td class="enterprise-business-table1">报告期别</td>
                <td class="enterprise-business-table2">
                  <template>
                    <div v-if="tableData.reportType === 0">一次</div>
                    <div v-if="tableData.reportType === 1">月报</div>
                    <div v-if="tableData.reportType === 2">季报</div>
                    <div v-if="tableData.reportType === 3">年报</div>
                  </template>
                </td>
              </tr>
              <tr style="margin: 0px; padding: 0px">
                <td class="enterprise-business-table1">责任机构</td>
                <td class="enterprise-business-table2">
                  {{ tableData.agencyName }}
                </td>
                <td class="enterprise-business-table1">报告日期</td>
                <td class="enterprise-business-table2">
                  {{ tableData.reportDate }}
                </td>
              </tr>
              <tr style="margin: 0px;  padding: 0px">
                <td class="enterprise-business-table1">可见性部门</td>
                <td class="enterprise-business-table2" colspan="5">
                  <el-checkbox-group v-model="tableData.visibilityDep">
                    <el-checkbox
                      v-for="(item, index) in queryAgencyData"
                      :label="item.id"
                      :key="item.id"
                      disabled
                      >{{ item.name }}</el-checkbox
                    >
                  </el-checkbox-group>
                </td>
              </tr>
              <tr style="margin: 0px; padding: 0px">
                <td class="enterprise-business-table1">报告说明</td>
                <td class="enterprise-business-table2" colspan="5">
                  {{ tableData.reportRemark }}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <!--  -->
        <div style="width: 100%">
          <div class="signMeg-box-head">
            <span class="signMeg-box-head-span">报告详情</span>
          </div>
          <div class="basic-information">
            <div v-html="tableData.reportContent"></div>
          </div>
        </div>
        <div style="width: 100%">
          <div class="signMeg-box-head">
            <span class="signMeg-box-head-span">附件</span>
          </div>
          <div class="basic-information">
            <div class="attachment-download">
              <p class="attachment-name">
                {{ tableData.reportAttachmentName }}
              </p>
              <!-- reportAttachmentUrl -->
              <el-button
                class="attachment-button"
                type="primary"
                size="mini"
                @click="attachmentDownload"
                >附件下载</el-button
              >
            </div>
          </div>
        </div>
        <div class="view-reports">
          <div class="reports-buttom-one">
            <el-button @click="cancelSubmit"
              >返 &nbsp;&nbsp;&nbsp; 回</el-button
            >
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script src="../../../js/moveMonitor/smartReport/ViewReport.js">
</script>

<style>
.view-reports {
  margin: auto;
  width: 1280px;
}
.view-reports .signMeg-box-head {
  width: 100%;
}
.basic-information {
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
  /*margin-top: 27px;*/
  margin-bottom: 22px;
  padding: 17px 30px;
}
.basic-information-table1 {
  border: 1px solid #cfcfcf;
  margin-top: 18px;
  width: 100%;
  margin: auto;
}
table {
  border-spacing: 0px;
  font-size: 14px;
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
/*  */
.attachment-download {
  width: 100%;
  display: flex;
}
.attachment-name {
  min-width: 300px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: solid 1px #cccccc;
  background: #d7d7d7;
  margin: 0px 48px 0px 0px;
}
.attachment-button {
  height: 40px !important;
  width: 100px !important;
}
</style>1