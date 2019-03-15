import { expect } from "chai";
import { mount } from "@vue/test-utils";
import MButton from "@/components/button/index.vue";
import MButtonGroup from "@/components/buttonGroup/index.vue";

describe("buttonGroup.vue", () => {
  it("MButtonGroup的可以使用solt功能", () => {
    const wrapper = mount(MButtonGroup, {
      slots: {
        default: [MButton, MButton]
      }
    });
    expect(wrapper.contains("button")).to.be.true;
  });
});
