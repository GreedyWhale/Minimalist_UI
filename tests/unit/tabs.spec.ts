import { mount } from "@vue/test-utils";
import Vue from "vue";
import { expect } from "chai";
import sinon from "sinon";
import MTabs from "@/components/tabs/index.vue";
import MTabsHead from "@/components/tabs/head/index.vue";
import MTabsBody from "@/components/tabs/body/index.vue";
import MTabsItem from "@/components/tabs/item/index.vue";
import MTabsPane from "@/components/tabs/pane/index.vue";

Vue.component("m-tabs", MTabs);
Vue.component("m-tabs-head", MTabsHead);
Vue.component("m-tabs-body", MTabsBody);
Vue.component("m-tabs-pane", MTabsPane);
Vue.component("m-tabs-item", MTabsItem);

const component = {
  name: "test",
  template: `
    <m-tabs :selected.sync="selected" @on-click="onClick">
      <m-tabs-head>
        <m-tabs-item name="tab1" disabled></m-tabs-item>
        <m-tabs-item name="tab2"></m-tabs-item>
        <m-tabs-item name="tab3"></m-tabs-item>
      </m-tabs-head>
      <m-tabs-body>
        <m-tabs-pane name="tab1"></m-tabs-pane>
        <m-tabs-pane name="tab2"></m-tabs-pane>
        <m-tabs-pane name="tab3"></m-tabs-pane>
      </m-tabs-body>
    </m-tabs>
  `,
  data() {
    return {
      selected: "tab1",
      selectedCopy: ""
    };
  },
  methods: {
    onClick(this: any, selected: string) {
      this.selectedCopy = selected;
    }
  }
};
const wrapper = mount(component);
describe("m-tabs-head.vue", () => {
  it("MTabsHead组件可以设置的ContralButton", () => {
    const head = wrapper.find(".tabs-head");
    head.setData({
      showContralBtn: true
    });
    expect(head.contains(".pre-btn")).to.be.true;
    expect(head.contains(".next-btn")).to.be.true;
  });
});
describe("m-tabs-item.vue", () => {
  it("MTabsItem组件接受name", () => {
    const item = wrapper.find(".tabs-item");
    expect(item.props("name")).to.equal("tab1");
  });
  it("MTabsItem组件接受disabled", () => {
    const item = wrapper.find(".tabs-item");
    expect(item.classes()).to.contains("disabled");
  });
  it("m-tabs组件可以响应点击事件", () => {
    const item = wrapper.findAll(".tabs-item").at(1);
    const tabs = wrapper.vm.$children[0];
    const tabsHead = tabs.$children[0];
    const tabsItem = tabsHead.$children[1];
    tabsItem.updateSelected();
    expect(wrapper.vm.$data.selectedCopy).to.equal("tab2");
  });
  it("m-tabs组件支持.sync修饰符", () => {
    const item = wrapper.findAll(".tabs-item").at(1);
    const tabs = wrapper.vm.$children[0];
    const tabsHead = tabs.$children[0];
    const tabsItem = tabsHead.$children[2];
    tabsItem.updateSelected();
    expect(wrapper.vm.$data.selected).to.equal("tab3");
  });
});
