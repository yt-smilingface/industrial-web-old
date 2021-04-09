<template style="">
  <el-row
    style="background: #f3f6f9; width: 1080px; margin: auto; margin-top: 19px"
  >
    <div style="width: 100%">
      <div class="users-news">
        <div class="user-name">
          <div class="user-img">
            <img :src="userImage" alt="" class="user-image" />
          </div>
          <div class="user-information">
            <p style="font-weight: 600">
              {{ noontip }}， {{ userInfo.governmenuserInfoVo.name
              }}{{ userInfo.governmenuserInfoVo.reserved }}
            </p>
            <p style="font-size: 14px; font-family: PingFang SC">
              上次登录时间：{{ userInfo.loginTime }}
            </p>
            <div class="user-link">
              <el-button
                type="text"
                :underline="false"
                @click="accountInformation"
                >账户信息</el-button
              >
              <el-button type="text" :underline="false" @click="changePassword"
                >修改密码</el-button
              >
            </div>
          </div>
        </div>
        <div class="user-news" @click="notification">
          <div class="news-icon">
            <img :src="information" alt="" class="information-img" />
          </div>
          <div class="news-number">
            <span>消息通知</span>
            <div class="user-link">
              <el-button
                type="text"
                style="
                  text-decoration: underline;
                  font-size: 40px;
                  margin: 20px 13px;
                "
                >{{ nwesNumber }}</el-button
              >
            </div>
            <span>项</span>
          </div>
        </div>
      </div>
    </div>

    <div style="width: 100%">
      <div class="industry-monitor">
        <div class="industry-monitor-title" style="width: 50%">
          <p>工业经济运行监测</p>
        </div>
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
                style="width: 100%; min-height: 450px"
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
                    v-for="(itmes, is) in itme.slice(0, 3)"
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

    <!-- 工业经济数据库 -->
    <div style="width: 100%">
      <div class="economic-data">
        <div class="industry-monitor-title in-economy-database">
          <div class="in-economy-database-title">
            <div style="width: 40%">
              <p style="margin: 0px">工业经济数据库</p>
            </div>
            <div class="in-economy-database-title-input">
              <el-input
                class="in-economy-database-title-inputs"
                placeholder="请输入关键词"
                prefix-icon="el-icon-search"
                v-model="searchForData.input1"
                clearable
              >
                <el-select
                  v-model="searchForData.select1"
                  slot="prepend"
                  style="width: 98px"
                >
                  <el-option
                    v-for="item in searchForData.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-input>
              <el-button
                class="in-economy-database-title-button"
                type="primary"
                @click="searchFor"
                >一键查询</el-button
              >
            </div>
          </div>
        </div>
        <div style="display: flex; width: 100%">
          <div style="width: 64%">
            <div class="div-database">
              <!-- 图——数据 -->
              <div class="div-database-five-database">
                <div
                  class="in-economy-five-database"
                  v-for="(itme, i) in Library"
                  @click="handleTo(LibraryTo[i])"
                >
                  <img :src="itme" :key="i" />
                  <p>{{ LibraryData[i] }}</p>
                </div>
              </div>
            </div>
            <!-- 数据来源 -->
            <div
              class="div-database2"
              v-if="userInfo.depId === 1"
              @click="handleTo('/consideration')"
            >
              <div class="div-database2-text">
                <p style="width: 180px">
                  数据来源<a class="gongYeData">4</a>个
                </p>
                <p style="width: 190px">
                  数据目录<a class="gongYeData">14348</a>项
                </p>
                <p style="width: 320px">
                  数据总量<a class="gongYeData">418.5万</a>条
                </p>
              </div>
              <div class="div-database2-text">
                <p style="width: 300px">
                  数据服务处室<a class="gongYeData">8</a>个
                </p>
                <p style="width: 370px">
                  数据服务量<a class="gongYeData">314</a>次
                </p>
              </div>
            </div>
          </div>
          <!-- 点击快速搜索 -->
          <div class="div-database3">
            <div
              v-bind:style="{
                position: 'relative',
                color: industryData.dataTextColor[i],
                fontSize: industryData.dataTextBig[i] + 'px',
                top: industryData.dataTextTop[i] + 'px',
                left: industryData.dataTextLeft[i] + 'px',
              }"
              v-for="(itme, i) in industryData.dataText"
              :key="i"
            >
              <p @click="searchWord(itme)">{{ itme }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 政企直通车 -->
    <div style="width: 100%">
      <div class="economic-data">
        <div class="industry-monitor-title through-train-title" style="">
          <div class="through-train-title-text">
            <div><p style="margin: 0px">政企直通车</p></div>
            <div
              style="margin-left: 40px; margin-top: -7px"
              v-if="Authority1 !== 1 && Authority1 !== 2"
            >
              <span style="font-size: 16px">表单：</span>
              <el-select
                v-model="industryMonitorData.formSelectData"
                slot="prepend"
                style="width: 190px"
                size="small"
              >
                <el-option
                  v-for="item in industryMonitorData.formOptionData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="through-train-title-input">时间：</span>
              <el-select
                v-model="industryMonitorData.dateSelectData"
                slot="prepend"
                style="width: 190px"
                size="small"
              >
                <el-option
                  v-for="item in industryMonitorData.dateOptionData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="industry-monitor-data">
          <div
            class="industry-monitor-eh"
            style=""
            :style="{
              width: Authority1 === 1 || Authority1 === 2 ? '100%' : '64%',
            }"
          >
            <div
              v-for="(itme, index) in industryMonitorData.echartsData"
              style="margin: auto"
              @click="handleTo('makeReport/directCar?index=13&isActive=4')"
            >
              <ECharts style="width: 160px; height: 160px" :options="itme">
              </ECharts>
            </div>
          </div>

          <!-- 权限不同部分 -->
          <!--          {{userInfo.departmentInfoId}}-->
          <div
            class="industry-monitor-dais"
            v-if="
              !(
                userInfo.departmentInfoId == 1 || userInfo.departmentInfoId == 2
              )
            "
            @click="handleTo('makeReport/signAndHand?index=13&isActive=0')"
          >
            <p>
              待审核任务 <span>{{ industryMonitorData.pendingTasks }}</span
              >项
            </p>
          </div>
        </div>
        <div class="through-train">
          <div class="through-train-text" style="">
            <p>政企互动专区：企业遇到困难，在这里说</p>
          </div>
          <div class="through-train-btton">
            <p>
              分管处室累计收到留言<span>{{ shownum }}</span
              >条
            </p>
            <el-button
              class="through-train-bttons"
              type="primary"
              @click="
                handleTo(
                  'interact?index=0',
                  null,
                  userRoot.hasAuthEnterpriseMessage
                )
              "
              >查看详情</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </el-row>
</template>

<script src="../js/OperatingGuide.js"></script>

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
  color: #0265ba;
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
.industry-monitor-title {
  padding-left: 18px;
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 28px;
  color: #000000;
  border-left: 6px solid #0265ba;
}
.economic-data {
  width: 100%;
  margin-top: 25px;
}

.div-database {
  width: 100%;
  height: 152px;
  background: #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 10px;
}
.div-database .div-database-five-database {
  display: inline-flex;
  padding-top: 20px;
  width: 100%;
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

.div-database2 {
  width: 100%;
  height: 90px;
  background: #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 10px;
  margin-top: 25px;
  padding-top: 15px;
}
.div-database2-text {
  display: inline-flex;
  text-align: center;
  line-height: 0px;
}

.div-database3 {
  width: 35%;
  height: 282px;
  background: #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 10px;
  margin-left: 20px;
}
.div-database3 p {
  margin: 0px;
}
.industry-monitor-data {
  height: 145px;
  border-radius: 10px;
  display: flex;
  margin-bottom: 23px;
}
.industry-monitor-eh {
  display: flex;
  text-align: center;
  background: #ffffff;
  text-align: center;
  border-radius: 10px;
}
.industry-monitor-dais {
  width: 36%;
  margin-left: 20px;
  background: #ffffff;
  border-radius: 10px;
  display: flex;
}
.industry-monitor-dais p {
  font-size: 20px;
  align-self: center;
  width: 100%;
  text-align: center;
}
.industry-monitor-dais p span {
  color: #0265ba;
  font-size: 24px;
  text-decoration: underline;
}
.through-train {
  width: 100%;
  height: 80px;
  background: #d8e8ff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 0px 0px 10px 10px;
  margin-top: -18px;
  display: flex;
}
.gongYeData {
  color: #0265ba;
  font-size: 19px;
  font-family: PingFangSC-Regular;
  text-decoration: underline;
  margin-left: 5px;
  margin-right: 5px;
}
.through-train-text {
  width: 40%;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 42px;
  color: #000000;
  text-align: center;
}
.through-train-btton {
  display: inline-flex;
  width: 60%;
  text-align: center;
  margin: auto;
}
.through-train-btton p {
  width: 216px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 10px;
  margin-left: 43%;
}
.through-train-btton p span {
  color: #0265ba;
  font-size: 22px;
}
.through-train-bttons {
  height: 30px;
  font-size: 16px;
  line-height: 30px;
  padding: 0px 20px;
  margin-left: 38px;
  margin-top: 7px;
}

.industryClick-div {
  width: 100%;
  display: block;
  text-align: center;
  margin-top: 28px;
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
}
.industryClick-span2 {
  text-decoration: underline;
  color: #ffffff;
  font-size: 19px;
}







.industry-monitor-chart {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
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
  border-right: 1px solid #707070;
  padding-right: 10px;
  margin-left: 10px;
}
.industry-monitor-chart-title-span1 {
  color: #0265ba;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}
.industry-monitor-chart-title-span2 {
  color: #b4b4b4;
  font-size: 14px;
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
  min-height: 450px;
}
.industrial-operation-monitoring-right {
  width: 100%;
  background: #00a9e2;
  margin-bottom: 6px;
  flex: 1;
}
.industrial-operation-monitoring-right-text {
  text-align: center;
  color: #ffffff;
  font-size: 24px;
  margin: 0 20px;
  padding-top: 22px;
}
/*  */
.macroeconomic-operation-monitoring-ul {
  list-style: none;
  margin: 0px;
  overflow-y: scroll;
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
  font-size: 22px;
}
.macroeconomic-operation-monitoring-ul-li .macroscopic-ul-li-div3 {
  background: #77a7cb;
  text-align: center;
  width: 100%;
  font-size: 18px;
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
  color: #0265ba;
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
  background: #0265ba !important;
}
.home-smart-reporting-right {
  width: 70%;
  background: #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 10px;
}
.home-smart-reporting-right-title {
  color: #0265ba;
  font-size: 26px;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 60px;
}
.home-smart-reporting-right-button {
  background: #0265ba;
  color: #ffffff;
}

/* 工业经济数据库 */
.in-economy-database {
  margin-bottom: 22px;
}
.in-economy-database-title {
  display: inline-flex;
  width: 100%;
  height: 28px;
}
.in-economy-database-title-input {
  width: 40%;
  position: absolute;
  margin-left: 62%;
  margin-top: -7px;
}
.in-economy-database-title-inputs {
  width: 68% !important;
  line-height: 28px !important;
  margin-left: 10px !important;
}
.in-economy-database-title-button {
  width: 17%;
  margin-left: 0px;
  height: 36px;
  padding: 0px 0px;
  background: #0265ba;
}

/*  */
.through-train-title {
  margin-bottom: 22px;
}
.through-train-title-text {
  display: inline-flex;
  width: 100%;
  height: 28px;
}
.through-train-title-input {
  font-size: 16px;
  margin-left: 20px;
}
</style>