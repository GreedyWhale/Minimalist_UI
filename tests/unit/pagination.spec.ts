import { expect } from "chai";
import Vue from "vue";
import { shallowMount, mount } from "@vue/test-utils";
import MPagination from "@/components/pagination/index.vue";

Vue.component("m-pagination", MPagination);

describe("pagination.vue", () => {
  it("MPagination组件接受total", () => {
    const wrapper = shallowMount(MPagination, {
      propsData: {
        total: 100
      }
    });
    const item = wrapper.findAll(".pager-list li").at(8);
    expect(item.text()).to.equal("100");
  });
  it("MPagination组件接受defaultPage", () => {
    const wrapper = shallowMount(MPagination, {
      propsData: {
        total: 100,
        defaultPage: 10
      }
    });
    const item = wrapper.find(".pager-list li.active");
    expect(item.text()).to.equal("10");
  });
  it("MPagination组件接受defaultPageSize", () => {
    const wrapper = shallowMount(MPagination, {
      propsData: {
        total: 100,
        defaultPageSize: 10
      }
    });
    const items = wrapper.findAll(".pager-list li");
    expect(items.length).to.equal(13);
  });
  it("MPagination组件接受step", () => {
    const wrapper = shallowMount(MPagination, {
      propsData: {
        total: 100,
        defaultPageSize: 10,
        step: 10
      }
    });
    const item = wrapper.find(".no-border");
    item.trigger("click");
    const activeItem = wrapper.find(".pager-list li.active");
    expect(activeItem.text()).to.equal("11");
  });
  it("MPagination组件可以响应on-change事件", () => {
    const component = {
      name: "test",
      template: `
        <m-pagination :total="100" :step="10" @on-change="onChange"></m-pagination>
      `,
      data() {
        return {
          current: 0,
          index: 0
        };
      },
      methods: {
        onChange(this: any, current: any, index: any) {
          this.current = current;
          this.index = index;
        }
      }
    };
    const wrapper = mount(component);
    const item = wrapper.find(".no-border");
    item.trigger("click");
    expect(wrapper.vm.$data.current).to.equal(11);
    expect(wrapper.vm.$data.index).to.equal(6);
  });
  it("MPagination组件支持上一页/下一页功能", () => {
    const wrapper = mount(MPagination, {
      propsData: {
        total: 100,
        defaultPage: 20
      }
    });
    const prev = wrapper.findAll(".pager-list li").at(0);
    const next = wrapper.findAll(".pager-list li").at(10);
    prev.trigger("click");
    const activeItem = wrapper.find(".pager-list li.active");
    expect(activeItem.text()).to.equal("19");
    next.trigger("click");
    const activeItem1 = wrapper.find(".pager-list li.active");
    expect(activeItem1.text()).to.equal("20");
  });
});
