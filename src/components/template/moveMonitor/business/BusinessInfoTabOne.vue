<template>
  <div style="width: 100%; display: flex; flex-direction: column">
    <div style="display: flex; flex-direction: column; height: 60vh; flex: 1">
      <div v-if="setTitleSlots()">
        <slot name="title" :changeTrendtitle="titleName"></slot>
      </div>
      <div v-else>
        <TitleMonitor
          :titleData="titleName[0]"
          @chooseBack="chooseBack"
          :thisTabData="thisTab"
        ></TitleMonitor>
      </div>
      <div style="flex: 1">
        <ECharts
          ref="eCharts"
          :key="2"
          style="width: 100%; height: 450px"
          :options="echartsData.echartsTrendData"
        >
        </ECharts>
      </div>
    </div>

    <div
      style="
        display: flex;
        flex-direction: column;
        height: 60vh;
        flex: 1;
        margin-top: 80px;
      "
    >
      <div v-if="setTitleSlots()">
        <slot name="title" :changeTrendtitle="titleName"></slot>
      </div>
      <div v-else>
        <TitleMonitor
          :titleData="titleName[2]"
          @chooseBack="chooseBack3"
          :thisTabData="thisTab"
        ></TitleMonitor>
      </div>
      <div style="flex: 1">
        <ECharts
          ref="eCharts2"
          :key="1"
          style="width: 100%; height: 450px"
          :options="echartsData.echartsTrendData3"
        >
        </ECharts>
      </div>
    </div>

    <div
      style="
        display: flex;
        flex-direction: column;
        height: 60vh;
        flex: 1;
        margin-top: 80px;
      "
    >
      <div v-if="setTitleSlots()">
        <slot name="title" :changeTrendtitle="titleName"></slot>
      </div>
      <div v-else>
        <TitleMonitor
          :titleData="titleName[1]"
          @chooseBack="chooseBackTwo"
          :thisTabData="thisTab"
          :callBackData2="callBackData2"
          :callBackData="callBackData"
        ></TitleMonitor>
      </div>
      <div style="flex: 1">
        <ECharts
          ref="eCharts"
          style="width: 100%; height: 450px"
          :options="echartsData.echartsTrendData2"
        >
        </ECharts>
      </div>
    </div>
  </div>
</template>

<script src="../../../js/moveMonitor/business/BusinessInfoTabOne.js" />

<style>
</style>
