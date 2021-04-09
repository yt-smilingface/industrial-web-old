<template>
  <div style="display: flex; flex-direction: column">
    <div v-if="setTitleSlots()">
      <slot name="title" :areaTitle="titleName"></slot>
    </div>
    <div v-else>
      <TitleMonitor
        :callBackTime="callBackTime"
        :titleData="titleName[0]"
        @chooseBack="chooseBack"
        :thisTabData="thisTab"
        
      ></TitleMonitor>
    </div>
    <div style="flex: 1">
      <ECharts
        style="width: 50%; margin: auto auto"
        :options="echartsData.echartsYunNanMapData"
        @click="areaEnClick"
      >
      </ECharts>
      <div v-if="setScopedSlots()">
        <slot name="area" :areaItem="slotsData"></slot>
      </div>
      <div v-else>
        <TitleMonitor
          v-if="thisChooseArea.title"
          :titleData="thisChooseArea"
          style="margin-top: 20px"
        ></TitleMonitor>
        <ECharts
          style="width: 100%; height: 300px"
          :options="echartsData.echartsAreaData"
        >
        </ECharts>
      </div>
    </div>
  </div>
</template>

<script src="../../../js/moveMonitor/areaInfo/AreaInfo.js" />

<style>
</style>
