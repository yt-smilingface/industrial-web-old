<template>
  <div style="width: 100%; display: flex; flex-direction: column">
    <div style="display: flex; flex-direction: column; height: 60vh; flex: 1">
      <div v-if="setTitleSlots()">
        <slot name="title" :changeTrendtitle="titleName"></slot>
      </div>
      <div v-else>
        <div
          style="
            font-family: PingFang SC, PingFang SC-Semibold;
            text-align: center;
            color: #087ebe;
            font-weight: 600;
          "
        >
          {{ nameTwo }}{{ titleName[0].title2 }}
        </div>
        <TitleMonitor
          :titleData="titleName[0]"
          @chooseBack="chooseBack"
          :thisTabData="thisTab"
        ></TitleMonitor>
      </div>
      <div style="flex: 1">
        <ECharts
          ref="eCharts"
          style="width: 100%; height: 450px"
          :options="productionEchart"
        >
        </ECharts>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; height: 60vh; flex: 1">
      <div v-if="setTitleSlots()">
        <slot name="title" :changeTrendtitle="titleName"></slot>
      </div>
      <div v-else>
        <div
          style="
            font-family: PingFang SC, PingFang SC-Semibold;
            text-align: center;
            color: #087ebe;
            font-weight: 600;
          "
        >
          {{ nameTwo }}{{ titleName[1].title2 }}
        </div>
        <TitleMonitor
          :titleData="titleName[1]"
          @chooseBack="chooseBack"
          :thisTabData="thisTab"
        ></TitleMonitor>
      </div>
      <div style="flex: 1">
        <ECharts
          ref="eCharts"
          style="width: 100%; height: 450px"
          :options="productionEchart2"
        >
        </ECharts>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; height: 60vh; flex: 1">
      <div v-if="setTitleSlots()">
        <slot name="title" :changeTrendtitle="titleName"></slot>
      </div>
      <div v-else>
        <div
          style="
            font-family: PingFang SC, PingFang SC-Semibold;
            text-align: center;
            color: #087ebe;
            font-weight: 600;
          "
        >
          {{ nameTwo }}{{ titleName[2].title2 }}
        </div>
        <TitleMonitor
          :titleData="titleName[2]"
          @chooseBack="chooseBack"
          :thisTabData="thisTab"
        ></TitleMonitor>
      </div>
      <div style="flex: 1">
        <ECharts
          ref="eCharts"
          style="width: 100%; height: 450px"
          :options="productionEchart3"
        >
          <!-- :options="echartsData.echartsTrendData" -->
        </ECharts>
      </div>
    </div>
  </div>
</template>

<script src="../../../js/moveMonitor/estate/EstateInfoTabOne.js" />

<style>
</style>
