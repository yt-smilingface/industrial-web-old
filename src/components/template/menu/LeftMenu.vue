<template>
	<div class="menuClass">
		<div :key="index" v-for="(itemOne, index) of menuTitle.data">
			<div class="levelOneClass" @click="changeMenuStatus(itemOne)">
				<div class="textTyle">{{itemOne.directoryName}}</div>
        <div style="height: 100%;display: flex;align-items: center;margin-right: 10px;">
							<img v-if="itemOne.status === 1" style="width: 9px;height: 11px;" src="../../../assets/moveMonitor/menuPointer.png"></img>
							<img v-else style="width: 9px;height: 11px;transform: rotate(180deg);" src="../../../assets/moveMonitor/menuPointer.png"/>
				</div>
			</div>
			<div v-if="itemOne.status === 1">
				<div :key="index2" v-for="(itemTwo, index2) of itemOne.childMenu">
          <div v-if="itemTwo.childMenu">
            <div class="levelTwoClass" @click="changeMenuStatus(itemTwo)">
						<div style="height: 100%;display: flex;align-items: center;margin-right: 10px;">
							<img style="width: 23px;height: 20px;" src="../../../assets/hgjjjc-icon.png"/>
						</div>
						<span class="textTyle">{{itemTwo.directoryName}}</span>
						<div style="height: 100%;display: flex;align-items: center;margin-left: auto;margin-right: 10px;">
							<img v-if="itemTwo.status === 1" style="width: 9px;height: 11px;" src="../../../assets/moveMonitor/menuPointer.png"></img>
							<img v-else style="width: 9px;height: 11px;transform: rotate(180deg);" src="../../../assets/moveMonitor/menuPointer.png"/>
						</div>
					</div>
					<div v-if="itemTwo.status === 1">
						<div :key="itemThree.id" v-for="(itemThree) of itemTwo.childMenu">
							<div v-if="itemThree.status===1" class="levelThreeClassChoose" @click="changeMenuStatus(itemThree)">
								<div class="textTyle">{{itemThree.directoryName}}</div>
							</div>
							<div v-else class="levelThreeClass" @click="changeMenuStatus(itemThree)">
								<div class="textTyle">{{itemThree.directoryName}}</div>
							</div>
							
						</div>
					</div>
          </div>
					<div v-else>
					<div :key="itemTwo.id">
						<div v-if="itemTwo.status===1" class="levelThreeClassChoose" @click="changeMenuStatus(itemTwo)">
							<div class="textTyle">{{itemTwo.directoryName}}</div>
						</div>
						<div v-else class="levelThreeClass" @click="changeMenuStatus(itemTwo)">
							<div class="textTyle">{{itemTwo.directoryName}}</div>
						</div>
					</div>
				</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script src="../../js/menu/LeftMenu.js"/>

<style>
.menuClass {
  width: 20vw;
  height: 100%;
  border: 1px solid #9ed0e5;
  background: #ffffff;
  opacity: 1;
  /*border-top-right-radius: 10px;*/
  /*border-top-left-radius: 10px;*/
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
  overflow-y: scroll;
}

.levelOneClass {
  width: 100%;
  height: 35px;
  border: 1px solid #57c0ed;
  background: linear-gradient(360deg, #40a0d0 0%, #64b5e2 100%);
  /*background: #0265ba;*/
  opacity: 1;
  display: flex;
  cursor: pointer;

  /*border-top-right-radius: 10px;*/
  /*border-top-left-radius: 10px;*/
}
.levelOneClass .textTyle {
  color: #ffffff;
  text-align: right;
  margin: auto auto;
  font-size: 17px;
  cursor: pointer;
}
.levelTwoClass {
  width: 100%;
  height: 38px;
  background: linear-gradient(360deg, #d0eaf7 0%, #ebf4f9 100%);
  opacity: 1;
  font-family: PingFang SC;
  display: flex;
  cursor: pointer;
}
.levelTwoClass .textTyle {
  color: #066b95;
  /*color: #000000;*/
  text-align: center;
  height: 100%;
  font-family: PingFang SC, PingFang SC-Medium;
  font-size: 15px;
  line-height: 38px;
  height: 38px;
  cursor: pointer;
}
.levelThreeClass {
  width: 100%;
  height: 28px;
  opacity: 1;
  display: flex;
  cursor: pointer;
}
.levelThreeClassChoose {
  width: 100%;
  height: 28px;
  opacity: 1;
  display: flex;
  cursor: pointer;
  background: linear-gradient(90deg, #0265ba 38%, rgba(255, 255, 255, 0.28));
}
.levelThreeClass .textTyle {
  font-size: 14px;
  font-family: PingFang SC;
  color: #006699;
  /*color: #000000;*/
  opacity: 1;
  margin: auto auto auto 35px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.levelThreeClassChoose .textTyle {
  font-size: 15px;
  font-family: PingFang SC;
  color: #ffffff;
  opacity: 1;
  margin: auto auto auto 35px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
