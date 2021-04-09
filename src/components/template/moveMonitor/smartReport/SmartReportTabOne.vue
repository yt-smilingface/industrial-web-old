<template>
  <div>
    <div>
      <el-form
        :inline="true"
        :model="basicDatabaseValue"
        ref="basicDatabaseValue"
        class="smart-report-form"
      >
        <el-form-item label="报告名称:" prop="directoryFives">
          <el-input
            v-model="basicDatabaseValue.reportName"
            size="mini"
            style="width: 170px"
          ></el-input>
        </el-form-item>
        <el-form-item label="报告期别:" prop="directoryOne">
          <el-select
            v-model="basicDatabaseValue.reportType"
            size="mini"
            style="width: 170px"
          >
            <el-option
              v-for="item in basicOption0"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="责任机构:" prop="twoId">
          <el-select
            v-model="basicDatabaseValue.responsibilityInstitutions"
            size="mini"
            style="width: 170px"
          >
            <el-option
              v-for="item in organListOption"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="queryClick"
            >查询</el-button
          >
          <el-button size="mini" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="reportId" label="报告编号" align="center">
        </el-table-column>
        <el-table-column prop="reportName" label="报告名称" align="center">
        </el-table-column>
        <el-table-column prop="reportType" label="报告期别" align="center">
          <template slot-scope="{ row }">
            <div v-if="row.reportType === 0">一次</div>
            <div v-if="row.reportType === 1">月报</div>
            <div v-if="row.reportType === 2">季报</div>
            <div v-if="row.reportType === 3">年报</div>
          </template>
        </el-table-column>
        <el-table-column prop="agencyName" label="责任机构" align="center">
        </el-table-column>
        <el-table-column prop="reportDate" label="报告日期" align="center">
        </el-table-column>
        <el-table-column prop="isRead" label="状态" align="center">
          <template slot-scope="{ row }">
            <div v-if="row.isRead === 0">
              未读<span class="unread-instructions">●</span>
            </div>
            <div v-if="row.isRead === 1">已读</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="attachmentDownload(scope.row)"
              >下载附件</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script src="../../../js/moveMonitor/smartReport/SmartReportTabOne.js">
</script>

<style>
.smart-report-form {
  height: 60px;
}
.unread-instructions {
  color: red;
  vertical-align: text-top;
  vertical-align: super;
  font-size: 22px;
}
</style>