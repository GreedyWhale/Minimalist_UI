import { shallowMount, mount } from "@vue/test-utils";
import { expect } from "chai";
import sinon from "sinon";
import MToast from "@/components/toast/index.vue";

describe("m-toast.vue", () => {
  it("MToast组件接受enbleHtml", () => {
    const wrapper = shallowMount(MToast, {
      propsData: {
        enbleHtml: true
      },
      slots: {
        default: ['<p class="test">测试</p>']
      }
    });
    expect(wrapper.contains("p.test")).to.be.true;
  });
  it("MToast组件接受showCloseButton", () => {
    const wrapper = shallowMount(MToast, {
      propsData: {
        showCloseButton: true
      }
    });
    expect(wrapper.contains(".close-button")).to.be.true;
  });
  it("MToast组件接受 autoClose ", () => {
    const wrapper = shallowMount(MToast, {
      propsData: {
        autoClose: false
      }
    });
    expect(wrapper.props("autoClose")).to.be.false;
  });
  it("MToast组件接受 delayTime ", () => {
    const wrapper = shallowMount(MToast, {
      propsData: {
        delayTime: 500
      }
    });
    expect(wrapper.props("delayTime")).to.equal(500);
  });
  it("MToast组件接受 position ", () => {
    const wrapper = shallowMount(MToast, {
      propsData: {
        position: "left"
      }
    });
    expect(wrapper.contains('[data-position="left"]')).to.true;
  });
  it("MToast组件可以设置icon ", () => {
    const wrapper = mount(MToast, {
      propsData: {
        icon: "success"
      }
    });
    expect(wrapper.find(".icon use").attributes("href")).to.equal(
      "#icon-success"
    );
  });
  it("MToast组件可以响应close事件 ", () => {
    const spy = sinon.spy();
    const wrapper = mount(MToast, {
      propsData: {
        onClose: spy,
        showCloseButton: true
      }
    });
    wrapper.find(".close-button").trigger("click");
    expect(spy.called).to.be.true;
  });
});
