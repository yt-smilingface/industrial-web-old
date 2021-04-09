<template>
    <div style="width: 100%;display: flex;">
        <div style="display:flex;flex-direction: column;height: 60vh;flex: 1;">
            <div style="flex: 1">
                <ECharts ref="eCharts" style="width: 100%; height: 340px;" :options="echartsData.echartsTrendData">

                </ECharts>
            </div>
        </div>
    </div>

</template>

<script src="../../../js/personalCenter/ChangeTrend/CenterChangeTrend.js" />

<style>


</style>
