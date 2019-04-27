import { mount } from "@vue/test-utils";
import Vue from "vue";
import { expect } from "chai";
import MSwiper from "@/components/swiper/index.vue";
import MSwiperItem from "@/components/swiper/item/index.vue";

Vue.component("m-swiper", MSwiper);
Vue.component("m-swiper-item", MSwiperItem);

describe("swiper.vue", () => {
  it("MSwiper组件支持传入默认展示项", done => {
    const component = {
      name: "test",
      template: `
        <m-swiper :active="active">
          <m-swiper-item name="1">1</m-swiper-item>
          <m-swiper-item name="2">2</m-swiper-item>
          <m-swiper-item name="3">3</m-swiper-item>
        </m-swiper>
      `,
      data() {
        return {
          active: "2"
        };
      }
    };
    const wrapper = mount(component);
    setTimeout(() => {
      const activeElem = wrapper.find(".swiper-item");
      expect(activeElem.text()).to.equal("2");
      done();
      wrapper.destroy();
    });
  });
  it("MSwiper组件支持autoplay", done => {
    const component = {
      name: "test",
      template: `
        <m-swiper :active="active" :autoplay="true" :delay="100">
          <m-swiper-item name="1">1</m-swiper-item>
          <m-swiper-item name="2">2</m-swiper-item>
          <m-swiper-item name="3">3</m-swiper-item>
        </m-swiper>
      `,
      data() {
        return {
          active: "2"
        };
      }
    };
    const wrapper = mount(component);
    setTimeout(() => {
      const activeElem = wrapper.find(".swiper-item");
      expect(activeElem.text()).to.equal("3");
      done();
      wrapper.destroy();
    }, 150);
  });
  it("MSwiper组件支持loop模式", done => {
    const component = {
      name: "test",
      template: `
        <m-swiper :active="active" :delay="100" arrow="always">
          <m-swiper-item name="1">1</m-swiper-item>
          <m-swiper-item name="2">2</m-swiper-item>
          <m-swiper-item name="3">3</m-swiper-item>
        </m-swiper>
      `,
      data() {
        return {
          active: "1"
        };
      }
    };
    const wrapper = mount(component);
    const controlBtn = wrapper.find(".control-btn__prev");
    controlBtn.trigger("click");
    setTimeout(() => {
      const activeElem = wrapper.find(".swiper-item");
      expect(activeElem.text()).to.equal("3");
      done();
      wrapper.destroy();
    });
  });
  it("MSwiper组件可以通过点击横条控制按钮来切换展示", done => {
    const component = {
      name: "test",
      template: `
        <m-swiper :active="active" :delay="100" :visibleDots="false">
          <m-swiper-item name="1">1</m-swiper-item>
          <m-swiper-item name="2">2</m-swiper-item>
          <m-swiper-item name="3">3</m-swiper-item>
        </m-swiper>
      `,
      data() {
        return {
          active: "1"
        };
      }
    };
    const wrapper = mount(component);
    setTimeout(() => {
      const dotsElem = wrapper.findAll(".control-dots li").at(1);
      dotsElem.trigger("click");
      setTimeout(() => {
        const activeElem = wrapper.find(".swiper-item");
        expect(activeElem.text()).to.equal("2");
        done();
        wrapper.destroy();
      }, 200);
    }, 200);
  });
  it("MSwiper组件可以响应change事件", () => {
    const component = {
      name: "test",
      template: `
        <m-swiper :active="active" arrow="always" @change="test">
          <m-swiper-item name="1">1</m-swiper-item>
          <m-swiper-item name="2">2</m-swiper-item>
          <m-swiper-item name="3">3</m-swiper-item>
        </m-swiper>
      `,
      data() {
        return {
          active: "1",
          name: null,
          index: null
        };
      },
      methods: {
        test(this: any, name: string, index: number) {
          this.name = name;
          this.index = index;
        }
      }
    };
    const wrapper = mount(component);
    const controlBtn = wrapper.find(".control-btn__prev");
    controlBtn.trigger("click");
    expect(wrapper.vm.$data.name).to.equal("3");
    expect(wrapper.vm.$data.index).to.equal(2);
  });
});
