<template>
	<div style="width: 100%;display: flex;">
		<div style="display:flex;flex-direction: column;height: 60vh;flex: 1;">
			<div v-if="setTitleSlots()">
				<slot name='title' :changeTrendtitle='titleName'></slot>
			</div>
			<div v-else>
				<TitleMonitor :titleData="titleName[0]" @chooseBack="chooseBack" :thisTabData="thisTab"></TitleMonitor>
			</div>
			<div style="flex: 1">
				<ECharts ref="eCharts" style="width: 100%; height: 450px;" :options="echartsData.echartsTrendData">

				</ECharts>
			</div>
			
		</div>
	</div>
	
</template>

<script src="../../../js/moveMonitor/changeTrend/ChangeTrend.js" />

<style>


</style>
