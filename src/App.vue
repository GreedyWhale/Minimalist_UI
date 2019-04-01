<template>
  <div id="app">
    <div class="box">
      <m-swiper :initIndex='0'>
        <m-swiper-item>1</m-swiper-item>
        <m-swiper-item>2</m-swiper-item>
        <m-swiper-item>3</m-swiper-item>
      </m-swiper>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import MButton from "./components/button/index.vue";
import MIcon from "./components/icon/index.vue";
import MButtonGroup from "./components/button-group/index.vue";
import MInput from "./components/input/index.vue";
import MRow from "@/components/grid/row/index.vue";
import MCol from "@/components/grid/col/index.vue";
import MLayout from "@/components/layout/index.vue";
import MHeader from "@/components/layout/header/index.vue";
import MMain from "@/components/layout/main/index.vue";
import MFooter from "@/components/layout/footer/index.vue";
import MAside from "@/components/layout/aside/index.vue";
import MToast from "@/components/toast/index.vue";
import MTabs from "@/components/tabs/index.vue";
import MTabsHead from "@/components/tabs/head/index.vue";
import MTabsItem from "@/components/tabs/item/index.vue";
import MTabsBody from "@/components/tabs/body/index.vue";
import MTabsPane from "@/components/tabs/pane/index.vue";
import MPopover from "@/components/popover/index.vue";
import MCollapse from "@/components/collapse/index.vue";
import MCollapseItem from "@/components/collapse/item/index.vue";
import MCascader from "@/components/cascader/index.vue";
import MCascaderItem from "@/components/cascader/item/index.vue";
import MSwiper from "@/components/swiper/index.vue";
import MSwiperItem from "@/components/swiper/item/index.vue";
import tsetData from "../testdata";

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
    MAside,
    MToast,
    MTabs,
    MTabsHead,
    MTabsItem,
    MTabsBody,
    MTabsPane,
    MPopover,
    MCollapse,
    MCollapseItem,
    MCascader,
    MCascaderItem,
    MSwiper,
    MSwiperItem
  }
})
export default class App extends Vue {
  
}
</script>

<style lang="scss">
#app {
  .box {
    width: 300px;
  }
}
</style>
