<template>
  <div id="app">
    <MInput
      v-model="msg"
      :placeholder="`啦啦啦`"
      @on-enter="print"
      suffix-icon="search"
      prefix-icon="search"
    />
    <MInput
      v-model="msg"
      :placeholder="`啦啦啦`"
      @on-enter="print"
      @click-suffix-icon="print"
    >
      <template v-slot:suffixIcon>
        123
      </template>
    </MInput>
    <MInput prefix-button-text="搜索" clearable v-model="msg">
      <template v-slot:suffixContent>
        asdadasd
      </template>
      <template v-slot:prefixContent>
        asdadasd
      </template>
    </MInput>
    <MIcon icon="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import MButton from "./components/MButton/index.vue";
import MIcon from "./components/MIcon/index.vue";
import MButtonGroup from "./components/MButtonGroup/index.vue";
import MInput from "./components/MInput/index.vue";

@Component({
  components: {
    MButton,
    MIcon,
    MButtonGroup,
    MInput
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
    display: inline-flex;
    margin: 10px;
  }
}
</style>
