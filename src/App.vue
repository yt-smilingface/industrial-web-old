<template>
  <div
    id="app"
    class="flex flex-v"
    style="width: 100%; height: 100%; margin: 0 auto"
  >
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Main from "./components/Main.vue";

export default {
  name: "App",
  components: {
    Main,
  },

  mounted() {},
};
</script>


<style>
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  !*margin-top: 60px;*!*/
/*}*/
body {
  background: #f3f6f9;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  min-width: 1346px;
  height: 100%;
  margin: 0 auto;
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
body .el-table th.gutter {
  display: table-cell !important;
}

/* 滚动条样式 */
	::-webkit-scrollbar {/*滚动条整体样式*/
		width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}

	::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
		border-radius: 5px;
		background: #ccc;
	}
	::-webkit-scrollbar-track {/*滚动条里面轨道*/
		border-radius: 5px;
		background: #EDEDED;
	}

</style>
