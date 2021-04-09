<template>
	<div>
		<el-row style="width: 100%;margin: auto;">
			<el-col style="position: relative">
				<div v-if="showBtn">
					<el-tag v-if="btnStatus.status" style="position: absolute;top: 3px;right: 8px;z-index: 10" @click="checkoutChange(false)">
						<i class="el-icon-s-grid"></i>
					</el-tag>
					<el-tag v-if="btnStatus.status===false" style="position: absolute;top: 3px;right: 50px;z-index: 10" @click="checkoutChange(true)">
						<i class="el-icon-s-data"></i>
					</el-tag>
					<el-tag v-if="btnStatus.down" style="position: absolute;top: 3px;right: 8px;z-index: 10" @click="clickDownload">
						<i class="el-icon-download"></i>
					</el-tag>
				</div>
				<el-tabs type="border-card" v-model="showDefItem" @tab-click="tabChange">
					<el-tab-pane lazy :label="item.value" :name="item.id+''" :key="item.id" v-for="(item, index) of showSlotData">
						<div style="height: 600px;overflow-y: auto;">
							<slot :name='item.slot' :item='{...item, index}'></slot>
						</div>
						
					</el-tab-pane>
				</el-tabs>
		
			</el-col>
		</el-row>
	</div>
</template>

<script src="../../../js/moveMonitor/plank/Plank.js">

<style>
</style>
