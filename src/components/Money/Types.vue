<template>
    <div>
        <ul class="types">
            <li :class="{'selected': this.type === '-'}" @click="selectType('-')">支出</li>
            <li :class="{'selected': this.type === '+'}" @click="selectType('+')">收入</li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    
    @Component
    export default class Types extends Vue{
        @Prop(String) type: string | undefined;
        selectType(type: string) {
            if (type !== '-' && type !== '+') {
                throw new Error('tpe is unknow');
            }
            this.$emit('update:type', type);
        }
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
    .types {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $color-background;
        font-size:18px;
        height:40px;
        padding: 0 16px;
        >li {
            // border: 1px solid $color-border;
            color: #fff;
            width:20%;
            position: relative;
            &.selected::after {
                content: '';
                position:absolute;
                bottom:0;
                left: 0;
                width: 100%;
                // left: 50%;
                // transform: translateX(-50%);
                // width: 60%;
                height: 2px;
                background-color: #fff;
            }
        }
    }
</style>