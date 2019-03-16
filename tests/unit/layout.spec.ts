import { mount } from "@vue/test-utils";
import { expect } from "chai";
import MLayout from "@/components/layout/index.vue";
import MHeader from "@/components/layout/header/index.vue";
import MMain from "@/components/layout/main/index.vue";
import MAside from "@/components/layout/aside/index.vue";
import MFooter from "@/components/layout/footer/index.vue";

describe("MLayout相关组件", () => {
  it("MLayout组件可以使用slot方式接受MHeader，MMain，MAside，MFooter", () => {
    const wrapper = mount(MLayout, {
      slots: {
        default: [MHeader, MMain, MAside, MFooter]
      }
    });
    expect(wrapper.contains(MHeader)).to.be.true;
    expect(wrapper.contains(MMain)).to.be.true;
    expect(wrapper.contains(MAside)).to.be.true;
    expect(wrapper.contains(MFooter)).to.be.true;
  });
});
