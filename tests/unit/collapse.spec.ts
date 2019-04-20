import { mount } from "@vue/test-utils";
import { expect } from "chai";
import Vue from "vue";
import MCollapse from "@/components/collapse/index.vue";
import MCollapseItem from "@/components/collapse/item/index.vue";

Vue.component("m-collapse", MCollapse);
Vue.component("m-collapse-item", MCollapseItem);

describe("m-collapse.vue", () => {
  it("MCollapse组件可以使用v-model", () => {
    const component = {
      name: "MCollapseTest",
      template: `
        <m-collapse v-model=activeNames>
          <m-collapse-item name="1" title="标题">内容一</m-collapse-item>
          <m-collapse-item name="2" title="标题">内容二</m-collapse-item>
          <m-collapse-item name="3" title="标题">内容三</m-collapse-item>
        </m-collapse>
      `,
      data() {
        return {
          activeNames: ["1"]
        };
      }
    };
    const wrapper = mount(component, {});
    const item = wrapper.findAll(".collapse-item").at(1);
    item.trigger("click");
    expect(wrapper.vm.$data.activeNames).to.include("2");
  });
  it("MCollapse组件接受activeName", done => {
    const component = {
      name: "MCollapseTest",
      template: `
        <m-collapse activeNames="3">
          <m-collapse-item name="1" title="标题">内容一</m-collapse-item>
          <m-collapse-item name="2" title="标题">内容二</m-collapse-item>
          <m-collapse-item name="3" title="标题">内容三</m-collapse-item>
        </m-collapse>
      `
    };
    const wrapper = mount(component, {});
    setTimeout(() => {
      const item = wrapper.find(".collapse-content");
      expect(item.text()).to.equal("内容三");
      done();
    }, 0);
  });
  it("MCollapse组件接受single", () => {
    const component = {
      name: "MCollapseTest",
      template: `
        <m-collapse v-model="activeNames" single>
          <m-collapse-item name="1" title="标题">内容一</m-collapse-item>
          <m-collapse-item name="2" title="标题">内容二</m-collapse-item>
          <m-collapse-item name="3" title="标题">内容三</m-collapse-item>
        </m-collapse>
      `,
      data() {
        return {
          activeNames: ["1"]
        };
      }
    };
    const wrapper = mount(component, {});
    const item = wrapper.findAll(".collapse-item").at(1);
    item.trigger("click");
    expect(wrapper.vm.$data.activeNames).include("2");
    expect(wrapper.vm.$data.activeNames.length).to.equal(1);
  });
});

describe("m-collapse-item.vue", () => {
  const component = {
    name: "MCollapseTest",
    template: `
      <m-collapse>
        <m-collapse-item name="1" title="标题">内容一</m-collapse-item>
      </m-collapse>
    `
  };
  it("MCollapseItem组件接受name", () => {
    const wrapper = mount(component);
    const item = wrapper.find(".collapse-item");
    expect(item.props("name")).to.equal("1");
  });
  it("MCollapseItem组件接受title", () => {
    const wrapper = mount(component);
    const item = wrapper.find(".collapse-item");
    expect(item.props("title")).to.equal("标题");
  });
});
