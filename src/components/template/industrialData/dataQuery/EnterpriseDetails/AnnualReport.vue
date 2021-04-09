<template>
  <div class="Annual-Report">
    <div class="Annual-Report-title">
      {{ AnnualReportData.year }}年度报告详情
    </div>
    <div class="Annual-Report-table">
      <table class="Annual-Report-table2">
        <tr>
          <td class="Report-table-td1">资产总额</td>
          <td class="Report-table-td2">{{ AnnualReportData.assetsTotal }}</td>
          <td class="Report-table-td1">所有者权益合计</td>
          <td class="Report-table-td2">{{ AnnualReportData.equityTotal }}</td>
        </tr>
        <tr>
          <td class="Report-table-td1">主营业务收入</td>
          <td class="Report-table-td2">
            {{ AnnualReportData.mainBusinessIncome }}
          </td>
          <td class="Report-table-td1">负债总额</td>
          <td class="Report-table-td2">
            {{ AnnualReportData.liabilitiesTotal }}
          </td>
        </tr>
        <tr>
          <td class="Report-table-td1">营业总收入</td>
          <td class="Report-table-td2">
            {{ AnnualReportData.totalBusinessIncome }}
          </td>
          <td class="Report-table-td1">利润总额</td>
          <td class="Report-table-td2">{{ AnnualReportData.profitTotal }}</td>
        </tr>
        <tr>
          <td class="Report-table-td1">纳税总额</td>
          <td class="Report-table-td2">{{ AnnualReportData.taxTotal }}</td>
          <td class="Report-table-td1">净利润</td>
          <td class="Report-table-td2">{{ AnnualReportData.profitNet }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script src="../../../../js/industrialData/dataQuery/EnterpriseDetails/AnnualReport">
</script>

<style>
.Annual-Report {
  width: 980px;
  min-height: 500px;
  margin: auto;
  background: #ffffff;
}
.Annual-Report-title {
  width: 100%;
  margin: 30px auto 10px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 50px;
}
.Annual-Report-table {
  width: 80%;
  margin: auto;
  padding-bottom: 13px;
}
.Annual-Report-table2 {
  border: 1px solid #cfcfcf;
  margin-bottom: 20px;
}
.Annual-Report-table2 td {
  line-height: 45px;
  font-size: 17px;
}
.Report-table-td1 {
  width: 10%;
  background: #f5f8ff;
  border: 1px solid #cfcfcf;
  text-align: center;
}
.Report-table-td2 {
  width: 20%;
  border: 1px solid #cfcfcf;
  padding-left: 22px;
}
</style>