import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import MIcon from "@/components/MIcon/index.vue";

describe("MIcon.vue", () => {
  it("MIcon组件接受iconName", () => {
    const wrapper = shallowMount(MIcon, {
      propsData: {
        iconName: "loading"
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
