import { mount } from "@vue/test-utils";
import { expect } from "chai";
import sinon from "sinon";
import Vue from "vue";
import MMenu from "@/components/menu/index.vue";
import MSubMenu from "@/components/menu/sub/index.vue";
import MMenuItem from "@/components/menu/item/index.vue";

Vue.component("m-menu", MMenu);
Vue.component("m-sub-menu", MSubMenu);
Vue.component("m-menu-item", MMenuItem);
describe("m-menu.vue", () => {
  it("MMenu组件可以设置defaultActive", done => {
    const component = {
      name: "test",
      template: `
        <m-menu default-active="2">
          <m-menu-item name="1">1</m-menu-item>
          <m-menu-item name="2">2</m-menu-item>
          <m-menu-item name="3">3</m-menu-item>
        </m-menu>
      `
    };
    const wrapper = mount(component);
    const item = wrapper.findAll(".menu-item").at(1);
    setTimeout(() => {
      expect(item.attributes("data-active")).to.equal("true");
      done();
    }, 0);
  });
  it("MMenu组件可以设置vertical", () => {
    const component = {
      name: "test",
      template: `
        <m-menu default-active="2" vertical>
          <m-menu-item name="1">1</m-menu-item>
          <m-menu-item name="2">2</m-menu-item>
          <m-menu-item name="3">3</m-menu-item>
        </m-menu>
      `
    };
    const wrapper = mount(component);
    expect(wrapper.classes()).to.contain("vertical");
  });
  it("MMenu组件可以设置accordion", done => {
    const component = {
      name: "test",
      template: `
        <m-menu default-active="2" vertical accordion>
          <m-sub-menu name="bangumi">
            <m-menu-item name="yinhun">银桑</m-menu-item>
            <m-menu-item name="longhu">逢坂大河</m-menu-item>
            <m-menu-item name="chunwu">比企谷八幡</m-menu-item>
          </m-sub-menu>
          <m-sub-menu name="any">
            <m-menu-item name="1">1</m-menu-item>
            <m-menu-item name="2">2</m-menu-item>
            <m-menu-item name="3">3</m-menu-item>
          </m-sub-menu>
        </m-menu>
      `
    };
    const wrapper = mount(component);
    const subMenu = wrapper.findAll(".sub-menu__title").at(0);
    const newSubMenu = wrapper.findAll(".sub-menu__title").at(1);
    subMenu.trigger("click");
    newSubMenu.trigger("click");
    setTimeout(() => {
      expect(
        wrapper
          .findAll(".menu-list")
          .at(0)
          .isVisible()
      ).to.be.false;
      expect(
        wrapper
          .findAll(".menu-list")
          .at(1)
          .isVisible()
      ).to.be.true;
      done();
    }, 0);
  });
  it("MMenu组件可以设置subMenuTriggerWay", done => {
    const component = {
      name: "test",
      template: `
        <m-menu default-active="2" sub-menu-trigger-way="click">
          <m-sub-menu name="bangumi">
            <m-menu-item name="yinhun">银桑</m-menu-item>
            <m-menu-item name="longhu">逢坂大河</m-menu-item>
            <m-menu-item name="chunwu">比企谷八幡</m-menu-item>
          </m-sub-menu>
          <m-sub-menu name="any">
            <m-menu-item name="1">1</m-menu-item>
            <m-menu-item name="2">2</m-menu-item>
            <m-menu-item name="3">3</m-menu-item>
          </m-sub-menu>
        </m-menu>
      `
    };
    const wrapper = mount(component);
    const subMenu = wrapper.findAll(".sub-menu__title").at(0);
    subMenu.trigger("click");
    setTimeout(() => {
      expect(
        wrapper
          .findAll(".menu-list")
          .at(0)
          .isVisible()
      ).to.be.true;
      done();
    }, 0);
  });
  it("MMenu组件可以响应on-select事件", () => {
    const component = {
      name: "test",
      template: `
        <m-menu default-active="2" vertical @on-select="test">
          <m-menu-item name="1">1</m-menu-item>
          <m-menu-item name="2">2</m-menu-item>
          <m-menu-item name="3">3</m-menu-item>
        </m-menu>
      `,
      data() {
        return {
          name: "",
          namePath: []
        };
      },
      methods: {
        test(this: any, name: string | number, namePath: any[]) {
          this.name = name;
          this.namePath = namePath;
        }
      }
    };
    const wrapper = mount(component);
    wrapper.find(".menu-item").trigger("click");
    expect(wrapper.vm.$data.name).to.equal("1");
    expect(wrapper.vm.$data.namePath).to.include("1");
  });
});
