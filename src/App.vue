<template>
  <div id="app">
    <div>
      <m-input
        placeholder="测试"
        prompt-msg="姓名超过100个字"
        prompt-msg-position="down"
        :is-error-msg="true"
        suffix-button-text="按钮"
        suffix-button-icon="loading"
        prefix-icon="search"
        clearable
      ></m-input>
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
}
</style>
