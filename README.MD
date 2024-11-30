# 使用 webpack 搭建 vue-cli

其实 vue-cli 的核心也并不复杂，都是用我们所学过的知识。
我们的切入点依旧是：

- webpack.config.js
- webpack.dev.js
- webpack.prod.js

稍微注意的是:
我们对 vue 编译的时候，需要使用 vue-loader 和 vue-loader-plugin
babel 对 js 的转换的时候，预设需要使用 vue 预设

而 vue-router 和 vuex 就不属于工程搭建的范畴了，我们直接安装使用即可。

[!warning]

> 在工作场景中，我们很少自己去搭建 cli,因为官方给的 cli 已经很成熟了。

## 模板地址

[自搭建 vue-cli 模板地址](https://github.com/ZongYan30/vuecli-core-template)
