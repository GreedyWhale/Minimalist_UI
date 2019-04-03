<template>
  <div id="app">
    <m-menu default-active="shimban">
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
      </m-sub-menu>
    </m-menu>
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
import MMenu from "@/components/menu/index.vue";
import MMenuItem from "@/components/menu/item/index.vue";
import MSubMenu from "@/components/menu/sub/index.vue";

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
    MSwiperItem,
    MMenu,
    MMenuItem,
    MSubMenu
  }
})
export default class App extends Vue {
  a(event: any): void {}
  aaa = ['huoying'];
  test_data = [
    {
      label: "火影",
      value: "huoying",
      children: [
        {
          label: "雏田",
          value: "chutian"
        },
        {
          label: "自来也",
          value: "zilaiye"
        },
        {
          label: "佩恩",
          value: "peien",
          children: []
        }
      ]
    },
    {
      label: "银魂",
      value: "yinhun",
      children: [
        {
          label: "坂田银时",
          value: "bantianyinshi"
        },
        {
          label: "神乐",
          value: "shenle"
        },
        {
          label: "志村新八",
          value: "zhicunxinba"
        }
      ]
    }
  ];
}
</script>

<style lang="scss">
#app {
}
</style>
