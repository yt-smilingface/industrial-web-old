<template>
  <div>
    <div class="signMeg-box">
      <div>
        <div class="signMeg-box-head">
          <span class="signMeg-box-head-span">常规填报表单</span>
        </div>
        <div class="reportbox-right-bottom">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="labelNum" label="表单编号">
            </el-table-column>
            <el-table-column prop="labelName" label="表名称"> </el-table-column>
            <el-table-column prop="c" label="责任机构"> </el-table-column>
            <el-table-column prop="d" label="填报期别"> </el-table-column>
            <el-table-column prop="e" label="填报范围"> </el-table-column>
            <el-table-column prop="f" label="填报日期"> </el-table-column>
            <el-table-column prop="g" label="开始日期"> </el-table-column>
            <el-table-column prop="h" label="截止日期"> </el-table-column>
            <el-table-column prop="i" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.isDead">失效</span>
                <span v-if="!scope.row.isDead">生效</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="60">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <div class="signCard-fenye">
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

      <div style="margin-top: 50px">
        <div class="signMeg-box-head">
          <span class="signMeg-box-head-span">专题填报表单</span>
        </div>
        <div class="reportbox-right-bottom">
          <el-table :data="tableDataTwo" border style="width: 100%">
            <el-table-column type="index" label="序号" width="60" align="center">
            </el-table-column>
            <el-table-column
              prop="fillNum"
              label="表单编号"
              width="120"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="fillName" label="表单名称" align="center">
            </el-table-column>
            <el-table-column
              prop="mechanismName"
              label="责任机构"
              align="center"
            >
            </el-table-column>

            <el-table-column prop="fillType" label="填报期别" align="center">
              <template slot-scope="{ row }">
                <div v-if="row.fillType === 0">月报</div>
                <div v-if="row.fillType === 1">季报</div>
                <div v-if="row.fillType === 2">年报</div>
                <div v-if="row.fillType === 3">一次</div>
              </template>
            </el-table-column>
            <el-table-column prop="fillScope" label="填报范围" align="center">
            </el-table-column>
            <el-table-column
              prop="cronTime"
              label="填报日期"
              align="center"
              width="160"
            >
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="开始日期"
              align="center"
              width="160"
            >
            </el-table-column>
            <el-table-column
              prop="endTime"
              label="截止日期"
              align="center"
              width="160"
            >
            </el-table-column>
            <el-table-column prop="isDead" label="状态" align="center">
              <template slot-scope="{ row }">
                <div v-if="row.isDead === 0">未生效</div>
                <div v-if="row.isDead === 1">已生效</div>
                <div v-if="row.isDead === 2">已失效</div>
                <div v-if="row.isDead === 3">已结束</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120" align="center">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <div class="signCard-fenye">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="currentPage2"
              :page-sizes="pageSize"
              :page-size="cpage2"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total2"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../../../js/directCar/makeReport/signForm">
</script>

<style>
</style>