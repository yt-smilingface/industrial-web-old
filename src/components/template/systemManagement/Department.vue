<template>
  <div class="department-ssss">
    <div class="department-ssss-top">
      <div class="">
        <span class="department-ssss-top-span"
          >机构名称：
          <input
            class="tableName-input"
            v-model="selectData.name"
            type="text"
            size="small"
          />
        </span>
        <span class="department-ssss-top-span"
          >机构类别：
          <el-select
            size="small"
            v-model="selectData.categoryId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </span>
        <span class="department-ssss-top-span"
          >分管领导：
          <el-select
            size="small"
            v-model="selectData.leaderId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in leaderNameList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="department-ssss-button">
        <el-button
          type="primary"
          size="small"
          style="width: 80px"
          @click="getProcessData()"
          >查询</el-button
        >
        <el-button plain size="small" style="width: 80px" @click="resetForm()"
          >重置</el-button
        >
        <el-button
          plain
          size="small"
          icon="el-icon-plus"
          @click="AddDepartment()"
          >新增机构</el-button
        >
      </div>
    </div>
    <div class="department-ssss-bottom">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" width="60" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="number" label="机构编号" align="center">
        </el-table-column>
        <el-table-column prop="categoryName" label="机构类别" align="center">
        </el-table-column>
        <el-table-column prop="name" label="机构名称" align="center">
        </el-table-column>
        <el-table-column prop="leader" label="分管领导" align="center">
        </el-table-column>
        <el-table-column label="操作" width="134" align="center">
          <template slot-scope="scope">
            <el-button @click="lookClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button @click="modifyClick(scope.row)" type="text" size="small"
              >修改</el-button
            >
            <el-button
              @click="deleteClick(scope.row)"
              type="text"
              size="small"
              class="delete-Click"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="department-ssss-fenye">
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

    <!--    审核详情-->
  </div>
</template>
 <script src='../../../components/js/systemManagement/Department.js' />


<style >
.department-ssss {
  width: 94%;
  margin: auto;
}
.department-ssss-top {
  height: 60px;
  background-color: #fff;
  box-shadow: 3px 3px 3px 3px #eee;
  border-radius: 5px;
  padding-top: 30px;
  padding-left: 60px;
  margin-bottom: 30px;
  display: flex;
}
.department-ssss-top .department-ssss-top-span {
  margin-right: 20px;
}
.department-ssss-top-span2 {
  float: left;
}
.tableName-input {
  display: inline;
  height: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
  line-height: 30px;
}
.department-ssss-bottom {
  /* width: 100%; */
  background-color: #fff;
  box-shadow: 3px 3px 3px 3px #eee;
  padding: 10px 30px;
}
.department-ssss-button {
  /* margin-top: 30px; */
  /* text-align: center; */
}
.department-ssss-fenye {
  width: 100%;
  margin: auto;
  text-align: center !important;
  margin-top: 18px;
}
.delete-Click {
  color: #ccc;
}
</style>