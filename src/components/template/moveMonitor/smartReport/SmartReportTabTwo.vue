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
            v-model="basicDatabaseValue.dataItemName"
            size="mini"
            style="width: 170px"
          ></el-input>
        </el-form-item>
        <el-form-item label="报告期别:" prop="reportType">
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
        <el-form-item label="责任机构:" prop="responsibilityInstitutions">
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
          <el-button type="primary" size="mini" @click="queryClick(1, 10)"
            >查询</el-button
          >
          <el-button size="mini" @click="resetForm">重置</el-button>
          <el-button size="mini" icon="el-icon-plus" @click="addReports(0)"
            >新增报告</el-button
          >
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
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="{ row }">
            <div v-if="row.state === 0">未发布</div>
            <div v-if="row.state === 1">已发布</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.state === 0"
              @click="editingReports(scope.row)"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button 
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.state === 1"
              >查看</el-button
            >
            <el-button
              v-if="scope.row.state === 0"
              type="text"
              size="small"
              @click="reportRelease(scope.row)"
              >发布</el-button
            >
            <el-button
              v-if="scope.row.state === 1"
              type="text"
              size="small"
              @click="reportRelease(scope.row)"
              >取消发布</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="deleteReport(scope.row)"
              :disabled="scope.row.state === 1 ? true : false"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="width: 95%; margin: auto; text-align: center">
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
      </div>
    </div>
  </div>
</template>

<script src="../../../js/moveMonitor/smartReport/SmartReportTabTwo.js">
</script>

<style>
.smart-report-form {
  height: 60px;
}
</style>