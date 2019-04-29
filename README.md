## Minimalist_UI - 一个使用Vue.js构建的UI组件库。
[![Build Status](https://travis-ci.com/GreedyWhale/Minimalist_UI.svg?branch=master)](https://travis-ci.com/GreedyWhale/Minimalist_UI) ![npm](https://img.shields.io/npm/v/@csr/m_ui.svg) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@csr/m_ui.svg) ![Codecov](https://img.shields.io/codecov/c/github/GreedyWhale/Minimalist_UI.svg?token=210d884eb63047a8b0c82525a3c140d3) ![GitHub](https://img.shields.io/github/license/GreedyWhale/Minimalist_UI.svg)

## 介绍
这是我在学习Vue.js的过程中做的一个UI库，里面包含了常用的一些UI组件，希望对你有用！

目前是1.x的版本，已通过测试，可以放心食用O(∩_∩)O~~

[官方文档](https://greedywhale.github.io/Minimalist_UI_Document/)
## 特点
1. 项目使用Vue.js + Typescript开发
2. 拥有完整的单元测试，并使用Travis CI 进行持续集成
3. 测试覆盖率达到78%
4. 代码简洁、易懂
5. 拥有详细的文档

## 开始使用
1. 安装
    ```
    npm install @csr/m_ui
    yarn add @csr/m_ui
    ```
2. 使用
    ```
    <template>
      <div>
        <m-button>按钮</m-button>
      </div>
    </template>

    <script>
      import { MButton } from "@csr/m_ui";
      name: 'example',
      components: {
        MButton
      }
    </script>
    ```

## 文档
[官方文档](https://greedywhale.github.io/Minimalist_UI_Document/)
## 联系方式
email: madaocai@gmail.com

## LICENSE
[MIT](https://github.com/GreedyWhale/Minimalist_UI/blob/master/LICENSE)
