<template>
  <el-row style="width: 95%; margin: auto">
    <el-col style="position: relative">
      <el-tabs v-model="activeName" type="border-card" @tab-click="tabChange">
        <el-tab-pane
          v-for="(item, index) in slotData"
          :label="item.value"
          :name="String(item.id)"
          :key="item.id"
        >
          <div v-if="item.id === 75"><TabOne></TabOne></div>
          <div v-if="item.id === 76"><TabTwo> </TabTwo></div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script src="../../js/moveMonitor/SmartReport.js">
</script>


<style>
</style>