<template>
  <el-row>
    <el-col>
      <div style="margin-top: -39px; margin-bottom: 10px">
        <!-- <el-input
          style="
            width: 300px;
            position: absolute;
            right: 50px;
            border: #44aeff solid 1px;
          "
          placeholder="如：工业增加值"
          v-model="industrialAddedValue"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input> -->
      </div>
    </el-col>
    <el-col>
      <div style="width: 1442px; margin: auto; margin-top: 14px">
        <div style="background: #ffffff; margin-bottom: 20px; padding-left: 7%">
          <div>
            <el-form
              :inline="true"
              :model="basicDatabase.basicDatabaseValue"
              ref="basicDatabaseValue"
              class="demo-form-inline select-from"
              style="height: 110px"
            >
              <el-form-item label="一级目录:" prop="directoryOne">
                <el-select
                  v-model="basicDatabase.basicDatabaseValue.directoryOne"
                  size="mini"
                  style="width: 170px"
                >
                  <el-option
                    v-for="item in basicDatabase.basicOption[0]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="二级目录:" prop="threeId">
                <el-select
                  v-model="basicDatabase.basicDatabaseValue.twoId"
                  size="mini"
                  style="width: 170px"
                  @change="
                    selectNativeThree(basicDatabase.basicDatabaseValue.twoId)
                  "
                >
                  <el-option
                    v-for="item in basicDatabase.basicOption[1]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="三级目录:" prop="threeId">
                <el-select
                  v-model="basicDatabase.basicDatabaseValue.threeId"
                  size="mini"
                  style="width: 170px"
                  @change="
                    selectNativeFour(basicDatabase.basicDatabaseValue.threeId)
                  "
                >
                  <el-option
                    v-for="item in basicDatabase.basicOption[2][
                      basicDatabase.basicOptionThreeId
                    ]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="四级目录:" prop="fourId">
                <el-select
                  v-model="basicDatabase.basicDatabaseValue.fourId"
                  size="mini"
                  style="width: 170px"
                >
                  <el-option
                    v-for="item in basicDatabase.basicOption[3]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="数据项名称:" prop="dataItemName">
                <el-input
                  v-model="basicDatabase.basicDatabaseValue.dataItemName"
                  size="mini"
                  style="width: 170px"
                ></el-input>
              </el-form-item>
              <el-form-item label="数据类型:" prop="dataType">
                <el-select
                  v-model="basicDatabase.basicDatabaseValue.dataType"
                  size="mini"
                  style="width: 170px"
                >
                  <el-option
                    v-for="item in basicDatabase.basicOption[4]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="数据来源:" prop="dataSource">
                <el-select
                  v-model="basicDatabase.basicDatabaseValue.dataSource"
                  size="mini"
                  style="width: 170px"
                >
                  <el-option
                    v-for="item in basicDatabase.basicOption[5]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="数据频度:" prop="fre">
                <el-select
                  v-model="basicDatabase.basicDatabaseValue.fre"
                  size="mini"
                  style="width: 170px"
                >
                  <el-option
                    v-for="item in basicDatabase.basicOption[6]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="数据地区:" prop="area">
                <el-select
                  v-model="basicDatabase.basicDatabaseValue.area"
                  size="mini"
                  style="width: 170px"
                >
                  <el-option
                    v-for="item in basicDatabase.basicOption[7]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div style="text-align: center">
          <button class="data-inquire-button" @click="handleSelect()">
            查询
          </button>
          <button
            class="data-inquire-button"
            @click="resetForm('basicDatabaseValue')"
          >
            重置
          </button>
        </div>
      </div>
    </el-col>
    <el-col>
      <div
        style="
          width: 1442px;
          margin: auto;
          text-align: center;
          background: #fff;
          padding: 20px 0px;
        "
      >
        <div class="data-Directory-Query" style="">
          <el-table :data="tableDirectoryData" border>
            <el-table-column
              label="序号"
              type="index"
              width="60"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="" label="一级目录" align="center">
              <template slot-scope="scope">
                基础数据
              </template></el-table-column
            >
            <el-table-column prop="twoName" label="二级目录" align="center">
            </el-table-column>
            <el-table-column prop="threeName" label="三级目录" align="center">
            </el-table-column>
            <el-table-column prop="fourName" label="四级目录" align="center">
            </el-table-column>
            <el-table-column prop="dataItem" label="数据项名称" align="center">
            </el-table-column>
            <el-table-column prop="dataType" label="数据类型" align="center">
            </el-table-column>
            <el-table-column prop="dataSource" label="数据来源" align="center">
            </el-table-column>
            <el-table-column prop="frequency" label="数据频度" align="center">
              <template slot-scope="{ row }">
                <div v-if="row.frequency === 0">全部</div>
                <div v-if="row.frequency === 1">月度</div>
                <div v-if="row.frequency === 2">季度</div>
                <div v-if="row.frequency === 3">年度</div>
              </template>
            </el-table-column>
            <el-table-column prop="area" label="数据地区" align="center">
              <template slot-scope="{ row }">
                <div v-if="row.area === 0">全部</div>
                <div v-if="row.area === 1">地州</div>
                <div v-if="row.area === 2">分省</div>
                <div v-if="row.area === 3">全国</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div
          style="
            width: 100%;
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
      </div>
    </el-col>
  </el-row>
</template>

<script src="../../../js/industrialData/bigData/DataDirectoryQuery.js"/>

<style scoped>
/deep/ .el-input__inner {
  height: 30px;
}
.select-from .el-form-item {
  margin-bottom: 0px;
  margin-top: 10px !important;
}

.data-inquire-button {
  width: 100px;
  line-height: 30px;
  font-size: 16px;
  letter-spacing: 4px;
  font-weight: 400;
  background: #ffffff;
  margin-bottom: 10px;
  margin-right: 50px;
  border: #707070 solid 1px;
  border-radius: 5px;
}
.data-inquire-button:hover {
  background: #0265ba;
  color: #ffffff;
  border: #0c6bbc solid 0px;
}
.data-Directory-Query {
  width: 96%;
  text-align: center;
  background: #ffffff;
  margin: 20px auto;
}

/deep/ .data-Directory-Query .el-table thead {
  color: #000 !important;
}
/deep/
  .data-Directory-Query
  .el-table--enable-row-hover
  .el-table__body
  tr:hover
  > td {
  background-color: #ddd;
}
</style>