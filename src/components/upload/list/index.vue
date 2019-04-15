<template>
  <ul class="m-upload__file-list" v-if="fileList.length">
    <li
      class="m-upload__file" :data-status="file.status"
      v-for="file in fileList" :key="file.uid">
      <div class="m-upload__file-item">
        <div class="m-upload__file-info flex-align__center" @click="handleClick(file)">
          <m-icon icon="file" v-if="listType !== 'picture'"></m-icon>
          <img :src="file.url" v-if="listType === 'picture' && file.url" class="m-upload__file-img">
          <div class="m-upload__file-name">{{ file.name }}</div>
        </div>
        <div
          @click="handleRemove(file)"
          class="remove-icon flex-align__center">
          <m-icon icon="close"></m-icon>
        </div>
      </div>
      <div
        v-if="file.showProgress"
          class="m-upload__file-progress"
        :style="`width: ${file.percentage}%`"></div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import MIcon from "@/components/icon/index.vue";
@Component({
  name: 'MUploadFileList',
  components: {
    MIcon
  }
})
export default class MUploadFileList extends Vue {
  @Prop({ type: Array, default() { return [] } }) private fileList!: any[];
  @Prop({ type: String, default: '' }) private listType!: string;
  // methods
  handleClick(file: any): void {
    this.$emit('on-file-preview', file)
  }
  handleRemove(file: any): void {
    this.$emit('on-file-remove', file)
  }
}
</script>

<style lang="scss" scoped>
.flex-align__center {
  display: flex;
  align-items: center;
}
.m-upload__file-list {
  padding: 10px 0 0 0;
  margin: 0;
  overflow: hidden;
  &, li {
    list-style: none;
  }
}
.m-upload__file {
  margin-bottom: 10px;
  cursor: pointer;
  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-info {
    flex: 1;
  }
  &-name {
    margin-left: 5px;
  }
  &-img {
    width: 50px;
    height: 50px;
    margin-right: 5px;
  }
  &-progress {
    width: 0;
    height: 2px;
    background: rgb(1, 100, 1);
    transition: all 1s ease-in-out;
    margin-top: 2px;
  }
  .remove-icon {
    padding: 0 10px;
  }
  &:hover {
    background: #f5f7fa;
  }
  &[data-status="success"] {
    .m-upload__file-info {
      color: rgb(3, 99, 3);
    }
  }
  &[data-status="fail"] {
    color: rgb(201, 4, 4);
  }
}
</style>
