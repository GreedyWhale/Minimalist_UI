<template>
  <div class="m-upload">
    <div
      class="m-upload__input-wrapper"
      @click="handleClick"
      @dragenter.prevent="emptyFn"
      @dragover.prevent="emptyFn"
      @drop.prevent="onDrop"
    >
      <input
        ref="fileInput"
        class="m-upload__input"
        :multiple="multiple"
        :accept="accept"
        type="file"
        @change="handleChange"
      />
      <slot></slot>
    </div>
    <slot name="submit" :submit="submitFiles"></slot>
    <div class="m-upload__tips">
      <slot name="tips"></slot>
    </div>
    <m-upload-file-card
      v-if="listType === 'card'"
      :fileList="fileList"
      :limit="limit"
    ></m-upload-file-card>
    <m-upload-file-list
      v-else-if="visibleFileList"
      :fileList="fileList"
      :listType="listType"
      @on-file-preview="handlePreview"
      @on-file-remove="handleRemove"
    ></m-upload-file-list>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import MUploadFileList from "./list/index.vue";
import MUploadFileCard from "./card/index.vue";
import http from "./methods/ajax";
import { requestOptions } from "./methods/ajax.d";

@Component({
  name: "MUpload",
  components: {
    MUploadFileList,
    MUploadFileCard
  }
})
export default class MUpload extends Vue {
  @Prop({ type: String, required: true }) action!: string;
  @Prop({ type: String, required: true }) name!: string;
  @Prop({ type: String, default: "POST" }) method!: string;
  @Prop({ type: Boolean, default: true }) private autoUpload!: boolean;
  @Prop({ type: Boolean, default: false }) private multiple!: boolean;
  @Prop({ type: String, default: "" }) private accept!: string;
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  private defaultFileList!: any[];
  @Prop({ type: Function }) private beforeRemove!: (
    file: any,
    fileList: any[]
  ) => any;
  @Prop({ type: Function }) private beforeUpload!: (
    file: any,
    fileList: any[]
  ) => any;
  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  private headers!: Object;
  @Prop({ type: Boolean, default: false }) private withCredentials!: boolean;
  @Prop({ type: String, default: "" }) private listType!: string;
  @Prop({ type: Number }) private size!: number;
  @Prop({ type: Number }) private limit!: number;
  @Prop({ type: Boolean, default: true }) private visibleFileList!: boolean;
  @Watch("defaultFileList", { immediate: true })
  onDefaultFileListChnaged(newValue: any[]) {
    if (newValue.length) {
      this.fileList = newValue.map((file: any) => {
        file.status = file.status || "success";
        file.uid = Date.now() + this.tempIndex++;
        file.percentage = 100;
        return file;
      });
      this.compareLength = newValue.length;
    }
  }
  // data
  fileList: any[] = [];
  tempIndex: number = 1;
  showProgressTimer: any;
  emptyFn: Function = () => {};
  copyFileList: File[] = [];
  compareLength: number = 0;
  // methods
  onDrop(e: DragEvent): void {
    const dt = e.dataTransfer;
    if (dt) {
      this.$emit("on-drop", dt.files);
      this.uploadFiles(dt.files);
    }
  }
  handleClick(): void {
    (this.$refs.fileInput as HTMLInputElement).click();
  }
  handleChange(event: Event): void {
    const files: FileList | null = (event.target as HTMLInputElement).files;
    this.$emit("selected-files", files);
    if (files) {
      this.uploadFiles(files);
    }
  }
  getFileIndex(fileList: any[], file: any): number | null {
    if (!fileList.length) {
      return null;
    }
    let index: number = 0;
    fileList.some((value: any, idx: number) => {
      if (value.uid === file.uid) {
        index = idx;
        return true;
      }
      return false;
    });
    return index;
  }
  handleRemove(file: any): void {
    const doRemove = () => {
      const fileList = this.fileList;
      const removeFileIndex = this.getFileIndex(fileList, file);
      if (removeFileIndex !== null) {
        fileList.splice(removeFileIndex, 1);
      }
      if (this.copyFileList && this.copyFileList.length) {
        const removeCopyFileIndex = this.getFileIndex(this.copyFileList, file);
        if (removeCopyFileIndex !== null) {
          this.copyFileList.splice(removeCopyFileIndex, 1);
        }
      }
      const successed = fileList.filter(
        (fileItem: any) => fileItem.status === "success"
      );
      if (this.compareLength !== successed.length) {
        this.compareLength--;
      }
      this.$emit("on-remove", file, fileList);
    };
    if (this.beforeRemove && typeof this.beforeRemove === "function") {
      const before = this.beforeRemove(file, this.fileList);
      if (before && before.then) {
        before.then(() => {
          doRemove();
        }, this.emptyFn);
      } else if (before !== false) {
        doRemove();
      }
    } else {
      doRemove();
    }
  }
  handlePreview(file: any): void {
    this.$emit("on-preview", file, this.fileList);
  }
  uploadFiles(files: FileList): void {
    let fileList: File[] = Array.from(files);
    if (!this.multiple) {
      fileList = fileList.splice(0, 1);
    }
    if (fileList.length) {
      if (!this.autoUpload) {
        this.copyFileList = fileList.concat(this.copyFileList);
      }
      fileList.forEach((file: File) => {
        this.addFile(file).then(() => {
          this.autoUpload && this.upload(file);
        });
      });
    }
  }
  upload(file: File): void {
    (this.$refs.fileInput as any).value = null;
    if (!this.canUpload(file)) {
      return;
    }
    if (this.beforeUpload && typeof this.beforeUpload === "function") {
      const before = this.beforeUpload(file, this.fileList);
      if (before && before.then) {
        before.then((processedFile: any) => {
          if (
            Object.prototype.toString.call(processedFile) === "[object File]"
          ) {
            this.doUpload(processedFile);
          } else {
            this.doUpload(file);
          }
        });
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
      onProgress: e => this.handleProgress(e, file)
    };
    http
      .ajax(options)
      .then(res => {
        this.handleSuccess(res, file);
      })
      .catch(err => {
        this.handleError(err, file);
      });
  }
  canUpload(file: File): boolean {
    const { size } = file;
    if (this.size) {
      if (size > this.size * 1024) {
        this.$emit("on-exceeded-size", file, this.fileList);
        const err: any = new Error(
          `上传文件大小：${size / 1024} kb，超出指定大小：${this.size} kb`
        );
        this.handleError(err, file);
        return false;
      }
    }
    const compareLength = this.compareLength + 1;
    this.compareLength = compareLength;
    if (this.limit && this.limit < compareLength) {
      this.$emit("on-exceeded", file, this.fileList);
      const err: any = new Error(`上传文件数量超出指定数量：${this.limit}`);
      this.handleError(err, file);
      return false;
    }
    return true;
  }
  addFile(file: any): Promise<any> {
    return new Promise(resolve => {
      const uid = Date.now() + this.tempIndex++;
      file.uid = uid;
      const { name, size } = file;
      const newFile: any = {
        name,
        size,
        uid,
        status: "uploading",
        showProgress: true
      };
      try {
        newFile.url = URL.createObjectURL(file);
      } catch (e) {
        console.error("预览图片生成失败");
      }
      const fileList = this.fileList;
      fileList.push(newFile);
      resolve();
    });
  }
  handleSuccess(res: any, file: File): void {
    const newFile = this.getFile(file);
    if (newFile) {
      newFile.status = "success";
      this.$emit("on-success", res, newFile, this.fileList);
      this.hideProgress(newFile);
    }
  }
  handleError(err: any, file: File): void {
    const newFile = this.getFile(file);
    if (newFile) {
      newFile.status = "fail";
      this.$emit("on-error", err, newFile, this.fileList);
      this.hideProgress(newFile);
    }
  }
  handleProgress(e: ProgressEvent, file: File): void {
    const newFile = this.getFile(file);
    if (newFile) {
      newFile.percentage = (e.loaded / e.total) * 100;
      this.$emit("on-progress", newFile, this.fileList);
    }
  }
  getFile(file: any): any {
    const fileList = this.fileList;
    let target: any = null;
    this.fileList.every((value: any) => {
      target = value.uid === file.uid ? value : null;
      return !target;
    });
    return target;
  }
  submitFiles(): void {
    if (this.copyFileList && this.copyFileList.length) {
      while (this.copyFileList.length) {
        const file = this.copyFileList.shift();
        if (file) {
          this.upload(file);
        }
      }
    }
  }
  hideProgress(newFile: any): void {
    this.showProgressTimer = setTimeout(() => {
      newFile.showProgress = false;
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
.m-upload {
  &__input-wrapper {
    display: inline-flex;
    vertical-align: middle;
  }
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
