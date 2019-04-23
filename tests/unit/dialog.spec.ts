import { shallowMount, mount } from "@vue/test-utils";
import { expect } from "chai";
import sinon from "sinon";
import MDialog from "@/components/dialog/index.vue";

describe("m-dialog.vue", () => {
  it("MDialog组件接受title", () => {
    const wrapper = shallowMount(MDialog, {
      propsData: {
        title: "标题",
        visibleDialog: true
      }
    });
    const title = wrapper.find(".m-dialog__header p");
    expect(title.text()).to.equal("标题");
  });
  it("MDialog组件的默认slot为对话窗内容", () => {
    const wrapper = shallowMount(MDialog, {
      propsData: {
        title: "标题",
        visibleDialog: true
      },
      slots: {
        default: ['<p class="content">内容</p>']
      }
    });
    const content = wrapper.find(".m-dialog__body .content");
    expect(content.text()).to.equal("内容");
  });
  it("MDialog组件接受confirmButtonText && cancelButtonText", () => {
    const wrapper = mount(MDialog, {
      propsData: {
        title: "标题",
        visibleDialog: true,
        confirmButtonText: "啊咧",
        cancelButtonText: "死阔以"
      }
    });
    const buttons = wrapper.findAll(".m-dialog__footer-btns button");
    expect(buttons.at(0).text()).to.equal("死阔以");
    expect(buttons.at(1).text()).to.equal("啊咧");
  });
  it("MDialog组件接受visibleFooter", () => {
    const wrapper = mount(MDialog, {
      propsData: {
        title: "标题",
        visibleDialog: true,
        confirmButtonText: "啊咧",
        cancelButtonText: "死阔以",
        visibleFooter: false
      }
    });
    const buttons = wrapper.findAll(".m-dialog__footer-btns button");
    expect(buttons.exists()).to.be.false;
  });
  it("MDialog组件可以自定义头部", () => {
    const wrapper = mount(MDialog, {
      propsData: {
        visibleDialog: true
      },
      slots: {
        header: "<h3>雪之下雪乃赛高</h3>"
      }
    });
    const title = wrapper.find(".m-dialog__header h3");
    expect(title.text()).to.equal("雪之下雪乃赛高");
  });
  it("MDialog组件可以自定义页脚", () => {
    const wrapper = mount(MDialog, {
      propsData: {
        visibleDialog: true,
        visibleFooter: false
      },
      slots: {
        footer: "<div>我买团子股</div>"
      }
    });
    const footer = wrapper.find(".m-dialog__footer div");
    expect(footer.text()).to.equal("我买团子股");
  });
  it("MDialog组件可以响应on-close, on-confirm, on-cancel事件", () => {
    const wrapper = mount(MDialog, {
      propsData: {
        visibleDialog: true,
        title: "测试"
      }
    });
    const closeHandler = sinon.spy();
    const confirmHandler = sinon.spy();
    const cancelHandler = sinon.spy();
    wrapper.vm.$on("on-close", closeHandler);
    wrapper.vm.$on("on-confirm", confirmHandler);
    wrapper.vm.$on("on-cancel", cancelHandler);
    const close = wrapper.find(".m-dialog__header .m-icon");
    const buttons = wrapper.findAll(".m-dialog__footer-btns button");
    close.trigger("click");
    buttons.at(0).trigger("click");
    buttons.at(1).trigger("click");
    expect(closeHandler.called).to.be.true;
    expect(confirmHandler.called).to.be.true;
    expect(cancelHandler.called).to.be.true;
  });
});
