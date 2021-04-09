<template>
  <div>
    <div style="width: 100%; display: flex; flex-direction: column">
      <div style="flex: 1">
        <div v-if="setTitleSlots()">
          <slot name="title" :nationTitle="titleName"></slot>
        </div>
        <div v-else>
          <TitleMonitor
            :callBackTime="callBackTime"
            :titleData="titleName[0]"
            @chooseBack="chooseBack"
            :thisTabData="thisTab"
            @sortClick="sortClick"
          ></TitleMonitor>
        </div>
        <ECharts
          style="width: 100%; height: 300px"
          :options="echartsData.echartsQgdbData"
          @click="echartsqgdb"
        >
        </ECharts>
        <div style="width: 100%; height: 350px">
          <TitleMonitor
            v-if="this.thisChooseArea.title.title"
            :titleData="this.thisChooseArea.title"
            @chooseBack="chooseBack"
          ></TitleMonitor>
          <ECharts
            v-if="this.thisChooseArea.title.title"
            style="width: 100%; height: 300px"
            :options="echartsData.echartsDqGdpData"
          >
          </ECharts>
        </div>
      </div>
      <div v-if="openRank" style="width: 100%">
        <div v-if="rankData.length > 0" class="nationals2">
          <div class="national-comparison2" v-for="(item, index) of rankData">
            <div class="cumulative">
              <p>{{ item.name }}/全国排名</p>
            </div>
            <div class="cumulative-value" v-if="item.showModel === 1">
              <span>{{ item.value }}</span
              >&nbsp;<span>/</span>&nbsp;<span>{{ item.pos }}</span
              >位
            </div>
            <div class="cumulative-value" v-if="item.showModel === 0">
              <span>{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../../../js/moveMonitor/nationwide/NationwideComparedInfo.js"/>

<style>
.nationals2 {
  display: flex;
  flex-direction: row;
}
.national-comparison2 {
  height: 120px;
  width: 25%;
  margin-left: 20px;
  margin-bottom: 20px;
  background: #ffffff;
  border: 2px solid #42b2e6;
  border-radius: 5px 5px 5px 5px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
}
.cumulative {
  height: 41px;
  text-align: center;
  margin-bottom: 20px;
  font-size: 13px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  color: #ffffff;
  background: linear-gradient(
    180deg,
    #3ab3e8,
    #239bd0 50%,
    #2ba6dc 50%,
    #7bd1ff 94%,
    #7bd1ff
  );
  border-radius: 3px 3px 0px 0px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
}
.cumulative p {
  margin: 0px;
}
.cumulative-value {
  background: #ffffff;
  text-align: center;
  color: #000000;
  font-size: 18px;
  font-weight: 500;
}
</style>
