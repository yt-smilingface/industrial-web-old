<template>
  <div>
    <div class="reportbox-right-top2">
      <div>
        <span class="reportbox-right-top-span reportbox-right-top-span2"
          >表名称：
          <el-input
            class="tableName-input"
            v-model="selectData.tableName"
            type="text"
            style="display: inline-block;width:160px;"
          />
        </span>
        <span class="reportbox-right-top-span reportbox-right-top-span2"
          >填报期别：
          <el-select
            v-model="selectData.fillType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in reportTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </span>
        <span class="reportbox-right-top-span reportbox-right-top-span2"
          >发放时间：
          <el-date-picker
            v-model="fileTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 360px;"
          >
          </el-date-picker>
        </span>
        <div class="Sian-And-Hand-button reportbox-right-top-span2" style="display: inline-block;vertical-align: top ">
          <el-button type="primary" style="width: 120px" @click="getProcessData()"
            >查询</el-button
          >
          <el-button plain style="width: 120px" @click="resetForm()"
            >重置</el-button
          >
        </div>
      </div>
    </div>
    <!-- {{ tableData }} -->
    <div class="reportbox-right-bottom">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" :index="table_index" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column prop="fillNum" label="表单编号" align="center">
        </el-table-column>
        <!-- <el-table-column prop="b" label="批次编号" align="center">
        </el-table-column> -->
        <el-table-column prop="fillName" label="表名称" align="center">
        </el-table-column>
        <el-table-column prop="fillType" label="填报期别" align="center">
          <template slot-scope="{ row }">
            <div v-if="row.fillType === 0">月报</div>
            <div v-if="row.fillType === 1">季报</div>
            <div v-if="row.fillType === 2">年报</div>
            <div v-if="row.fillType === 3">一次</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="fillPeriod"
          label="本次填报期次"
          width="150"
          align="center"
        >
          <!-- <template slot-scope="{ row }">
            <div v-if="row.fillType === 0">月报</div>
            <div v-if="row.fillType === 1">季报</div>
            <div v-if="row.fillType === 2">年报</div>
            <div v-if="row.fillType === 3">一次</div>
          </template> -->
        </el-table-column>
        <el-table-column
          prop="relatedGmtCreate"
          width="160"
          label="发放时间"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="sendNum" label="发放量" align="center">
        </el-table-column>
        <el-table-column prop="writeNum" label="填报量" align="center">
        </el-table-column>
        <el-table-column prop="i" label="填报率" align="center">
          <template slot-scope="{ row }">
            <div v-if="row.sendNum !== 0">
              {{((row.writeNum / row.sendNum) * 100).toFixed(2)}}%
            </div>
            <div v-else>{{ row.writeNum }}%</div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div
        style="width: 100%; margin: auto; text-align: center; margin-top: 18px"
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
    </div>
  </div>
</template>

<script src="../../../js/directCar/makeReport/signProgress">
</script>

<style>
.reportbox-right-top2 {
  min-height: 40px !important;
  width: calc(94% + 20px) !important;
  background-color: #fff;
  box-shadow: 3px 3px 3px 3px #eee;
  border-radius: 5px;
  padding: 10px 20px !important;
  margin-bottom: 20px !important;
}
.reportbox-right-top .reportbox-right-top-span {
  margin-right: 20px;
}
.reportbox-right-top-span {
  margin-right: 20px;
}
.reportbox-right-top-span2 {
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-block;
  vertical-align: top;
}
.tableName-input {
  display: inline;
  height: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
  line-height: 30px;
}
.reportbox-right-bottom {
  width: 94%;
  background-color: #fff;
  box-shadow: 3px 3px 3px 3px #eee;
  padding: 10px 30px;
}
</style>