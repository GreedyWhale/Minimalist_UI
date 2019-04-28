import { mount, shallowMount } from "@vue/test-utils";
import { expect } from "chai";
import Vue from "vue";
import sinon from "sinon";
import MTable from "@/components/table/index.vue";

Vue.component("m-table", MTable);
describe("m-table.vue", () => {
  it("MTable组件接受 columns 和 dataSource", () => {
    const wrapper = shallowMount(MTable, {
      propsData: {
        columns: [
          { title: "姓名", field: "name" },
          { title: "年龄", field: "age" },
          { title: "分数", field: "score" },
          { title: "年级", field: "grade" }
        ],
        dataSource: [
          { key: 1, name: "宇智波鼬", age: 17, score: 100, grade: "二" },
          { key: 2, name: "自来也", age: 27, score: 200, grade: "三" },
          { key: 3, name: "佩恩", age: 15, score: 120, grade: "一" },
          { key: 4, name: "雏田", age: 12, score: 300, grade: "一" }
        ]
      }
    });
    const thead = wrapper.findAll("thead tr th");
    const tbody = wrapper.findAll("tbody tr td");
    expect(thead.at(0).text()).to.equal("姓名");
    expect(thead.at(3).text()).to.equal("年级");
    expect(tbody.at(0).text()).to.equal("宇智波鼬");
    expect(tbody.at(3).text()).to.equal("二");
  });
  it("MTable组件接受bordered和striped", () => {
    const wrapper = shallowMount(MTable, {
      propsData: {
        columns: [{ title: "姓名", field: "name" }],
        dataSource: [
          { key: 1, name: "宇智波鼬", age: 17, score: 100, grade: "二" }
        ],
        bordered: true,
        striped: true
      }
    });
    expect(wrapper.classes()).to.contains("bordered");
    expect(wrapper.find(".m-table").classes()).to.contains("striped");
  });
  it("MTable组件支持selection功能", () => {
    const wrapper = shallowMount(MTable, {
      propsData: {
        extendedColumns: [{ field: "selection", width: 50 }],
        columns: [{ title: "姓名", field: "name" }],
        dataSource: [
          { key: 1, name: "宇智波鼬", age: 17, score: 100, grade: "二" },
          { key: 2, name: "自来也", age: 27, score: 200, grade: "三" }
        ],
        bordered: true,
        striped: true
      }
    });
    const checkbox = wrapper.findAll('input[type="checkbox"]');
    expect(checkbox.exists()).to.be.true;
    const spyChange = sinon.spy();
    wrapper.vm.$on("on-change", spyChange);
    checkbox.at(0).trigger("change");
    expect(spyChange.called).to.be.true;
  });
  it("MTable组件接受loading", () => {
    const wrapper = shallowMount(MTable, {
      propsData: {
        columns: [{ title: "姓名", field: "name" }],
        dataSource: [
          { key: 1, name: "宇智波鼬", age: 17, score: 100, grade: "二" }
        ],
        loading: true
      }
    });
    expect(wrapper.find(".m-table__loading").exists()).to.be.true;
  });
  it("Mtable组件支持固定表头", () => {
    const wrapper = shallowMount(MTable, {
      propsData: {
        extendedColumns: [{ field: "selection", width: 50 }],
        columns: [{ title: "姓名", field: "name" }],
        dataSource: [
          { key: 1, name: "宇智波鼬", age: 17, score: 100, grade: "二" }
        ],
        fixedHead: true
      }
    });
    const table = wrapper.findAll("table");
    expect(table.length).to.equal(2);
    expect(
      table
        .at(0)
        .find("thead")
        .exists()
    ).to.be.true;
  });
  it("Mtable组件支持展开功能", done => {
    const wrapper = shallowMount(MTable, {
      propsData: {
        extendedColumns: [
          { field: "expend", expendField: "description", width: 50 }
        ],
        columns: [{ title: "姓名", field: "name" }],
        dataSource: [
          {
            key: 1,
            name: "宇智波鼬",
            age: 17,
            score: 100,
            grade: "二",
            description: "测试"
          }
        ],
        fixedHead: true
      }
    });
    const td = wrapper.findAll("td").at(0);
    td.trigger("click");
    setTimeout(() => {
      const expendTr = wrapper.findAll("tbody tr").at(1);
      expect(
        expendTr
          .findAll("td")
          .at(1)
          .text()
      ).to.be.equal("测试");
      done();
    });
  });
  it("Mtable组件支持scopedSlots", () => {
    const component = {
      name: "test",
      template: `
        <m-table
          :columns="columns" :data-source="dataSource">
          <template v-slot:actions="slotProps">
            <button @click="test(slotProps.item)">测试</button>
          </template>
        </m-table>
      `,
      data() {
        return {
          columns: [{ title: "姓名", field: "name" }],
          dataSource: [
            { key: 1, name: "宇智波鼬", age: 17, score: 100, grade: "二" }
          ],
          item: {}
        };
      },
      methods: {
        test(this: any, item: any) {
          this.item = item;
        }
      }
    };
    const wrapper = mount(component);
    const button = wrapper.find("button");
    button.trigger("click");
    expect(wrapper.vm.$data.item).to.include({
      key: 1,
      name: "宇智波鼬",
      age: 17,
      score: 100,
      grade: "二"
    });
  });
  it("Mtable组件支持排序功能", () => {
    const wrapper = mount(MTable, {
      propsData: {
        columns: [{ title: "姓名", field: "name", sortType: "asc" }],
        dataSource: [
          {
            key: 1,
            name: "宇智波鼬",
            age: 17,
            score: 100,
            grade: "二",
            description: "测试"
          }
        ]
      }
    });
    const spy = sinon.spy();
    const iconWrapper = wrapper.find(".table-header__cell-icons");
    expect(
      iconWrapper.find(".m-icon.active use").attributes("href")
    ).to.be.equal("#icon-caret-up");
    wrapper.vm.$on("on-sort", spy);
    iconWrapper.trigger("click");
    expect(spy.called).to.be.true;
  });
});
