<template style="">
  <el-row>
    <div style="width: 100%">
      <div class="industry-monitor">
        <div class="industry-monitor-chart">
          <div class="industry-monitor-chart-title">
            <div v-for="(item, index) of industry">
              <div
                class="industry-monitor-chart-title2"
                v-if="index === industry.length - 1"
                @click="testClick(item.titleId)"
              >
                <span
                  class="industry-monitor-chart-title-span1"
                  v-if="testData.index === item.titleId"
                  >{{ item.name }}</span
                >
                <span
                  class="industry-monitor-chart-title-span2"
                  v-if="testData.index !== item.titleId"
                  >{{ item.name }}</span
                >
              </div>
              <div
                class="industry-monitor-chart-title22"
                v-if="index !== industry.length - 1"
                @click="testClick(item.titleId)"
              >
                <span
                  class="industry-monitor-chart-title-span1"
                  v-if="testData.index === item.titleId"
                  >{{ item.name }}</span
                >
                <span
                  class="industry-monitor-chart-title-span2"
                  v-if="testData.index !== item.titleId"
                  >{{ item.name }}</span
                >
              </div>
            </div>
          </div>
          <!--    宏观经济运行监测-->
          <div
            class="macroeconomic-operation-monitoring-eCharts"
            v-if="testData.index !== 4"
          >
            <div style="width: 72%">
              <ECharts
                :options="echartsData.echartsTrendData"
                style="width: 100%; min-height: 400px"
              ></ECharts>
            </div>
            <!--     工业行业运行监测-->
            <div
              class="industrial-operation-monitoring"
              v-if="testData.index === 2"
            >
              <div
                class="industrial-operation-monitoring-right"
                v-for="(itme, key, i) in secondMenu.工业行业运行监测"
                :style="
                  testData.industryTitle !== i
                    ? 'background:#77A7CB;'
                    : 'background:#00A9E2;'
                "
              >
                <div
                  class="industrial-operation-monitoring-right-text"
                  :key="i"
                >
                  <span>{{ key }}</span>
                </div>
                <div class="industryClick-div" style="">
                  <span
                    class="industryClick-span"
                    v-for="(itmes, is) in itme.slice(0, 6)"
                    :key="is"
                    @click="industryClick(i, is, itmes.id)"
                    v-bind:class="
                      testData.industryTitle === i &&
                      testData.industryTitleTwo === is
                        ? 'industryClick-span2'
                        : ''
                    "
                  >
                    {{ itmes.directoryName }}
                  </span>
                  <br />
                  <span
                    class="industryClick-span"
                    @click="industryClick(i, 4, 0)"
                    v-bind:class="
                      testData.industryTitle === i &&
                      testData.industryTitleTwo === 4
                        ? 'industryClick-span2'
                        : ''
                    "
                    >查看更多</span
                  >
                </div>
              </div>
            </div>
            <!--   宏观经济运行监测  -->
            <div style="width: 28%" v-if="testData.index === 0">
              <div style="height: 100%; width: 100%">
                <div>
                  <ul
                    class="macroeconomic-operation-monitoring-ul"
                    v-if="secondMenu.宏观经济运行监测"
                  >
                    <li
                      v-for="(itme, index) in secondMenu.宏观经济运行监测.slice(
                        0,
                        6
                      )"
                      :key="index"
                      @click="testListClick(index, itme.id, 1)"
                      class="macroeconomic-operation-monitoring-ul-li"
                    >
                      <div
                        class="macroscopic-ul-li-div1"
                        v-if="testData.listDataIndex === index"
                      ></div>
                      <div
                        class="macroscopic-ul-li-div2"
                        v-if="testData.listDataIndex === index"
                      >
                        {{ itme.directoryName }}
                      </div>
                      <div
                        class="macroscopic-ul-li-div3"
                        v-if="testData.listDataIndex !== index"
                      >
                        {{ itme.directoryName }}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!--   工业经济运行监测  &ndash;&gt;-->
            <div style="width: 28%" v-if="testData.index === 1">
              <div style="height: 100%; width: 100%">
                <div>
                  <ul
                    class="macroeconomic-operation-monitoring-ul"
                    v-if="secondMenu.工业经济运行监测"
                  >
                    <li
                      class="macroeconomic-operation-monitoring-ul-li"
                      v-for="(itme, index) in secondMenu.工业经济运行监测.slice(
                        0,
                        6
                      )"
                      :key="index"
                      @click="testListClick(index, itme.id, 2)"
                    >
                      <div
                        class="macroscopic-ul-li-div1"
                        v-if="testData.listDataIndex === index"
                      ></div>
                      <div
                        class="macroscopic-ul-li-div2"
                        v-if="testData.listDataIndex === index"
                      >
                        {{ itme.directoryName }}
                      </div>
                      <div
                        class="macroscopic-ul-li-div3"
                        v-if="testData.listDataIndex !== index"
                      >
                        {{ itme.directoryName }}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!--   重点企业运行监测  -->
            <div style="width: 28%" v-if="testData.index === 3">
              <div style="height: 100%; width: 100%">
                <div>
                  <ul
                    class="macroeconomic-operation-monitoring-ul"
                    v-if="secondMenu.重点产业运行监测"
                  >
                    <li
                      class="macroeconomic-operation-monitoring-ul-li"
                      v-for="(itme, index) in secondMenu.重点产业运行监测.slice(
                        0,
                        6
                      )"
                      :key="index"
                      @click="testListClick(index, itme.id, 3)"
                    >
                      <div
                        class="macroscopic-ul-li-div1"
                        v-if="testData.listDataIndex === index"
                      ></div>
                      <div
                        class="macroscopic-ul-li-div2"
                        v-if="testData.listDataIndex === index"
                      >
                        {{ itme.directoryName }}
                      </div>
                      <div
                        class="macroscopic-ul-li-div3"
                        v-if="testData.listDataIndex !== index"
                      >
                        {{ itme.directoryName }}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  智能报告-->
      <div class="home-smart-reporting" v-if="testData.index === 4">
        <div class="home-smart-reporting-left">
          <div class="home-smart-reporting-title">
            <p>智能报告</p>
          </div>
          <div class="home-smart-reporting-text">
            <p><a class="home-smart-reporting-text-a">1</a>份</p>
          </div>
          <div class="home-smart-reporting-button">
            <el-button
              type="primary"
              class="home-smart-reporting-buttons"
              @click="searchFor"
              >查看全部</el-button
            >
          </div>
        </div>
        <div class="home-smart-reporting-right">
          <div class="home-smart-reporting-right-title">报告查询</div>
          <div style="width: 70%; text-align: center; margin-left: 15%">
            <el-input
              placeholder="请输入内容"
              v-model="testData.listDataInput"
              class="input-with-select"
            >
              <el-select
                v-model="testData.listDataSelect"
                slot="prepend"
                placeholder="全部"
                style="width: 110px"
              >
                <el-option label="全部" value="1"></el-option>
                <el-option label="云南" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
              <el-button
                class="home-smart-reporting-right-button"
                slot="append"
                icon="el-icon-search"
                >搜索</el-button
              >
            </el-input>
          </div>
        </div>
      </div>
    </div>
    
  </el-row>
</template>

<script src="../../js/OperatingGuide.js"></script>

<style scoped>
html,
body {
  height: 100%;
}
.users-news {
  display: flex;
  width: 100%;
}
.user-name {
  background: #ffffff;
  display: flex;
  width: 50%;
  height: 120px;
  margin-right: 100px;
  border-radius: 10px;
  opacity: 1;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  padding-left: 40px;
}
.user-img,
.news-icon {
  line-height: 170px;
}
.user-image {
  height: 72px;
  width: 72px;
  border-radius: 50%;
  border: 1px solid #707070;
}
.user-information {
  margin-left: 27px;
}
.el-link.el-link--primary {
  font-size: 13px;
  font-family: "PingFang SC";
  font-weight: 600;
  line-height: 25px;
  color: #409eff;
  margin-right: 20px;
}

/*信息*/
.user-news {
  display: flex;
  background: #ffffff;
  width: 50%;
  height: 120px;
  border-radius: 10px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  padding-left: 84px;
}
.information-img {
  width: 64px;
  height: 64px;
}
.news-number {
  line-height: 100px;
  display: flex;
  margin-left: 60px;
}
.news-number span {
  line-height: 120px;
}
.economic-data {
  width: 100%;
  margin-top: 25px;
}

.in-economy-five-database {
  margin-left: 14px;
  margin-right: 14px;
  width: 20%;
  text-align: center;
}
.in-economy-five-database img {
  width: 72px;
  border-radius: 50%;
}
.in-economy-five-database p {
  font-size: 14px;
}

.industryClick-div {
  width: 100%;
  display: block;
  text-align: center;
  margin-top: 10px;
  display: block;
  word-break: break-all;
  word-wrap: break-word;
}
.industryClick-span {
  margin-right: 8px;
  color: #e9e9e9;
  font-size: 14px;
  text-align: left;
  /*white-space:pre-wrap;*/
  /*word-break: break-all;*/
  /*white-space: normal;*/
  /*word-break: keep-all;word-wrap : break-word ;*/
  cursor: pointer;
}
.industryClick-span2 {
  text-decoration: underline;
  color: #ffffff;
  /* font-size: 19px; */
}

.industry-monitor-chart-title {
  padding: 10px;
  background-color: #ffffff;
  display: flex;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.industry-monitor-chart-title2 {
  padding-right: 10px;
  margin-left: 10px;
}
.industry-monitor-chart-title22 {
  border-right: 1px solid #aaa;
  padding-right: 10px;
  margin-left: 10px;
}
.industry-monitor-chart-title-span1 {
  color: #409eff;
  font-size: 16px;
  cursor: pointer;
}
.industry-monitor-chart-title-span2 {
  color: #666;
  font-size: 16px;
  cursor: pointer;
}
.macroeconomic-operation-monitoring-eCharts {
  width: 100%;
  display: flex;
  background-color: #ffffff;
  margin-top: 10px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.industrial-operation-monitoring {
  width: 28%;
  display: flex;
  flex-direction: column;
  min-height: 400px;
}
.industrial-operation-monitoring-right {
  padding: 10px;
  width: calc(100% - 20px);
  background: #00a9e2;
  margin-bottom: 6px;
  flex: 1;
}
.industrial-operation-monitoring-right-text {
  text-align: center;
  color: #ffffff;
  font-size: 17px;
  font-weight: bolder;
  margin: 0 20px;
  padding-top: 22px;
}
/*  */
.macroeconomic-operation-monitoring-ul {
  list-style: none;
  margin: 0px;
  overflow-y: auto;
  height: 100%;
}
.macroeconomic-operation-monitoring-ul-li {
  height: 56px;
  background-color: rgba(255, 255, 255, 0);
  border-bottom: 1px solid #fff;
  color: #fff;
  text-align: center;
  line-height: 56px;
  display: flex;
}
.macroeconomic-operation-monitoring-ul-li .macroscopic-ul-li-div1 {
  margin-left: -28px;
  width: 0;
  height: 0;
  border-top: 28px solid transparent;
  border-right: 30px solid #00a9e2;
  border-bottom: 28px solid transparent;
}
.macroeconomic-operation-monitoring-ul-li .macroscopic-ul-li-div2 {
  background: #00a9e2;
  text-align: center;
  width: 100%;
  font-size: 18px;
}
.macroeconomic-operation-monitoring-ul-li .macroscopic-ul-li-div3 {
  background: #77a7cb;
  text-align: center;
  width: 100%;
  font-size: 18px;
  cursor: pointer;
}

/*  */
.home-smart-reporting {
  width: 100%;
  height: 400px;
  display: flex;
  margin-top: 10px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.home-smart-reporting-left {
  text-align: center;
  width: 28%;
  margin-right: 2%;
  background: #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 10px;
}
.home-smart-reporting-title {
  text-align: center;
  font-size: 18px;
  line-height: 120px;
}
.home-smart-reporting-text {
  text-align: center;
}
.home-smart-reporting-text p {
  color: #409eff;
}
.home-smart-reporting-text-a {
  text-decoration: underline;
  font-size: 28px;
  margin-right: 12px;
}
.home-smart-reporting-button {
  text-align: center;
  margin-top: 40px;
}
.home-smart-reporting-buttons {
  margin-left: 0px !important;
  height: 30px !important;
  padding: 0px 20px !important;
  background: #409eff !important;
}
.home-smart-reporting-right {
  width: 70%;
  background: #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 10px;
}
.home-smart-reporting-right-title {
  color: #409eff;
  font-size: 26px;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 60px;
}
.home-smart-reporting-right-button {
  background: #409eff;
  color: #ffffff;
}

</style>