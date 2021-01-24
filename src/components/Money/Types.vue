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
    import { Component } from 'vue-property-decorator';

    
    @Component
    export default class Types extends Vue{
        type ='-';
        selectType(type: string) {
            if (type !== '-' && type !== '+') {
                throw new Error('tpe is unknow');
            }
            this.type = type;
        }
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
    .types {
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
</style>