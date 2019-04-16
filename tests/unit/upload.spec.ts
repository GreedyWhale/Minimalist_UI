import { shallowMount, mount } from "@vue/test-utils";
import { expect } from "chai";
import sinon from "sinon";
import MUpload from "@/components/upload/index.vue";
import http from "@/components/upload/methods/ajax";

let stub: any;
describe("m-upload.vue", () => {
  afterEach(() => {
    stub.restore && stub.restore();
  });
  it("MUpload组件可以上传文件", done => {
    stub = sinon.stub(http, "ajax").callsFake(options => {
      return Promise.resolve({ stat: 1 });
    });
    const wrapper = mount(MUpload, {
      propsData: {
        action: "/upload",
        name: "file"
      }
    });
    wrapper.vm.$on("on-success", () => {
      const newFile = wrapper.vm.$data.fileList[0];
      expect(newFile.name).to.equal("success.png");
      expect(newFile.status).to.equal("success");
      done();
    });
    const file = new File(["123131231"], "success.png");
    (wrapper.vm as any).handleChange({ target: { files: [file] } });
  });
  it("MUpload组件可以删除已上传文件", () => {
    stub = sinon.stub(http, "ajax").callsFake(options => {
      return Promise.resolve({ stat: 1 });
    });
    const wrapper = mount(MUpload, {
      sync: true,
      propsData: {
        action: "/upload",
        name: "file"
      },
      slots: {
        default: ["<button> click me </button>"]
      }
    });
    const onRemove = sinon.spy();
    wrapper.vm.$on("on-remove", onRemove);
    const file = new File(["123131231"], "success.png");
    (wrapper.vm as any).handleChange({ target: { files: [file] } });
    const item = wrapper.find(".m-upload__file .remove-icon");
    item.trigger("click");
    expect(onRemove.called).to.be.true;
  });
  it("MUpload组件接受limit & multiple", done => {
    stub = sinon.stub(http, "ajax").callsFake(options => {
      return Promise.resolve({ stat: 1 });
    });
    const wrapper = mount(MUpload, {
      sync: true,
      propsData: {
        action: "/upload",
        name: "file",
        multiple: true,
        limit: 2
      },
      slots: {
        default: ["<button> click me </button>"]
      }
    });
    const file = new File(["123131231"], "success.png");
    const file1 = new File(["123131231"], "success1.png");
    const file2 = new File(["123131231"], "success2.png");
    (wrapper.vm as any).handleChange({
      target: { files: [file, file1, file2] }
    });
    const onSuccess = sinon.spy();
    wrapper.vm.$on("on-success", onSuccess);
    setTimeout(() => {
      expect(onSuccess.callCount).to.equal(2);
      done();
    }, 0);
  });
});
