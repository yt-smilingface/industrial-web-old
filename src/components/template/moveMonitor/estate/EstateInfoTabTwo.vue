<template>
  <div style="display: flex; flex-direction: column">
    <div v-if="setTitleSlots()">
      <slot name="title" :areaTitle="titleName"></slot>
    </div>
    <div v-else>
      <TitleMonitor
        :titleData="titleName[0]"
        @chooseBack="chooseBack"
        :thisTabData="thisTab"
      ></TitleMonitor>
    </div>
    <div style="flex: 1">
      <div style="display:flex; width: 100%;margin: auto auto;jis">
        <div style="width: 50%; position: relative">
          <img
            v-if="$route.query.name !== '生物医药和大健康'"
            src="../../../../assets/moveMonitor/estate2.jpg"
            style="width: 200%"
          />
          <img
            v-if="$route.query.name == '生物医药和大健康'"
            src="../../../../assets/moveMonitor/estate.png"
            style="width: 200%"
          />
          <!-- <img style="width: 100%" src="../../../../assets/product-menu.png" />
          <div class="first-cir first-cir-1">
            校验
            <br />
            外包
          </div>
          <div class="first-cir first-cir-2">
            服务
            <br />
            诊断
          </div> -->
        </div>
      </div>

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

<script src="../../../js/moveMonitor/estate/EstateInfoTabTwo.js" />

<style>
.first-cir {
  width: 2.6vw;
  height: 2.6vw;
  border-radius: 50%;
  background: linear-gradient(to bottom, #ffa448, #faffcb);
  position: absolute;
  box-shadow: 3px 6px 3px -3px #ccc;
  font-size: 14px;
  color: #fff;

  line-height: 22px;
  text-align: center;
}

.first-cir-1 {
  top: 7%;
  left: 22%;
}
.first-cir-2 {
  top: 42%;
  left: 2%;
}
</style>
