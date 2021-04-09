<template>
  <el-row>
    <el-col>
      <div
        style="
          width: 1080px;
          margin: auto;
          margin-top: 40px;
          height: 40px;
          display: flex;
          background: linear-gradient(
            rgba(240, 240, 240, 0.5),
            rgba(240, 240, 240, 0.5)
          );
        "
      >
        <div style="width: 50%">
          <p>相关结果约{{ statisticalData.length }}条</p>
        </div>
        <!-- <div style="width: 50%; margin-left: 30%; margin-top: 5px">
          <span>筛选栏目：</span>
          <el-select v-model="value" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button type="primary" size="small">刷新</el-button>
        </div> -->
      </div>
      <div class="tongjiSelect">
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.2)"
          :data="statisticalData"
          :header-cell-style="{ color: '#000000' }"
          style="color: #000000"
        >
          <el-table-column
            prop="dataItem"
            label="指标"
            align="center"
            width="300"
          >
          </el-table-column>
          <el-table-column prop="areaName" label="地区" align="center">
          </el-table-column>
          <el-table-column prop="dateTime" label="数据时间" align="center">
          </el-table-column>
          <el-table-column prop="dataValues" label="数值" align="center">
          </el-table-column>
          <el-table-column
            prop="dataDescription"
            label="所属栏目"
            align="center"
          >
          </el-table-column>
          <el-table-column label="相关报表" align="center">
            <template slot-scope="scope">
              <el-button
                @click="relatedReports(scope.row)"
                type="text"
                size="small"
                >相关报表</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        style="
          width: 1080px;
          margin: auto;
          text-align: center;
          margin-top: 18px;
        "
      >
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
    </el-col>
  </el-row>
</template>
<script src="../../../../js/industrialData/dataQuery/statisticsInquire/SimpleQuery.js"/>

<style scoped>
.tongjiSelect {
  width: 1080px;
  margin: auto;
  text-align: center;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
}
</style>