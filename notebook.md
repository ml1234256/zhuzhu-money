[视觉设计稿](https://www.figma.com/file/YPtm8nqJlmhsWhfUwln5s7/%E6%97%BA%E8%B4%A2%E8%AE%B0%E8%B4%A6%EF%BC%88%E6%9C%AC%E5%9C%B0%E7%89%88%EF%BC%89-(Copy)?node-id=0%3A1)

### 1. 底部导航栏

URL:

* #/money 记账（默认路由）

* #/labels 标签

* #/statistics 统计

* 添加 404 路由

```javascript
{
    "/money": "Money.vue",
    "/labels": "Labels.vue",
    "/statistics": "Statistics.vue"
}  
```

  写代码：

1. 在 router/index.ts 中添加 router， 配置路径
2. 初始化组件： Money.vue, Labels.vue, Statistics.vue
3. 将 router 传给 new Vue()
4. 在 App 组件中用 `<router-view />` 给出 router 渲染区域



不要在移动端使用 fixed 定位

<style lang="scss" scoped>
</style>

插槽 slot

