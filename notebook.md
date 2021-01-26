[视觉设计稿](https://www.figma.com/file/YPtm8nqJlmhsWhfUwln5s7/%E6%97%BA%E8%B4%A2%E8%AE%B0%E8%B4%A6%EF%BC%88%E6%9C%AC%E5%9C%B0%E7%89%88%EF%BC%89-(Copy)?node-id=0%3A1)

配色：https://colorhunt.co/

 #### 底部导航栏

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

svg fill

scss

[移动 UI date 控件](https://youzan.github.io/vant-weapp/#/calendar)



### JS 与 TS

JS 组件

```vue
<template>
	<div>
    	<ul class="types">
            <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
            <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    	</ul>
    </div>
</template>

<scrpt lang="js">
	export default {
    	name: 'Types',
    	data() {
    		return {
    			type: '-'
    		}
    	},
    	props: ['num'],
    	method: {
    		selectType(type) {
    			if (type !== '-' && type !== '+') {
    				throw new Error('type is unknown')
    			}
    		this.type = type
   			 }
    	}
    }
</scrpt>
```

TS 组件: class

[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

```vue
<template>
	<div>
    	<ul class="types">
            <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
            <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    	</ul>
    </div>
</template>

<scrpt lang="ts">
    import Vue from 'vue';
    import {Component， Prop} from 'vue-property-decorator';
    
    @Component
	export default class Types extends Vue {
    	type = '-'; // type: string = '-';
    	@Prop(Number) num: number | undefined;
		selectType(type: string) {
    			if (type !== '-' && type !== '+') {
    				throw new Error('type is unknown');
    			}
    		this.type = type
   		}
    }
</scrpt>
```

TS --(编译)--> JS --(运行)--> 浏览器

TS：强类型的 JS

全局申明类型：将类型申明在 src/custom.d.ts 中，注意命名不能为关键字

抽出函数：src/model.ts





