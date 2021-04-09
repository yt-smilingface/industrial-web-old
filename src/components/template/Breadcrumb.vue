<template>
  <el-row class="mainStyle">
    <el-col :span="24" style="height: 100%">
      <div style="height: 100%; display: flex; margin-left: 17%">
        <div style="height: 100%; display: flex">
          <span style="margin: auto"
            ><i
              class="el-icon-location"
              style="color: #0265ba; margin-right: 10px"
            ></i
            >您所在的位置：</span
          >
        </div>
        <div
          style="height: 100%; display: flex"
          v-for="(item, index) in $route.matched"
          :key="index"
        >
          <!--$route.matched 数组-->
          <div
            style="text-align: center; height: 100%; display: flex"
            class="pointer"
            :to="{ name: item.name }"
          >
            <span
              @click="handelTo(item.path)"
              v-if="index === $route.matched.length - 1"
              style="margin: auto auto; font-size: 15px; color: #000000"
              >{{ item.meta.CName }}</span
            >
            <span
              @click="handelTo(item.path)"
              v-else
              style="margin: auto auto; font-size: 15px; color: #000000"
              >{{ item.meta.CName + ">" }}</span
            >
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "breadcrumb",
  data() {
    return {};
  },
  methods: {
    handelTo(url) {
      this.$router.push(url);
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.mainStyle {
  /* width: 98.9vw; */
  height: 28px;
  opacity: 1;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
