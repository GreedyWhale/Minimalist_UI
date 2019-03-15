import { expect } from "chai";
import { shallowMount, mount } from "@vue/test-utils";
import sinon from "sinon";
import MButton from "@/components/button/index.vue";
import MIcon from "@/components/icon/index.vue";

describe("button,vue", () => {
  it("MButton组件存在", () => {
    const wrapper = shallowMount(MButton, {
      slots: {
        default: "按钮"
      }
    });
    expect(wrapper.exists()).to.be.true;
    expect(wrapper.text()).to.equal("按钮");
  });
  it("MButton组件接受options", () => {
    const wrapper = shallowMount(MButton, {
      propsData: {
        options: {
          type: "solid",
          shape: "rounded",
          color: "purple",
          disable: true,
          iconPosition: "right",
          isLoading: true
        }
      }
    });
    const button = wrapper.findAll("button").at(0);
    expect(button.attributes("data-type")).to.equal("solid");
    expect(button.attributes("data-shape")).to.equal("rounded");
    expect(button.attributes("data-color")).to.equal("purple");
    expect(button.attributes("data-disable")).to.equal("true");
    expect(button.attributes("data-position")).to.equal("right");
  });
  it("MButton组件可以设置icon", () => {
    const wrapper = mount(MButton, {
      propsData: {
        options: { icon: "loading" }
      },
      stubs: {
        icon: MIcon
      }
    });
    const element = wrapper.findAll("use").at(0);
    expect(element.attributes("href")).to.equal("#icon-loading");
  });
  it("MButton组件可以响应点击事件", () => {
    const clickHandler = sinon.spy();
    const wrapper = shallowMount(MButton);
    const vm = wrapper.vm;
    vm.$on("click", clickHandler);
    wrapper.trigger("click");
    expect(clickHandler.called).to.equal(true);
  });
  it("MButton组件可以使用slot功能", () => {
    const wrapper = shallowMount(MButton, {
      slots: {
        prefix: '<div class="custom-solt">123</div>'
      }
    });
    const element = wrapper.find(".custom-solt");
    expect(element.text()).to.equal("123");
  });
});
