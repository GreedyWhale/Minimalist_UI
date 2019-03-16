<template>
  <div id="app">
    <div>
      <m-layout class="layout">
        <m-layout>
          <m-header class="header">header</m-header>
          <m-main class="main">main</m-main>
          <m-footer class="footer">footer</m-footer>
        </m-layout>
        <m-aside class="aside">aside</m-aside>
      </m-layout>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import MButton from "./components/button/index.vue";
import MIcon from "./components/icon/index.vue";
import MButtonGroup from "./components/buttonGroup/index.vue";
import MInput from "./components/input/index.vue";
import MRow from "@/components/grid/row/index.vue";
import MCol from "@/components/grid/col/index.vue";
import MLayout from "@/components/layout/index.vue";
import MHeader from "@/components/layout/header/index.vue";
import MMain from "@/components/layout/main/index.vue";
import MFooter from "@/components/layout/footer/index.vue";
import MAside from "@/components/layout/aside/index.vue";

@Component({
  components: {
    MButton,
    MIcon,
    MButtonGroup,
    MInput,
    MRow,
    MCol,
    MLayout,
    MHeader,
    MMain,
    MFooter,
    MAside
  }
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
