<template>
  <div class="showListBox">
    <el-input
      placeholder="请输入内容"
      v-model="inputInfo"
      class="input-with-select"
      size="mini"
    >
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>

    <div class="showListBox-right-head">
      <div class="showListBox-icon-button">
        <button
          v-bind:class="switchButton ? 'chart-button2' : 'chart-button1'"
          @click="hideChart"
        ></button>
        <button class="download-button" @click="exportExcel"></button>
      </div>
      <ul class="datashowlist-dropdown">
        <el-dropdown
          trigger="click"
          v-for="(item, index) in menuInfo"
          :key="index"
        >
          <li
            :class="isActive == index ? 'active' : ''"
            @click="handleActive(index)"
          >
            {{ item }} <i class="el-icon-caret-bottom"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="getLeftDataBySelect(index, 2)"
                >年度数据</el-dropdown-item
              >
              <el-dropdown-item @click.native="getLeftDataBySelect(index, 1)"
                >季度数据</el-dropdown-item
              >
              <el-dropdown-item @click.native="getLeftDataBySelect(index, 0)"
                >月度数据</el-dropdown-item
              >
            </el-dropdown-menu>
          </li>
        </el-dropdown>
      </ul>
    </div>
    <div class="cont-showListBox">
      <div class="showListBox-left">
        <!--        <LeftMenu />-->
        <div style="width: 100%">
          <div class="menuClass">
            <div v-for="(itemOne, index) of menuTitle.data">
              <div class="ul-title" @click="changeMenuStatus(itemOne)">
                <div class="textTyle">{{ itemOne.name }}</div>
              </div>
              <div v-if="itemOne.status === 1">
                <div v-for="(itemTwo, index2) of itemOne.childMenu">
                  <div
                    class="levelTwoClass111"
                    @click="changeMenuStatus(itemTwo)"
                  >
                    <div
                      style="
                        height: 100%;
                        display: flex;
                        align-items: center;
                        margin-right: 10px;
                      "
                    >
                      <i
                        v-if="itemTwo.status === 1"
                        class="el-icon-caret-bottom"
                        style="color: #c4c4c4; font-size: 24px"
                      ></i>
                      <i
                        v-else
                        class="el-icon-caret-right"
                        style="color: #c4c4c4; font-size: 24px"
                      ></i>
                    </div>
                    <span class="textTyle">{{ itemTwo.name }}</span>
                  </div>
                  <div v-if="itemTwo.status === 1">
                    <div v-for="(itemThree, index3) of itemTwo.childrens">
                      <div
                        class="levelTwoClass111"
                        @click="changeMenuStatus(itemThree)"
                        style="margin-left: 4px"
                      >
                        <div
                          style="
                            height: 100%;
                            display: flex;
                            align-items: center;
                            margin-right: 10px;
                          "
                        >
                          <i
                            v-if="itemThree.status === 1"
                            class="el-icon-caret-bottom"
                            style="color: #c4c4c4; font-size: 24px"
                          ></i>
                          <i
                            v-else
                            class="el-icon-caret-right"
                            style="color: #c4c4c4; font-size: 24px"
                          ></i>
                        </div>
                        <span class="textTyle">{{ itemThree.name }}</span>
                      </div>
                      <div v-if="itemThree.status === 1">
                        <div
                          v-for="itemFour of itemThree.childrens"
                          style="margin-left: 18px"
                        >
                          <div
                            v-if="itemFour.status === 1"
                            class="levelThreeClassChoose111"
                            @click="changeMenuStatus(itemFour, 4)"
                          >
                            <div class="textTyle">
                              <i
                                class="el-icon-circle-check"
                                style="
                                  color: white;
                                  font-size: 16px;
                                  line-height: 28px;
                                "
                              ></i>
                              {{ itemFour.name }}
                            </div>
                          </div>
                          <div
                            v-else
                            class="levelThreeClass111"
                            @click="changeMenuStatus(itemFour, 4)"
                          >
                            <div class="textTyle">{{ itemFour.name }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="showListBox-right">
        <div>
          <div class="showListBox-right-cont" v-if="switchButton">
            <div class="cont-select">
              <el-select
                v-model="chartSwitchingData"
                size="mini"
                @change="chartSwitchingClike"
              >
                <el-option
                  v-for="item in chartSwitching"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <ECharts
              style="width: 100%; min-height: 450px; margin-top: 20px"
              :options="dataInfo.echartsData"
            >
            </ECharts>
          </div>
          <!--指标-->
          <div v-if="!switchButton" style="margin-top: 8px">
            <el-form
              :inline="true"
              :model="menuTitleId"
              class="demo-form-inline"
            >
              <el-form-item label="时间:">
                <el-select
                  v-model="menuTitleId.timeNum"
                  size="mini"
                  @change="datequotaFun()"
                >
                  <el-option
                    v-for="item in timeNumOptions[menuTitleId.fre - 1]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="地区:"
                v-if="menuTitleId.area === 1 || menuTitleId.area === 3"
              >
                <el-select
                  v-model="menuTitleId.areaCode"
                  size="mini"
                  v-if="menuTitleId.area === 1"
                  @change="datequotaFun()"
                >
                  <el-option
                    v-for="item in areaCodeOptions"
                    :key="item.id"
                    :label="item.city"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
                <el-select
                  v-model="menuTitleId.areaCode"
                  size="mini"
                  v-if="menuTitleId.area === 3"
                  @change="datequotaFun()"
                >
                  <el-option
                    v-for="item in areaCodeOptions"
                    :key="item.id"
                    :label="item.province"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <!--          表格数据-->
          <div class="showListBox-right-table">
            <el-table
              ref="multipleTable"
              :data="tableData"
              stripe
              style="width: 100%"
              border
              @selection-change="handleSelectionChange"
              id="out-table"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column
                sortable
                :key="index"
                :label="item"
                v-for="(item, index) in tableDataTitle"
                min-width="260"
                align="center"
              >
                <el-table-column :prop="item" min-width="260" align="center">
                  <template slot="header" slot-scope="scope">
                    <el-checkbox
                      v-model="checkedList[index]"
                      :key="index"
                      @change="handleSelectionChange(multipleSelection)"
                    ></el-checkbox>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../../../../js/industrialData/dataQuery/statisticsInquire/DataShowList.js">
</script>

<style scoped>
.cont-showListBox {
  display: flex;
}
.showListBox-left {
  width: 20%;
  height: 940px;
  margin-top: 27px;
}
.showListBox .input-with-select {
  width: 250px;
  height: 28px;
  position: absolute;
  right: 100px;
  top: 111px;
}
.input-with-select .el-input__inner {
  width: 250px;
  height: 28px;
}
.showListBox-right {
  margin-left: 40px;
  width: 80%;
}
.showListBox-right-head {
  margin-top: 25px;
  width: 100%;
  height: 50px;
  background: linear-gradient(to right, #2894d5, #fff);
}
.showListBox-icon-button {
  position: absolute;
  top: 178px;
  right: 14px;
}
.showListBox-icon-button button {
  border: 0px;
  height: 17px;
  width: 17px;
  margin-right: 15px;
  background-color: rgba(255, 255, 255, 0);
}
.showListBox-icon-button button:focus {
  outline: -webkit-focus-ring-color auto 0px;
}
.datashowlist-dropdown :focus {
  outline: -webkit-focus-ring-color auto 0px;
}
.chart-button1 {
  background-image: url("../../../../../assets/industrialData/dataQuery/chart.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.chart-button2 {
  background-image: url("../../../../../assets/industrialData/dataQuery/return.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.download-button {
  background-image: url("../../../../../assets/industrialData/dataQuery/download.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.showListBox-right-head ul li {
  float: left;
  list-style: none;
  line-height: 50px;
  padding: 0 20px;
  color: #fff;
  font-size: 16px;
}
.showListBox-right-head ul li:hover {
  cursor: pointer;
}
.showListBox-right-head ul li.active {
  background-color: #fff;
  color: #0265ba;
}
.showListBox-right-cont {
  width: 100%;
  min-height: 400px;
  background-color: #fff;
}
.showListBox-right-cont .cont-select {
  width: 100%;
  text-align: center;
  padding-top: 18px;
}

.el-table td,
.el-table tr,
.el-table th {
  text-align: center;
}
.el-table th .cell {
  display: flex;
  justify-content: center;
  align-self: center;
  line-height: 34px;
}

.el-table th .cell .el-checkshowListBox {
  margin: auto;
  text-align: center;
}

.showListBox-right-table {
  margin-top: 30px;
  width: 100%;
  showlistbox-shadow: 3px 3px 10px 3px #ccc;
}

/*  左侧导航栏*/
.menuClass {
  width: 100%;
  min-height: 597px;
  background: #ffffff;
  border: 0px solid #9ed0e5;
  opacity: 1;
  showlistbox-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
}

.levelOneClass {
  width: 100%;
  height: 35px;
  border: 1px solid #57c0ed;
  background: linear-gradient(360deg, #40a0d0 0%, #64b5e2 100%);
  opacity: 1;
  display: flex;
  cursor: pointer;
}
.levelOneClass .textTyle {
  color: #ffffff;
  text-align: right;
  margin: auto auto;
  font-size: 19px;
  cursor: pointer;
}
.levelTwoClass111 {
  width: 90%;
  height: 30px;
  background: linear-gradient(0deg, #ffffff 0%, #ffffff 0%);
  opacity: 1;
  font-family: PingFang SC;
  display: flex;
  cursor: pointer;
}
.levelTwoClass111 .textTyle {
  color: #066b95;
  text-align: center;
  height: 100%;
  font-family: PingFang SC;
  font-size: 14px;
  line-height: 30px;
  height: 30px;
  cursor: pointer;
}
.levelThreeClass111 {
  width: 100%;
  height: 38px;
  opacity: 1;
  display: flex;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.levelThreeClass111 .textTyle {
  font-size: 15px;
  font-family: PingFang SC;
  color: #006699;
  opacity: 1;
  margin: auto auto auto 10px;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.levelThreeClassChoose111 {
  width: 100%;
  height: 28px;
  opacity: 1;
  display: flex;
  cursor: pointer;
  background: linear-gradient(
    90deg,
    #0265ba 0%,
    rgba(255, 255, 255, 0.28) 100%
  );
  text-overflow: ellipsis;
  white-space: nowrap;
}
.levelThreeClassChoose111 .textTyle {
  font-size: 15px;
  font-family: PingFang SC;
  color: #ffffff;
  opacity: 1;
  margin: auto auto auto 2px;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.showListBox-right-table .el-table td,
.el-table th {
  padding: 8px 0 !important;
}
</style>