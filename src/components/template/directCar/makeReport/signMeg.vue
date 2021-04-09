<template>
  <div class="signMeg-box">
    <div class="signMeg-box-head">
      <span class="signMeg-box-head-span">企业标签管理</span>
      <el-button
        size="mini"
        class="signMeg-box-head-btn"
        icon="el-icon-edit"
        @click="newLabel"
        >新增标签</el-button
      >
    </div>

    <div class="reportbox-right-bottom">
      <el-table :data="tableData" border>
        <el-table-column type="index" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column
          prop="labelNum"
          label="标签编号"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="labelName" label="标签名称" align="center">
        </el-table-column>
        <el-table-column prop="mechanismName" label="责任机构" align="center">
        </el-table-column>
        <el-table-column prop="gmtCreate" label="创建时间" align="center">
        </el-table-column>
        <el-table-column prop="isDead" label="状态" align="center">
          <template slot-scope="{ row }">
            <div v-if="row.isDead === 0">未生效</div>
            <div v-if="row.isDead === 1">已生效</div>
            <div v-if="row.isDead === 2">已失效</div>
            <div v-if="row.isDead === 3">已结束</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="184">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="editLabel(scope.row)"
              :disabled="scope.row.isDead !== 0 ? true : false"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              v-if="scope.row.isDead == 0 || scope.row.isDead == 2"
              @click="updateLabelStatus2(scope.row)"
              >生效</el-button
            >
            <el-button
              type="text"
              size="small"
              v-if="scope.row.isDead === 1"
              style="color: #ccc !important"
              @click="updateLabelStatus2(scope.row)"
              >置为失效</el-button
            >
            <el-button
              type="text"
              size="small"
              style="color: #ccc !important"
              @click="updateLabelStatus(scope.row)"
              :disabled="
                (scope.row.isDead == 0 || scope.row.isDead == 2 )? false : true
              "
              >删除</el-button
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

<script src="../../../js/directCar/makeReport/signMeg">
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
</style>