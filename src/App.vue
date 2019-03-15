<template>
  <div id="app">
    <div>
      <m-row align="space-around">
        <m-col span="6">1</m-col>
        <m-col span="6">2</m-col>
        <m-col span="6">1</m-col>
      </m-row>
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

@Component({
  components: {
    MButton,
    MIcon,
    MButtonGroup,
    MInput,
    MRow,
    MCol
  }
})
export default class App extends Vue {
  msg: string = "asdada";

  print(event: any): void {
    console.log(event, 1);
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  > div {
    border: 1px solid gold;
  }
}
</style>
