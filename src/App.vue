<template>
  <div id="app">
    <div class="app">
      <m-cascader
        :source.sync="source"
        v-model="selected"
        :loadData="loadData"
        @selected-items="b"
      ></m-cascader>
      <div>
        <m-cascader
          :source="source"
          v-model="selected"
          @change="a"
        ></m-cascader>
      </div>
    </div>
    <p>1231</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import MButton from "./components/button/index.vue";
import MIcon from "./components/icon/index.vue";
import MButtonGroup from "./components/button-group/index.vue";
import MInput from "./components/input/index.vue";
import MRow from "@/components/grid/row/index.vue";
import MCol from "@/components/grid/col/index.vue";
import MLayout from "@/components/layout/index.vue";
import MHeader from "@/components/layout/header/index.vue";
import MMain from "@/components/layout/main/index.vue";
import MFooter from "@/components/layout/footer/index.vue";
import MAside from "@/components/layout/aside/index.vue";
import MToast from "@/components/toast/index.vue";
import MTabs from "@/components/tabs/index.vue";
import MTabsHead from "@/components/tabs/head/index.vue";
import MTabsItem from "@/components/tabs/item/index.vue";
import MTabsBody from "@/components/tabs/body/index.vue";
import MTabsPane from "@/components/tabs/pane/index.vue";
import MPopover from "@/components/popover/index.vue";
import MCollapse from "@/components/collapse/index.vue";
import MCollapseItem from "@/components/collapse/item/index.vue";
import MCascader from "@/components/cascader/index.vue";
import MCascaderItem from "@/components/cascader/item/index.vue";
import tsetData from "../testdata";

@Component({
  components: {
    MButton,
    MIcon,
    MButtonGroup,
    MInput,
    MRow,
    MCol,
    MLayout,
    MHeader,
    MMain,
    MFooter,
    MAside,
    MToast,
    MTabs,
    MTabsHead,
    MTabsItem,
    MTabsBody,
    MTabsPane,
    MPopover,
    MCollapse,
    MCollapseItem,
    MCascader,
    MCascaderItem
  }
})
export default class App extends Vue {
  selected: any[] = [];
  source: any[] = [
    {
      value: "zhinan",
      label: "指南",
      children: [
        {
          value: "shejiyuanze",
          label: "设计原则",
          children: [
            {
              value: "yizhi",
              label: "一致"
            },
            {
              value: "fankui",
              label: "反馈"
            },
            {
              value: "xiaolv",
              label: "效率"
            },
            {
              value: "kekong",
              label: "可控"
            }
          ]
        },
        {
          value: "daohang",
          label: "导航",
          children: [
            {
              value: "cexiangdaohang",
              label: "侧向导航"
            },
            {
              value: "dingbudaohang",
              label: "顶部导航"
            }
          ]
        }
      ]
    },
    {
      value: "zujian",
      label: "组件",
      children: [
        {
          value: "basic",
          label: "Basic",
          children: [
            {
              value: "layout",
              label: "Layout 布局"
            },
            {
              value: "color",
              label: "Color 色彩"
            },
            {
              value: "typography",
              label: "Typography 字体"
            },
            {
              value: "icon",
              label: "Icon 图标"
            },
            {
              value: "button",
              label: "Button 按钮"
            }
          ]
        },
        {
          value: "form",
          label: "Form",
          children: [
            {
              value: "radio",
              label: "Radio 单选框"
            },
            {
              value: "checkbox",
              label: "Checkbox 多选框"
            },
            {
              value: "input",
              label: "Input 输入框"
            },
            {
              value: "input-number",
              label: "InputNumber 计数器"
            },
            {
              value: "select",
              label: "Select 选择器"
            },
            {
              value: "cascader",
              label: "Cascader 级联选择器"
            },
            {
              value: "switch",
              label: "Switch 开关"
            },
            {
              value: "slider",
              label: "Slider 滑块"
            },
            {
              value: "time-picker",
              label: "TimePicker 时间选择器"
            },
            {
              value: "date-picker",
              label: "DatePicker 日期选择器"
            },
            {
              value: "datetime-picker",
              label: "DateTimePicker 日期时间选择器"
            },
            {
              value: "upload",
              label: "Upload 上传"
            },
            {
              value: "rate",
              label: "Rate 评分"
            },
            {
              value: "form",
              label: "Form 表单"
            }
          ]
        },
        {
          value: "data",
          label: "Data",
          children: [
            {
              value: "table",
              label: "Table 表格"
            },
            {
              value: "tag",
              label: "Tag 标签"
            },
            {
              value: "progress",
              label: "Progress 进度条"
            },
            {
              value: "tree",
              label: "Tree 树形控件"
            },
            {
              value: "pagination",
              label: "Pagination 分页"
            },
            {
              value: "badge",
              label: "Badge 标记"
            }
          ]
        },
        {
          value: "notice",
          label: "Notice",
          children: [
            {
              value: "alert",
              label: "Alert 警告"
            },
            {
              value: "loading",
              label: "Loading 加载"
            },
            {
              value: "message",
              label: "Message 消息提示"
            },
            {
              value: "message-box",
              label: "MessageBox 弹框"
            },
            {
              value: "notification",
              label: "Notification 通知"
            }
          ]
        },
        {
          value: "navigation",
          label: "Navigation",
          children: [
            {
              value: "menu",
              label: "NavMenu 导航菜单"
            },
            {
              value: "tabs",
              label: "Tabs 标签页"
            },
            {
              value: "breadcrumb",
              label: "Breadcrumb 面包屑"
            },
            {
              value: "dropdown",
              label: "Dropdown 下拉菜单"
            },
            {
              value: "steps",
              label: "Steps 步骤条"
            }
          ]
        },
        {
          value: "others",
          label: "Others",
          children: [
            {
              value: "dialog",
              label: "Dialog 对话框"
            },
            {
              value: "tooltip",
              label: "Tooltip 文字提示"
            },
            {
              value: "popover",
              label: "Popover 弹出框"
            },
            {
              value: "card",
              label: "Card 卡片"
            },
            {
              value: "carousel",
              label: "Carousel 走马灯"
            },
            {
              value: "collapse",
              label: "Collapse 折叠面板"
            }
          ]
        }
      ]
    },
    {
      value: "ziyuan",
      label: "资源",
      children: [
        {
          value: "axure",
          label: "Axure Components"
        },
        {
          value: "sketch",
          label: "Sketch Templates"
        },
        {
          value: "jiaohu",
          label: "组件交互文档"
        }
      ]
    }
  ];
  mounted(): void {
    this.getData(0).then((res: any[]) => (this.source = res));
  }
  setSourceItem(list: any[], conditions: any) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === conditions[0].parent_id) {
        list[i].children = conditions;
        return true;
      }
    }
  }
  recursionSource(list: any[], conditions: any) {
    let done;
    for (let i = 0; i < list.length; i++) {
      done = this.setSourceItem(list, conditions);
      if (done) {
        return;
      }
      if (list[i].children && list[i].children.length) {
        this.recursionSource(list[i].children, conditions);
      }
    }
  }
  loadData(selected: any, upDataSource: Function): void {
    this.getData(selected.id).then((res: any) => {
      upDataSource(res);
    });
  }
  a(event: any) {
    let source = JSON.parse(JSON.stringify(this.source));
    this.getData(event.id).then((res: any) => {
      if (res && res.length) {
        this.recursionSource(source, res);
        this.source = source;
      }
    });
  }
  b(event: any) {
    console.log(event);
  }
  getData(id: number) {
    return new Promise<any[]>(resolve => {
      setTimeout(() => {
        const data = tsetData.filter(value => value.parent_id === id);
        resolve(data);
      }, 1000);
    });
  }
}
</script>

<style lang="scss">
#app {
  > .app {
  }
}
</style>
