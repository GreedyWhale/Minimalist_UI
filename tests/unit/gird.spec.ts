import { expect } from "chai";
import { mount } from "@vue/test-utils";
import MRow from "@/components/grid/row/index.vue";
import MCol from "@/components/grid/col/index.vue";

describe("row.vue & col.vue", () => {
  it("MRow组件可以使用slot功能传入MCol组件", () => {
    const wrapper = mount(MRow, {
      slots: {
        default: [MCol, MCol]
      }
    });
    const colElem = wrapper.findAll(".m-col");
    expect(colElem.length).to.equal(2);
  });
  it("MRow组件接受gutter", () => {
    const wrapper = mount(MRow, {
      propsData: {
        gutter: 20
      },
      slots: {
        default: [MCol, MCol]
      }
    });
    expect(wrapper.attributes("style")).to.equal(
      "margin-left: -10px; margin-right: -10px;"
    );
  });
  it("MRow组件接受align", () => {
    const wrapper = mount(MRow, {
      propsData: {
        align: 'space-around'
      }
    })
    expect(wrapper.classes('align-space-around')).to.be.true;
  });
  it("MCol组件接受span, offset, sm，md，lg，xl，xxl", () => {
    const wrapper = mount(MCol, {
      propsData: {
        span: 20,
        offset: 4,
        sm: { span: 12, offset: 12 },
        md: { span: 15 , offset: 9 },
        lg: { span: 17, offset: 7 },
        xl: { span: 10, offset: 14 },
        xxl: { span: 1, offset: 23 },
      }
    })
    const classes = [
      'm-col__20',
      'm-col__offset-4',
      'm-col__sm12',
      'm-col__offset-sm12',
      'm-col__md15',
      'm-col__offset-md9',
      'm-col__lg17',
      'm-col__offset-lg7',
      'm-col__xl10',
      'm-col__offset-xl14',
      'm-col__xxl1',
      'm-col__offset-xxl23',
    ]
    classes.forEach(value => {
      expect(wrapper.classes(value)).to.be.true;
    })
  })
});
