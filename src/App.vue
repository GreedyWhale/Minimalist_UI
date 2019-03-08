<template>
  <div id="app">
    <div><MButton :options="{ iconName: 'loading' }">按钮</MButton></div>
    <div><MButton :options="{ isLoading: isLoading}" @click="print">
    <!-- <template v-slot:prefix>
      <p>Here might be a page title</p>
    </template> -->
      按钮
    </MButton></div>
    <div><MButton :options="{ iconName: 'loading', iconPosition: 'right'}">按钮</MButton></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import MButton from "./components/MButton/index.vue";

@Component({
  components: {
    HelloWorld,
    MButton
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
