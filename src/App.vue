<template>
  <div id="app">
    <m-dialog
      title="测试"
      v-model="vis"
      @on-close="a"
      @on-confirm="a"
      @on-cancel="a"
    >
      内容
    </m-dialog>
    <button @click="vis = !vis">点我</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import MDialog from "./components/dialog/index.vue";
@Component({
  components: {
    MDialog
  }
})
export default class App extends Vue {
  value: string = "";
  vis: boolean = false;
  list: number[] = Array.from({ length: 100 }, (v, i) => i);
  a(eventName: string) {
    console.log(eventName);
  }
  b() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const last = this.list[this.list.length - 1];
        for (let i = 1; i < 11; i++) {
          this.list.push(last + i);
        }
        resolve();
      }, 5000);
    });
  }
}
</script>

<style lang="scss" scoped>
#app {
}
</style>
