<template>
	<el-row style="width: 94%;margin: auto;">
		<el-col style="position: relative">
			<Plank :slotData="slotData" @tabChange="tabChange" @clickDownload="clickDownload" @checkoutChange="checkoutChange">
				<template v-slot:p0="{item}">
					<div>
						<ChangeTrend :thisTab="thisTab" :titleName="item.data"></ChangeTrend>
					</div>
				</template>
				<template v-slot:p1="{item}">
					<div>
						<NationwideComparedInfo :thisTab="thisTab" :titleName="item.data"></NationwideComparedInfo>
					</div>
				</template>
			</Plank>
		</el-col>
	</el-row>
</template>

<script src="../../../../js/moveMonitor/macro/factoryMonitor/FactoryMonitor.js" />

<style scoped>
    .national-comparison{
        height: 120px;
        width: 100%;
        margin-bottom: 20px;
        background: #ffffff;
        border: 2px solid #42b2e6;
        border-radius: 5px 5px 5px 5px;
        box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
    }
    .cumulative{
        height: 41px;
        text-align: center;
        margin-bottom: 20px;
        font-size: 13px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        color: #ffffff;
        background: linear-gradient(180deg,#3ab3e8, #239bd0 50%, #2ba6dc 50%, #7bd1ff 94%, #7bd1ff);
        border-radius: 3px 3px 0px 0px;
        box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
    }
    .cumulative p{
        margin: 0px;
    }
    .cumulative-value{
        background: #ffffff;
        text-align: center;
        color: #000000;
        font-size: 18px;
        font-weight: 500;
    }

</style>
