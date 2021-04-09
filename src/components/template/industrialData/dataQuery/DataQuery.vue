<template>
  <el-row>
    <el-col>
      <div class="data-query-one" style="">
        <div class="data-query-title">
          <h2>云南省工业大数据中心</h2>
        </div>
        <div class="data-query-Options">
          <button
            class="query-Options-span1"
            :style="
              toggleButton === 0 ? 'background: #259ed7;color: #ffffff;' : ''
            "
            @click="toggleButton = 0"
          >
            企业数据
          </button>
          <button
            class="query-Options-span1"
            :style="
              toggleButton === 1 ? 'background: #259ed7;color: #ffffff;' : ''
            "
            @click="toggleButton = 1"
          >
            统计数据
          </button>
        </div>
        <!--        企业数据-->
        <div v-if="toggleButton === 0">
          <div class="data-query-search">
            <el-input
              placeholder="请输入关键字"
              v-model="dataQuerySearch"
              class="dataQuery-input-with-select"
            >
              <el-select
                v-model="enterpriseSelect"
                slot="prepend"
                style="width: 128px"
              >
                <el-option label="企业名称" :value="2"></el-option>
                <el-option label="法定代表人" :value="3"></el-option>
                <el-option label="股东" :value="4"></el-option>
                <el-option label="董监高" :value="5"></el-option>
                <el-option label="注册地址" :value="6"></el-option>
                <el-option label="产权" :value="7"></el-option>
                <el-option label="综合" :value="1"></el-option>
              </el-select>
              <el-button
                class="search-button"
                slot="append"
                @click="generalQuery"
                >查询</el-button
              >
            </el-input>
            <div style="margin-left: 5px">
              <button class="advanced-search" @click="advancedSearch">
                高级查询
              </button>
            </div>
          </div>
          <div class="data-query-list">
            <span>企业名称：</span>
            <span
              v-for="(item, index) in searchForData.enterpriseData"
              @click="searchWord(item)"
              :key="index"
              >{{ item }}</span
            >
          </div>
        </div>
        <!--   统计数据     -->
        <div v-if="toggleButton === 1">
          <div class="data-query-search">
            <el-input
              placeholder="请输入关键字"
              v-model="dataQuerySearch1"
              class="dataQuery-input-with-select"
            >
              <el-button
                class="search-button"
                slot="append"
                @click="statisticsInquire"
                >查询</el-button
              >
            </el-input>
            <div style="margin-left: 5px">
              <button
                class="advanced-search"
                @click="statisticsAdvancedInquire"
              >
                高级查询
              </button>
            </div>
          </div>
          <div class="data-query-list">
            <span>热搜数据：</span>
            <span
              v-for="(item, index) in searchForData.statisticsData"
              @click="searchWord2(item)"
              :key="index"
              >{{ item }}</span
            >
          </div>
        </div>
      </div>
    </el-col>
    <el-col>
      <div
        style="
          width: 65%;
          margin: auto;
          text-align: center;
          margin-top: 60px;
          display: flex;
        "
      >
        <div class="data-query-tu" style="">
          <div class="query-hgjj"></div>
          <div><p>宏观经济统计数据</p></div>
        </div>
        <div class="data-query-tu">
          <div class="query-gyjj"></div>
          <div><p>工业经济统计数据</p></div>
        </div>
        <div class="data-query-tu">
          <div class="query-gyhy"></div>
          <div><p>工业行业统计数据</p></div>
        </div>
        <div class="data-query-tu">
          <div class="query-yns"></div>
          <div><p>云南省全量企业信息</p></div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script src="../../../js/industrialData/dataQuery/DataQuery.js"/>

<style scoped>
/deep/ .el-input__inner {
  height: 40px;
}
/deep/ .el-input-group__prepend {
  width: 60px;
}
.dataQuery-input-with-select {
  height: 40px;
}
.data-query-one {
  width: 65%;
  height: 240px;
  margin: auto;
  background: #ffffff;
  margin-top: 50px;
}
.data-query-title {
  text-align: center;
  width: 100%;
  padding-top: 5px;
}
.data-query-Options {
  width: 70%;
  margin: auto;
  margin-bottom: 10px;
}
.query-Options-span1 {
  line-height: 32px;
  background: #ffffff;
  color: #000000;
  border-radius: 3px;
  border: 0px;
  margin-right: 10px;
}
/deep/ .query-Options-span1:focus {
  outline: -webkit-focus-ring-color auto 0px;
  background: #259ed7;
  color: #ffffff;
}
.advanced-search {
  width: 90px;
  border: 0px;
  background: #ffffff;
  height: 40px;
  font-size: 16px;
}
.advanced-search:hover {
  background: rgb(37, 158, 215);
  color: #ffffff;
}
.advanced-search:focus {
  outline: -webkit-focus-ring-color auto 0px;
}
.search-button:hover {
  background: #259ed7;
  color: #ffffff;
}
.data-query-search {
  width: 72%;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
}
.data-query-list {
  width: 69%;
  margin: auto;
  font-size: 14px;
}
.data-query-list span {
  margin-right: 8px;
}

.data-query-tu {
  width: 280px;
  text-align: center;
}
.query-hgjj {
  width: 120px;
  height: 120px;
  margin: auto;
  background: url("../../../../assets/industrialData/dataQuery/hgjj.png")
    no-repeat;
  overflow: hidden;
  background-size: 100%;
}
.query-gyjj {
  width: 120px;
  height: 120px;
  margin: auto;
  background: url("../../../../assets/industrialData/dataQuery/gyjj.png")
    no-repeat;
  overflow: hidden;
  background-size: 100%;
}
.query-gyhy {
  width: 120px;
  height: 120px;
  margin: auto;
  background: url("../../../../assets/industrialData/dataQuery/gyhy.png")
    no-repeat;
  overflow: hidden;
  background-size: 100%;
}
.query-yns {
  width: 120px;
  height: 120px;
  margin: auto;
  background: url("../../../../assets/industrialData/dataQuery/yns.png")
    no-repeat;
  overflow: hidden;
  background-size: 100%;
}

.data-query-tu {
  width: 280px;
  text-align: center;
}
.query-hgjj {
  width: 120px;
  height: 120px;
  margin: auto;
  background: url("../../../../assets/industrialData/dataQuery/hgjj.png")
    no-repeat;
  overflow: hidden;
  background-size: 100%;
}
.query-gyjj {
  width: 120px;
  height: 120px;
  margin: auto;
  background: url("../../../../assets/industrialData/dataQuery/gyjj.png")
    no-repeat;
  overflow: hidden;
  background-size: 100%;
}
.query-gyhy {
  width: 120px;
  height: 120px;
  margin: auto;
  background: url("../../../../assets/industrialData/dataQuery/gyhy.png")
    no-repeat;
  overflow: hidden;
  background-size: 100%;
}
.query-yns {
  width: 120px;
  height: 120px;
  margin: auto;
  background: url("../../../../assets/industrialData/dataQuery/yns.png")
    no-repeat;
  overflow: hidden;
  background-size: 100%;
}
</style>