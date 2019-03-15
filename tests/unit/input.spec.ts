import { expect } from "chai";
import { shallowMount, mount } from "@vue/test-utils";
import sinon from "sinon";
import MInput from "@/components/input/index.vue";
import MIcon from "@/components/icon/index.vue";
import MButton from "@/components/button/index.vue";

describe("input.vue", () => {
  it("MInput组件可以设置type，placeholder，maxlength，disabled，clearable", () => {
    const wrapper = shallowMount(MInput, {
      propsData: {
        type: "number",
        placeholder: "hello world",
        maxlength: 10,
        disabled: true,
        clearable: true
      }
    });
    wrapper.setData({ currentValue: 10 });
    const inputWrapper = wrapper.find(".m-input__wrapper");
    const input = wrapper.find("input");
    expect(input.attributes("type")).to.equal("number");
    expect(input.attributes("placeholder")).to.equal("hello world");
    expect(input.attributes("maxlength")).to.equal("10");
    expect(input.attributes("disabled")).to.equal("disabled");
    expect(inputWrapper.attributes("data-clearable")).to.equal("true");
  });
  it("MInput组件可以使用prop方式设置前后缀图标&按钮", () => {
    const wrapper = mount(MInput, {
      propsData: {
        suffixIcon: "search",
        prefixIcon: "loading",
        suffixButtonText: "搜索",
        suffixButtonIcon: "search",
        prefixButtonText: "加载",
        prefixButtonIcon: "loading"
      },
      stubs: {
        MIcon,
        MButton
      }
    });
    const suffixIcon = wrapper.find(".m-suffix__icon");
    const prefixIcon = wrapper.find(".m-prefix__icon");
    const suffixButton = wrapper.find(".m-button__wrap-suffix");
    const prefixButton = wrapper.find(".m-button__wrap-prefix");
    expect(suffixIcon.exists()).to.be.true;
    expect(prefixIcon.exists()).to.be.true;
    expect(suffixButton.exists()).to.be.true;
    expect(prefixButton.exists()).to.be.true;
    expect(suffixIcon.find("use").attributes("href")).to.equal("#icon-search");
    expect(prefixIcon.find("use").attributes("href")).to.equal("#icon-loading");
    expect(suffixButton.find("use").attributes("href")).to.equal(
      "#icon-search"
    );
    expect(suffixButton.find(".content").text()).to.equal("搜索");
    expect(prefixButton.find("use").attributes("href")).to.equal(
      "#icon-loading"
    );
    expect(prefixButton.find(".content").text()).to.equal("加载");
  });
  it("MInput组件可以使用slot方式设置前后缀图标&文字", () => {
    const wrapper = shallowMount(MInput, {
      slots: {
        suffixIcon: "<div>123</div>",
        prefixIcon: "<div>456</div>",
        suffixContent: "hello",
        prefixContent: "world"
      }
    });
    expect(wrapper.find(".m-suffix__icon div").text()).to.equal("123");
    expect(wrapper.find(".m-prefix__icon div").text()).to.equal("456");
    expect(wrapper.find(".m-input__suffix-content").text()).to.equal("hello");
    expect(wrapper.find(".m-input__prefix-content").text()).to.equal("world");
  });
  it("MInput组件可以响应input,focus,blur,change,on-enter,click-icon,clear, click-button事件", () => {
    const clickIconHandler = sinon.spy();
    const clickButtonHandler = sinon.spy();
    const inputHandler = sinon.spy();
    const blurHandler = sinon.spy();
    const focusHandler = sinon.spy();
    const changeHandler = sinon.spy();
    const enterHandler = sinon.spy();
    const clickClearIconHandler = sinon.spy();
    const wrapper = shallowMount(MInput, {
      propsData: {
        suffixIcon: "search",
        suffixButtonText: "搜索",
        suffixButtonIcon: "search",
        clearable: true
      },
      stubs: {
        MButton,
        MInput
      }
    });
    wrapper.setData({ currentValue: 123 });
    const vm = wrapper.vm;
    vm.$on("input", inputHandler);
    vm.$on("blur", blurHandler);
    vm.$on("change", changeHandler);
    vm.$on("focus", focusHandler);
    vm.$on("on-enter", enterHandler);
    vm.$on("clear", clickClearIconHandler);
    vm.$on("click-button", clickButtonHandler);
    vm.$on("click-icon", clickIconHandler);
    wrapper.find("input").trigger("input");
    wrapper.find("input").trigger("blur");
    wrapper.find("input").trigger("change");
    wrapper.find("input").trigger("focus");
    wrapper.find("input").trigger("keyup.enter");
    wrapper.find(".m-input__clear-icon").trigger("click");
    wrapper.find(".m-button__wrap-suffix .m-button").trigger("click");
    wrapper.find(".m-suffix__icon").trigger("click");
    expect(clickIconHandler.called).to.be.true;
    expect(clickButtonHandler.called).to.be.true;
    expect(inputHandler.called).to.be.true;
    expect(blurHandler.called).to.be.true;
    expect(focusHandler.called).to.be.true;
    expect(changeHandler.called).to.be.true;
    expect(enterHandler.called).to.be.true;
    expect(clickClearIconHandler.called).to.be.true;
  });
  it("MInput组件接受promptMsg，promptMsgPosition，isErrorMsg", () => {
    const wrapper = shallowMount(MInput, {
      propsData: {
        promptMsg: "测试",
        promptMsgPosition: "down",
        isErrorMsg: true
      }
    });
    const msgElem = wrapper.find(".m-input__prompt");
    expect(msgElem.text()).to.equal("测试");
    expect(msgElem.attributes("data-error")).to.equal("true");
    expect(wrapper.attributes("data-layout")).to.equal("down");
  });
});
