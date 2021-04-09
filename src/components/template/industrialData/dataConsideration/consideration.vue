<template>
  <div>
    <div class="top-info">
      <div class="top-info-box">
        <div style="text-align: right; margin-right: 30px">数据来源</div>
        <div class="consideration-datalaiyuan">3个</div>
        <div style="text-align: center">本周新增+0个</div>
      </div>
      <div class="top-info-box">
        <div style="text-align: right; margin-right: 30px">数据指标</div>
        <div class="consideration-datalaiyuan">14348项</div>
        <div style="text-align: center">本周新增+564项</div>
      </div>
      <div class="top-info-box">
        <div style="text-align: right; margin-right: 30px">数据总量</div>
        <div class="consideration-datalaiyuan">5506.2万条</div>
        <div style="text-align: center">本周新增+28231条</div>
      </div>
    </div>
    <div class="cont-info">
      <div class="cont-info-box">
        <div class="cont-info-box-head">数据源结构</div>
        <ECharts
          style="width: 100%; margin: auto"
          :options="dataInfo.echartsData[0]"
        >
        </ECharts>
      </div>
      <div class="cont-info-box">
        <div class="cont-info-box-head">数据频度结构</div>
        <img
          src="../../../../assets/ggg2.png"
          style="width: 90%; margin-left: 5%; margin-top: 10%"
        />
 
      </div>
      <div class="cont-info-box">
        <div class="cont-info-box-head">数据实时动态</div>
        <ECharts
          style="width: 100%; margin: auto"
          :options="dataInfo.echartsData[2]"
        >
        </ECharts>
      </div>
      <div class="cont-info-box">
        <div class="cont-info-box-head">数据服务走势</div>
        <ECharts
          style="width: 100%; height: 360px; margin: auto; margin-top: 30px"
          :options="dataInfo.echartsData[3]"
        >
        </ECharts>
      </div>
      <div class="cont-info-box">
        <div class="cont-info-box-head">热门服务数据</div>
        <ECharts
          style="width: 100%; margin-top: -10px"
          :options="dataInfo.echartsData[4]"
        >
        </ECharts>
      </div>
      <div class="cont-info-box">
        <div class="cont-info-box-head">数据服务机构</div>
        <ECharts
          style="width: 100%; margin: auto"
          :options="dataInfo.echartsData[5]"
        >
        </ECharts>
      </div>
    </div>
  </div>
</template>

<script src="../../../js/industrialData/consideration/consideration.js">
</script>

<style scoped>
.common {
  width: 90%;
  margin: auto;
}
.brade-box {
  width: 95%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
}
.input-with-select {
  width: 250px;
  height: 30px;
}
/deep/ .input-with-select .el-input__inner {
  width: 250px;
  height: 30px;
}
.top-info {
  width: 90%;
  margin: auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.top-info-box {
  width: 30%;
  height: 193px;
  display: flex;
  margin-right: 10px;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 3px 3px 4px 3px #ccc;
}

.cont-info {
  width: 90%;
  margin: auto;
  margin-top: 50px;
  border: 1px solid transparent;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.cont-info-box {
  width: 30%;
  height: 415px;
  padding-bottom: 30px;
  border-radius: 6px;
  margin-bottom: 60px;
  border: 1px solid #44aeff;
}
.consideration-datalaiyuan {
  color: #0265ba;
  font-size: 40px;
  line-height: 60px;
  text-align: center;
  font-weight: 800;
}

.cont-info-box-head {
  width: 100%;
  height: 48px;
  color: #fff;
  line-height: 48px;
  font-size: 20px;
  font-weight: 600;
  text-indent: 2rem;
  background: linear-gradient(
    to bottom,
    #3ab3e8,
    #239bd0,
    #2ba6dc,
    #7bd1ff,
    #7bd1ff
  );
}
</style>