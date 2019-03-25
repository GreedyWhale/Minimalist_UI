import { shallowMount } from "@vue/test-utils";
import { expect } from "chai";
import MPopover from "@/components/popover/index.vue";

describe('m-popover.vue', () => {
  it("MPopover组件接受 position", () => {
    const wrapper = shallowMount(MPopover, {
      propsData: {
        position: 'left'
      }
    });
    wrapper.setData({ visible: true })
    expect(wrapper.find('.popover-content').attributes('data-position')).to.equal('left')
  })
  it("MPopover组件接受 click方式激活弹出窗内容", () => {
    const wrapper = shallowMount(MPopover, {});
    wrapper.trigger('click');
    expect(wrapper.contains('.popover-content')).to.be.true;
  })
  it("MPopover组件接受 hover方式激活弹出窗内容", (done) => {
    const wrapper = shallowMount(MPopover, {
      propsData: {
        trigger: 'hover'
      }
    });
    wrapper.trigger('mouseenter');
    setTimeout(() => {
      expect(wrapper.contains('.popover-content')).to.be.true;
      done()
    }, 150)
  })
})
