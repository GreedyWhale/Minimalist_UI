import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import MIcon from "@/components/icon/index.vue";

describe("MIcon.vue", () => {
  it("MIcon组件接受icon", () => {
    const wrapper = shallowMount(MIcon, {
      propsData: {
        icon: "loading"
      }
    });
    const element = wrapper.find("use");
    expect(element.attributes("href")).to.equal("#icon-loading");
  });
  it("MIcon组件接受isLoading", () => {
    const wrapper = shallowMount(MIcon, {
      propsData: {
        isLoading: true
      }
    });
    const element = wrapper.find("use");
    expect(element.attributes("href")).to.equal("#icon-loading");
  });
});
