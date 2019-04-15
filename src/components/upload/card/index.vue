<template>
  <div class="m-upload__card">
    <ul class="m-carl__list">
      <li
        class="m-carl__item"
        @mouseenter="onMouseEnter(file, index)"
        @mouseleave="onMouseLeave(file)"
        v-for="(file, index) in fileList" :key="file.uid">
        <div class="m-carl__item-floating-layer" v-if="activeFloatingLayer === index">
          <m-icon icon="preview" @on-click="onPreview(file)"></m-icon>
          <m-icon icon="delete" @on-click="onDelete(file)"></m-icon>
        </div>
        <img :src="file.url" v-if="file.url">
      </li>
      <li class="m-carl__item" v-if="visibleUploadBtn" @click="onUpload">
        <m-icon icon="add"></m-icon>
      </li>
    </ul>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import MIcon from "@/components/icon/index.vue";
@Component({
  name: 'MUploadFileCard',
  components: {
    MIcon
  }
})
export default class MUploadFileCard extends Vue {
  @Prop({ type: Array, default(){ return [] } }) private fileList!: any[];
  @Prop({ type: Number }) private limit!: number;
  // data
  activeFloatingLayer: number | null = null;
  // computed
  get visibleUploadBtn(): boolean {
    if(this.limit) {
      return this.limit > this.fileList.length;
    }
    return true;
  }
  // methods
  onMouseEnter(file: any, index: number): void {
    if(file.url) {
      this.activeFloatingLayer = index;
    }
  }
  onMouseLeave(): void {
    if(this.activeFloatingLayer !== null) {
      this.activeFloatingLayer = null;
    }
  }
  onUpload(): void {
    (this.$parent as any).handleClick && (this.$parent as any).handleClick();
  }
  onPreview(file: any): void {
    (this.$parent as any).handlePreview && (this.$parent as any).handlePreview(file);
  }
  onDelete(file: any): void {
    (this.$parent as any).handleRemove && (this.$parent as any).handleRemove(file);
    this.onMouseLeave();
  }
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
$blue: #2d8cf0;
.m-upload__card {
  padding-top: 5px;
  .m-carl__list {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    &, .m-carl__item {
      list-style: none;
    }
    .m-carl__item {
      position: relative;
      width: 60px;
      height: 60px;
      border: 1px dashed #dcdee2; 
      margin-right: 5px;
      border-radius: $borderRadius;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      overflow: hidden;
      user-select: none;
      img {
        height: 100%;
        width: 100%;
      }
      &:hover {
        border-color: $blue;
      }
      &-floating-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background: rgba(0,0,0,.6);
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 5px;
        color: #fff;
        .m-icon {
          padding: 5px;
          flex: 1;
          &:hover {
            color: $blue;
          }
        }
      }
    }
  }
}
</style>
