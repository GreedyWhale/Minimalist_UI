<template>
  <div id="app">
    <m-menu default-active="shimban" :vertical="true" :accordion="false">
      <m-menu-item name="animation">动画</m-menu-item>
      <m-menu-item name="shimban">新番</m-menu-item>
      <m-menu-item name="demon">鬼畜</m-menu-item>
      <m-sub-menu name="entertainment">
        <template v-slot:title>娱乐</template>
        <m-menu-item name="music">音乐</m-menu-item>
        <m-menu-item name="movie">电影</m-menu-item>
        <m-menu-item name="code">编程</m-menu-item>
        <m-sub-menu name="eat">
          <template v-slot:title>吃饭</template>
          <m-menu-item name="morning">早饭</m-menu-item>
          <m-menu-item name="afternoon">中饭</m-menu-item>
          <m-menu-item name="evening">晚饭</m-menu-item>
        </m-sub-menu>
        <m-sub-menu name="eat1">
          <template v-slot:title>吃饭</template>
          <m-menu-item name="morning1">早饭</m-menu-item>
          <m-menu-item name="afternoon1">中饭</m-menu-item>
          <m-menu-item name="evening1">晚饭</m-menu-item>
        </m-sub-menu>
      </m-sub-menu>
      <m-sub-menu name="eat2">
        <template v-slot:title>吃饭</template>
        <m-menu-item name="morning2">早饭</m-menu-item>
        <m-menu-item name="afternoon2">中饭</m-menu-item>
        <m-menu-item name="evening2">晚饭</m-menu-item>
      </m-sub-menu>
    </m-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MMenu from './components/menu/index.vue';
import MMenuItem from './components/menu/item/index.vue';
import MSubMenu from './components/menu/sub/index.vue';
@Component({
  components: {
    MMenu,
    MMenuItem,
    MSubMenu
  }
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
#app {
}
</style>
