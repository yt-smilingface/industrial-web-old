<template>
	<el-row style="width: 94%;margin: auto;">
		<el-col style="position: relative">
			<Plank showBtn :slotData="slotData" @tabChange="tabChange" @clickDownload="clickDownload" @checkoutChange="checkoutChange">
				<template v-slot:p0="{item}">
					<div>
						<ProfessionAddValue :thisTab="thisTab" :titleName="item.data"></ProfessionAddValue>
					</div>
				</template>
				<template v-slot:p1="{item}">
					<div>
						<ProfessionPercentage :thisTab="thisTab" :titleName="item.data"></ProfessionPercentage>
					</div>
				</template>
			</Plank>
		</el-col>
	</el-row>
</template>

<script src="../../../../js/moveMonitor/industry/fabric/Fabric.js" />

<style scoped>
    
</style>
