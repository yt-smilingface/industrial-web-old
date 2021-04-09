<template>
  <div class="signMeg-box">
    <div>
      <div class="signMeg-box-head">
        <span class="signMeg-box-head-span">常规填报表单</span>
      </div>
      <div class="reportbox-right-bottom">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="60">
          </el-table-column>
          <el-table-column prop="a" label="表单编号"> </el-table-column>
          <el-table-column prop="b" label="表名称"> </el-table-column>
          <el-table-column prop="c" label="责任机构"> </el-table-column>
          <el-table-column prop="d" label="填报期别"> </el-table-column>
          <el-table-column prop="e" label="填报范围"> </el-table-column>
          <el-table-column prop="f" label="填报日期"> </el-table-column>
          <el-table-column prop="g" label="开始日期"> </el-table-column>
          <el-table-column prop="h" label="截止日期"> </el-table-column>
          <el-table-column prop="i" label="状态"> </el-table-column>
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
        <el-button
          size="mini"
          class="signMeg-box-head-btn"
          icon="el-icon-edit"
          @click="saveFill"
          >新增专题表单</el-button
        >
      </div>
      <div class="reportbox-right-bottom">
        <el-table :data="tableDataTwo" border style="width: 100%">
          <el-table-column type="index" label="序号" width="60" align="center">
          </el-table-column>
          <el-table-column prop="fillNum" label="表单编号" align="center">
          </el-table-column>
          <el-table-column prop="fillName" label="表单名称" align="center">
          </el-table-column>
          <el-table-column prop="fillType" label="填报期别" align="center" width="80">
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
            label="报告日期"
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
          <el-table-column prop="isDead" label="状态" align="center" width="100">
            <template slot-scope="{ row }">
              <div v-if="row.isDead === 0">未生效</div>
              <div v-if="row.isDead === 1">已生效</div>
              <div v-if="row.isDead === 2">已失效</div>
              <div v-if="row.isDead === 3">已结束</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
              <el-button
                v-if="scope.row.isDead !== 3"
                type="text"
                size="small"
                :disabled="scope.row.isDead === 1 ? true : false"
                @click="modifyClick(scope.row)"
                >编辑</el-button
              >
              <el-button
                v-if="
                  scope.row.isDead === 0 &&
                  ((new Date(scope.row.cronTime) > new Date() &&
                    scope.row.fillType === 3) ||
                    (new Date(scope.row.endTime) > new Date() &&
                      scope.row.fillType !== 3))
                "
                type="text"
                size="small"
                @click="updateStatus(scope.row)"
                >生效</el-button
              >
              <el-button
                v-if="
                  scope.row.isDead === 1 &&
                  ((new Date(scope.row.cronTime) > new Date() &&
                    scope.row.fillType === 3) ||
                    (new Date(scope.row.endTime) > new Date() &&
                      scope.row.fillType !== 3))
                "
                type="text"
                size="small"
                @click="updateStatus(scope.row)"
                >置为失效</el-button
              >
              <el-button
                v-if="scope.row.isDead === 0 || scope.row.isDead === 2"
                type="text"
                size="small"
                @click="handleDel(scope.row.id)"
                >删除</el-button
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
</template>

<script src="../../../js/directCar/makeReport/signCard.js">
</script>

<style>
.signMeg-box {
  margin-left: 20px;
}
.signMeg-box-head {
  width: 94%;
  background: linear-gradient(
    90deg,
    #0265ba 1%,
    rgba(255, 255, 255, 0.12) 103%
  );
  height: 50px;
  justify-content: space-between;
  position: relative;
}
.signMeg-box-head-span {
  line-height: 50px;
  font-weight: 600;
  margin-left: 30px;
  color: aliceblue;
  font-size: 18px;
}
.signMeg-box-head-btn {
  position: absolute;
  right: 10px;
  top: 10px;
}
.reportbox-right-bottom {
  width: 90%;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 3px 3px 3px 3px #eee;
  padding: 10px 30px;
}
.Set-as-invalid {
  color: #ccc !important;
}
.signCard-fenye {
  width: 100%;
  margin: auto;
  text-align: center;
  margin-top: 18px;
}
</style>