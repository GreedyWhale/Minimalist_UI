import { shallowMount, mount } from "@vue/test-utils";
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
    <m-tabs selected="tab1">
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
  `
};
const wrapper = mount(component);
describe("MTabsHead.vue", () => {
  it("MTabsHead组件可以设置的ContralButton", () => {
    const head = wrapper.find(".tabs-head");
    head.setData({
      showContralBtn: true
    })
    expect(head.contains('.pre-btn')).to.be.true
    expect(head.contains('.next-btn')).to.be.true
  });
})
describe("MTabsItem.vue", () => {
  it("MTabsItem组件接受name", () => {
    const item = wrapper.find(".tabs-item");
    expect(item.props("name")).to.equal("tab1");
  });
  it("MTabsItem组件接受disabled", () => {
    const item = wrapper.find(".tabs-item");
    expect(item.classes()).to.contains('disabled');
  });
  it("MTabsItem组件可以响应点击事件", () => {
    const clickHandler = sinon.spy();
    const item = wrapper.findAll(".tabs-item").at(1);
    const vm = item.vm;
    vm.$on("click", clickHandler);
    item.trigger('click')
    expect(clickHandler.called).to.be.true;
  });
});
