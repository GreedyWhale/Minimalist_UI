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
    <m-upload-file-card
      v-if="listType === 'card'"
      :fileList="fileList"
      :limit="limit"
      ></m-upload-file-card>
    <m-upload-file-list
      v-else
      :fileList="fileList"
      :listType="listType"
      @on-file-preview="handlePreview"
      @on-file-remove="handleRemove"></m-upload-file-list>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import MUploadFileList from "./list/index.vue";
import MUploadFileCard from "./card/index.vue";
import ajax from "./methods/ajax";
import { requestOptions } from "./methods/ajax.d";
function empty() {}
@Component({
  name: 'MUpload',
  components: {
    MUploadFileList,
    MUploadFileCard
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
  @Prop({ type: Function, default: empty }) private beforeRemove!: (file: any, fileList: any[]) => any;
  @Prop({ type: Function, default: empty }) private beforeUpload!: (file: any, fileList: any[]) => any;
  @Prop({ type: Object, default(){ return {} } }) private headers!: Object;
  @Prop({ type: Boolean, default: false }) private withCredentials!: boolean;
  @Prop({ type: String, default: '' }) private listType!: string;
  @Prop({ type: Number }) private size!: number;
  @Prop({ type: Number, default: 0 }) private limit!: number;
  @Watch('defaultFileList', { immediate: true })
  onDefaultFileListChnaged(newValue: any[]) {
    if(newValue.length) {
      this.fileList = newValue.map((file: any) => {
        file.status = file.status || 'success';
        file.uid = Date.now() + this.tempIndex++;
        file.percentage = 100;
        return file;
      })
    }
  }
  // data
  fileList: any[] = [];
  tempIndex: number = 1;
  showProgressTimer: any;
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
    const doRemove = () => {
      const fileList = this.fileList;
      fileList.splice(fileList.indexOf(file), 1);
      this.$emit('on-remove', file, fileList);
    }
    if(this.beforeRemove && typeof this.beforeRemove === 'function') {
      const before = this.beforeRemove(file, this.fileList);
      if(before && before.then) {
        before.then(() => {
          doRemove();
        }, empty);
      } else if(before !== false) {
        doRemove();
      }
    } else {
      doRemove();
    }
  }
  handlePreview(file: any): void {
    this.$emit('on-preview', file, this.fileList);
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
    if(!this.canUpload(file)) {
      return;
    }
    this.addFile(file);
    if(this.beforeUpload && typeof this.beforeUpload === 'function') {
      const before = this.beforeUpload(file, this.fileList);
      if(before && before.then) {
        before.then((processedFile: any) => {
          if (Object.prototype.toString.call(processedFile) === '[object File]') {
            this.doUpload(processedFile);
          } else {
            this.doUpload(file);
          }
        })
      } else if (before !== false) {
        this.doUpload(file);
      }
    } else {
      this.doUpload(file);
    }
  }
  doUpload(file: File): void {
    const options: requestOptions = {
      name: this.name,
      action: this.action,
      method: this.method,
      headers: this.headers,
      withCredentials: this.withCredentials,
      file,
      onProgress: (e) => this.handleProgress(e, file)
    }
    ajax(options)
      .then(res => {
        this.handleSuccess(res, file);
      })
      .catch(err => {
        this.handleError(err, file);
      })
  }
  canUpload(file: File): boolean {
    const { size } = file;
    if (this.size) {
      if (size > this.size * 1024) {
          this.$emit('on-exceeded-size', file, this.fileList);
          return false;
      }
    }
    if (this.limit) {
      if (this.limit <= this.fileList.length) {
          this.$emit('on-exceeded', file, this.fileList);
          return false;
      }
    }
    return true;
  }
  addFile(file: any): void {
    const uid = Date.now() + this.tempIndex++;
    file.uid = uid;
    const { name, size } = file;
    const newFile: any = {
      name,
      size,
      uid,
      status: 'uploading',
      showProgress: true
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
      this.$emit('on-success', res, newFile, this.fileList);
      this.showProgressTimer = setTimeout(() => {
        newFile.showProgress = false;
      }, 1000)
    }
  }
  handleError(err: any, file: File): void {
    const newFile = this.getFile(file);
    if(newFile) {
      newFile.status = 'fail';
      newFile.showProgress = 'false';
      this.$emit('on-error', err, newFile, this.fileList)
    }
  }
  handleProgress(e: ProgressEvent, file: File): void {
    const newFile = this.getFile(file);
    if(newFile) {
      newFile.percentage = e.loaded / e.total * 100;
      this.$emit('on-progress', newFile, this.fileList)
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
  &__input {
    display: none;
  }
  &__tips {
    font-size: 14px;
    padding-top: 10px;
    color: #606266;
  }
}
</style>

