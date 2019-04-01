<template>
  <div class="swiper-item">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  name: 'MSwiperItem'
})
export default class MSwiperItem extends Vue {

}
</script>

<style lang="scss" scoped>
.swiper-item {
  flex: none;
  width: 100%;
  height: 150px;
  background: palevioletred;
}
</style>


