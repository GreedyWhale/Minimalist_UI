import { expect } from "chai";
import { mount } from "@vue/test-utils";
import MCascader from "@/components/cascader/index.vue";

const test_data = [
  {
    label: "火影",
    value: "huoying",
    children: [
      {
        label: "雏田",
        value: "chutian"
      },
      {
        label: "自来也",
        value: "zilaiye"
      },
      {
        label: "佩恩",
        value: "peien",
        children: []
      }
    ]
  },
  {
    label: "银魂",
    value: "yinhun",
    children: [
      {
        label: "坂田银时",
        value: "bantianyinshi"
      },
      {
        label: "神乐",
        value: "shenle"
      },
      {
        label: "志村新八",
        value: "zhicunxinba"
      }
    ]
  }
];
describe("mcascader.vue", () => {
  it("MCascader组件接受source", () => {
    const wrapper = mount(MCascader, {
      propsData: { source: test_data }
    });
    wrapper.find(".cascader-view").trigger("click");
    expect(
      wrapper
        .findAll(".label")
        .at(0)
        .text()
    ).to.equal("火影");
  });
  it("MCascader组件可以通过设置默认选中", () => {
    const wrapper = mount(MCascader, {
      propsData: { source: test_data, selected: ["yinhun"] }
    });
    wrapper.find(".cascader-view").trigger("click");
    expect(
      wrapper
        .findAll(".label")
        .at(1)
        .attributes("data-is-selected")
    ).to.equal("true");
  });
  it("MCascader组件可以动态设置source", () => {
    const data = [
      {
        label: "比企谷八幡",
        value: "bqgbf"
      },
      {
        label: "雪之下雪乃",
        value: "xzxxn"
      },
      {
        label: "由比滨结衣",
        value: "ybnjy"
      }
    ];
    let testSource: any;
    const wrapper = mount(MCascader, {
      propsData: {
        source: test_data,
        selected: ["huoying"],
        loadData: (sourceItem: any, onUpdateSource: Function) => {
          onUpdateSource(data);
        }
      }
    });
    wrapper.vm.$on("update:source", (source: any[]) => {
      testSource = source;
    });
    wrapper.find(".cascader-view").trigger("click");
    const itemElem = wrapper.findAll(".label").at(4);
    itemElem.trigger("click");
    const newSource = testSource[0].children[2].children;
    newSource.forEach((item: any, index: number) => {
      expect(item.value).to.equal(data[index].value);
    });
  });
});

describe("mcascaderItem.vue", () => {
  it("MCascaderItem组件可以响应点击事件并更新selected", () => {
    const wrapper = mount(MCascader, {
      propsData: { source: test_data, selected: ["yinhun"] }
    });
    wrapper.find(".cascader-view").trigger("click");
    const itemElem = wrapper.findAll(".label").at(3);
    itemElem.trigger("click");
    const { copySelected } = wrapper.vm.$data;
    expect(copySelected).to.include("shenle");
  });
});
