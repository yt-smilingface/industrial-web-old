<template>
	<el-row style="width: 94%;margin: auto;">
		<el-col style="position: relative">
			<Plank showBtn :slotData="slotData" @tabChange="tabChange" @clickDownload="clickDownload" @checkoutChange="checkoutChange">
				<template v-slot:p0="{item}">
					<div>
						<ChangeTrend :thisTab="thisTab" :titleName="item.data"></ChangeTrend>
					</div>
				</template>
				<template v-slot:p1="{item}">
					<div>
						<AreaInfo :thisTab="thisTab" :titleName="item.data"></AreaInfo>
					</div>
				</template>
				<template v-slot:p2="{item}">
					<div>
						<NationwideComparedInfo openRank :thisTab="thisTab" :titleName="item.data"></NationwideComparedInfo>
					</div>
				</template>
			</Plank>
		</el-col>
	</el-row>
</template>

<script src="../../../../js/moveMonitor/macro/socialConsumerGoods/SocialConsumerGoods.js" />

<style scoped>
    
</style>
