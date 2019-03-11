<template>
  <div id="app">
    <MButton
      :options="{
        type: 'solid',
        isLoading: true,
        shape: 'rounded',
        iconPosition: 'right'
      }"
    >
      按钮
    </MButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MButton from "./components/MButton/index.vue";
import MIcon from "./components/MIcon/index.vue";

@Component({
  components: {
    MButton,
    MIcon
  }
})
export default class App extends Vue {
  isLoading: boolean = false;
  print() {
    this.isLoading = !this.isLoading;
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
