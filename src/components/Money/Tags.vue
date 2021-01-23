<template>
            <div class="tags">
                <ul class="types">
                    <li class="selected">支出</li>
                    <li>收入</li>
                </ul>
                <ul class="tagList">
                    <li>餐饮</li>
                    <li>交通</li>
                    <li>购物</li>
                    <li>服饰</li>
                    <li>学习</li>
                    <li>红包</li>
                    <li>其他</li>

                </ul>
                <button class="addTag">新增标签</button>
            </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: "Tags",
    })
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
.tags {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    > .types {
        display: flex;
        align-items: center;
        font-size:18px;
        height:40px;
        >li {
            border-bottom: 1px solid $color-border;
            width:50%;
            position: relative;
            &.selected::after {
                content: '';
                position:absolute;
                left: 0;
                bottom:0;
                width: 100%;
                height: 2px;
                background-color: #aaa;
            }
        }
    }
    > .tagList {
        display: flex;
        flex-wrap: wrap;
        > li {
            border: 1px solid $color-border;
            border-radius: 50%;
            $h: 42px;
            height: $h;
            width: $h;
            // padding: 12px;
            line-height: $h;
            margin: 16px;
        }
    } 
    > .addTag {
        width: 64px;
    }
}
</style>
