<template>
  <div class="m-upload">
    <div class="m-upload__input-wrapper" @click="handleClick">
      <input
        ref="fileInput"
        class="m-upload__input"
        :multiple="multiple"
        :accept="accept"
        type="file" @change="handleChange">
      <slot></slot>
    </div>
    <div class="m-upload__tips">
      <slot name="tips"></slot>
    </div>
    <ul class="m-upload__file-list" v-if="fileList.length">
      <li class="m-upload__file" v-for="file in fileList" :key="file.uid">
        <div class="m-upload__file-info">
          {{ file.name }}
        </div>
        <div @click="handleRemove(file)">
          x
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import MIcon from "@/components/icon/index.vue";
import ajax from "./methods/ajax";
import { requestOptions } from "./methods/ajax.d";
@Component({
  name: 'MUpload',
  components: {
    MIcon
  }
})
export default class MUpload extends Vue {
  @Prop({ type: String, required: true }) action!: string;
  @Prop({ type: String, required: true }) name!: string;
  @Prop({ type: String, default: 'POST' }) method!: string;  
  @Prop({ type: Boolean, default: true }) private autoUpload!: boolean;
  @Prop({ type: Boolean, default: false }) private multiple!: boolean;
  @Prop({ type: String, default: '' }) private accept!: string;
  @Prop({ type: Array, default() { return [] } }) private defaultFileList!: any[];
  @Watch('defaultFileList', { immediate: true })
  onDefaultFileListChnaged(newValue: any[]) {
    if(newValue.length) {
      this.fileList = newValue.map((file: any) => {
        file.status = 'success';
        file.uid = Date.now() + this.tempIndex++;
        return file;
      })
    }
  }
  // data
  fileList: any[] = [];
  tempIndex: number = 1;
  // methods
  handleClick(): void {
    (this.$refs.fileInput as HTMLInputElement).click()
  }
  handleChange(event: Event): void {
    const files: FileList | null = (event.target as HTMLInputElement).files;
    if(files) {
      this.uploadFiles(files);
    }
    (this.$refs.fileInput as any).value = null;
  }
  handleRemove(file: any): void {
    const fileList = this.fileList;
    fileList.splice(fileList.indexOf(file), 1);
    this.$emit('on-remove', file, fileList);
  }
  uploadFiles(files: FileList): void {
    let fileList: File[] = Array.from(files);
    if(!this.multiple) {
      fileList = fileList.splice(0,1)
    }
    if(fileList.length) {
      fileList.forEach((file: File) => {
        this.upload(file)
      })
    }
  }
  upload(file: File): void {
    this.addFile(file);
    const options: requestOptions = {
      name: this.name,
      action: this.action,
      method: this.method,
      file
    }
    ajax(options)
      .then(res => {
        this.handleSuccess(res, file);
      })
      .catch(err => {
        this.handleError(err, file);
      })
  }
  addFile(file: any): void {
    const uid = Date.now() + this.tempIndex++;
    file.uid = uid;
    const { name, size } = file;
    const newFile: any = {
      name,
      size,
      uid,
      status: 'uploading'
    }
    try {
      newFile.url = URL.createObjectURL(file);
    } catch(e) {
      console.error('预览图片生成失败');
    }
    const fileList = this.fileList;
    fileList.push(newFile);
    this.$emit('on-change', file, fileList);
  }
  handleSuccess(res: any, file: File): void {
    const newFile = this.getFile(file);
    if(newFile) {
      newFile.status = 'success';
      this.$emit('on-success', res, newFile, this.fileList)
    }
  }
  handleError(err: any, file: File): void {
    const newFile = this.getFile(file);
    if(newFile) {
      newFile.status = 'fail';
      this.$emit('on-error', err, newFile, this.fileList)
    }
  }
  getFile(file: any): any {
    const fileList = this.fileList;
    let target: any = null;
    this.fileList.every((value: any) => {
      target = value.uid === file.uid ? value : null;
      return !target
    });
    return target;
  }
}
</script>

<style lang="scss" scoped>
.m-upload {
  &__input-wrapper {

  }
  &__input {
    display: none;
  }
}
</style>

