import { mount } from "@vue/test-utils";
import { expect } from "chai";
import Vue from "vue";
import MDatePicker from "@/components/date-picker/index.vue";

Vue.component("m-date-picker", MDatePicker);
describe("MDatePiacker.vue", () => {
  it("MDatePiacker组件支持单选日期", done => {
    const wrapper = mount(MDatePicker, {
      propsData: {
        value: "2019/04/01"
      }
    });
    wrapper.vm.$on("on-change", (date: string) => {
      expect(date).to.equal("2019/04/01");
      done();
    });
    const input = wrapper.find("input");
    input.trigger("click");
    setTimeout(() => {
      const datelist = wrapper.find(".m-datepicker__date");
      const dateItem = datelist.findAll(".m-datepicker__date-item").at(1);
      const dateContent = dateItem.findAll(".m-datepicker__date-content").at(1);
      dateContent.trigger("click");
    }, 0);
  });
  it("MDatePiacker组件支持多选日期", done => {
    const wrapper = mount(MDatePicker, {
      propsData: {
        value: "2019/04/01",
        type: "multiple"
      }
    });
    wrapper.vm.$on("on-change", (date: string[]) => {
      expect(date.length).to.equal(2);
      expect(date[0]).to.equal("2019/04/01");
      expect(date[1]).to.equal("2019/04/06");
      done();
    });
    const input = wrapper.find("input");
    input.trigger("click");
    setTimeout(() => {
      const datelist = wrapper.find(".m-datepicker__date");
      const dateItem = datelist.findAll(".m-datepicker__date-item").at(1);
      const dateContent = dateItem.findAll(".m-datepicker__date-content").at(1);
      const dateContent1 = dateItem
        .findAll(".m-datepicker__date-content")
        .at(6);
      const confirmButton = wrapper
        .findAll(".m-datepicker__foot-btns button")
        .at(0);
      dateContent.trigger("click");
      dateContent1.trigger("click");
      confirmButton.trigger("click");
    }, 0);
  });
  it("MDatePiacker组件支持选择年", done => {
    const wrapper = mount(MDatePicker, {
      propsData: {
        value: "2019/04/01",
        type: "multiple"
      }
    });
    wrapper.vm.$on("on-selected-year", (year: number) => {
      expect(year).to.equal(2010);
      done();
    });
    wrapper.setData({
      currentPanel: "year"
    });
    const input = wrapper.find("input");
    input.trigger("click");
    setTimeout(() => {
      const yearItem = wrapper.findAll(".m-datepick__year-content").at(0);
      yearItem.trigger("click");
    }, 0);
  });
  it("MDatePiacker组件支持选择月", done => {
    const wrapper = mount(MDatePicker, {
      propsData: {
        value: "2019/04/01",
        type: "multiple"
      }
    });
    wrapper.vm.$on("on-selected-month", (year: number) => {
      expect(year).to.equal(1);
      done();
    });
    wrapper.setData({
      currentPanel: "month"
    });
    const input = wrapper.find("input");
    input.trigger("click");
    setTimeout(() => {
      const yearItem = wrapper.findAll(".m-datepick__month-content").at(0);
      yearItem.trigger("click");
    }, 0);
  });
  it("MDatePiacker组件支持v-model", done => {
    const component = {
      name: "test",
      template: `
        <m-date-picker v-model="value"></m-date-picker>
      `,
      data() {
        return { value: "2019/04/01" };
      }
    };
    const wrapper = mount(component);

    const input = wrapper.find("input");
    input.trigger("click");
    setTimeout(() => {
      const datelist = wrapper.find(".m-datepicker__date");
      const dateItem = datelist.findAll(".m-datepicker__date-item").at(1);
      const dateContent = dateItem.findAll(".m-datepicker__date-content").at(1);
      dateContent.trigger("click");
      expect(wrapper.vm.$data.value).to.equal("2019/04/01");
      done();
    }, 0);
  });
  it("MDatePiacker组件接受选中日期返回值格式", done => {
    const component = {
      name: "test",
      template: `
        <m-date-picker v-model="value" valueFormat="YYYY-MM-DD"></m-date-picker>
      `,
      data() {
        return { value: "2019/04/01" };
      }
    };
    const wrapper = mount(component);

    const input = wrapper.find("input");
    input.trigger("click");
    setTimeout(() => {
      const datelist = wrapper.find(".m-datepicker__date");
      const dateItem = datelist.findAll(".m-datepicker__date-item").at(1);
      const dateContent = dateItem.findAll(".m-datepicker__date-content").at(1);
      dateContent.trigger("click");
      expect(wrapper.vm.$data.value).to.equal("2019-04-01");
      done();
    }, 0);
  });
  it("MDatePiacker组件接受日期展示格式", () => {
    const wrapper = mount(MDatePicker, {
      propsData: {
        value: "2019/04/21",
        format: "YYYY年MM月DD日"
      }
    });
    expect(wrapper.vm.$data.displayDate).to.equal("2019年04月21日");
  });
  it("MDatePiacker组件支持清除功能", done => {
    const component = {
      name: "test",
      template: `
        <m-date-picker v-model="value"></m-date-picker>
      `,
      data() {
        return { value: "2019/05/15" };
      }
    };
    const wrapper = mount(component);
    expect(wrapper.vm.$data.value).to.equal("2019/05/15");
    const clearIcon = wrapper.find(".m-input__clear-icon");
    clearIcon.trigger("click");
    expect(wrapper.vm.$data.value).to.equal("");
    done();
  });
  it("MDatePiacker组件支持返回今天", done => {
    const wrapper = mount(MDatePicker, {
      propsData: {
        value: "2019/04/01"
      }
    });
    const input = wrapper.find("input");
    input.trigger("click");
    setTimeout(() => {
      const today = wrapper.find(".m-datepicker__foot-today");
      today.trigger("click");
      expect(wrapper.vm.$data.currentDate.date).to.equal(new Date().getDate());
      done();
    }, 0);
  });
  it("MDatePiacker组件支持返回今月", done => {
    const wrapper = mount(MDatePicker, {
      propsData: {
        value: "2019/05/01"
      }
    });
    wrapper.setData({
      currentPanel: "month"
    });
    const input = wrapper.find("input");
    input.trigger("click");
    setTimeout(() => {
      const month = wrapper.find(".m-datepicker__foot-today");
      month.trigger("click");
      expect(wrapper.vm.$data.currentDate.month).to.equal(
        new Date().getMonth() + 1
      );
      done();
    }, 0);
  });
  it("MDatePiacker组件支持返回今年", done => {
    const wrapper = mount(MDatePicker, {
      propsData: {
        value: "2017/04/01"
      }
    });
    wrapper.setData({
      currentPanel: "year"
    });
    const input = wrapper.find("input");
    input.trigger("click");
    setTimeout(() => {
      const year = wrapper.find(".m-datepicker__foot-today");
      year.trigger("click");
      expect(wrapper.vm.$data.currentDate.year).to.equal(
        new Date().getFullYear()
      );
      done();
    }, 0);
  });
  it("MDatePiacker组件支输入选择日期", () => {
    const wrapper = mount(MDatePicker, {
      propsData: {
        value: "2019/04/01"
      }
    });
    const input = wrapper.find("input");
    (input.element as HTMLInputElement).value = "2019-10-01";
    input.trigger("input");
    expect(wrapper.vm.$data.currentDate.year).to.equal(2019);
    expect(wrapper.vm.$data.currentDate.month).to.equal(10);
    expect(wrapper.vm.$data.currentDate.date).to.equal(1);
  });
  it("MDatePiacker组件支默认选中一个日期", () => {
    const wrapper = mount(MDatePicker, {
      propsData: {
        value: "2019/04/01"
      }
    });
    expect(wrapper.vm.$data.currentDate.year).to.equal(2019);
    expect(wrapper.vm.$data.currentDate.month).to.equal(4);
    expect(wrapper.vm.$data.currentDate.date).to.equal(1);
  });
  it("MDatePiacker组件支默认选中多个日期", () => {
    const wrapper = mount(MDatePicker, {
      propsData: {
        value: ["2019/04/01", "2019/05/01"],
        type: "multiple"
      }
    });
    expect(wrapper.vm.$data.startDate.dateStamp).to.equal("2019/04/01");
    expect(wrapper.vm.$data.endDate.dateStamp).to.equal("2019/05/01");
  });
  it("MDatePiacker组件支默认禁用日期", done => {
    const wrapper = mount(MDatePicker, {
      propsData: {
        value: "2019/04/01",
        disabledDate: (date: Date) => {
          const disable = `${date.getFullYear()}/${date.getMonth() +
            1}/${date.getDate()}`;
          return disable === "2019/4/2";
        }
      }
    });
    const input = wrapper.find("input");
    input.trigger("click");
    setTimeout(() => {
      const datelist = wrapper.find(".m-datepicker__date");
      const dateItem = datelist.findAll(".m-datepicker__date-item").at(1);
      const item = dateItem.findAll(".m-datepicker__date-content").at(2);
      expect(item.attributes("data-disabled")).to.equal("true");
      done();
    }, 0);
  });
});
