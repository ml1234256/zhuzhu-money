<template>
            <div class="tagBox">

                <ul class="tagList">
                    <li v-for="tag in dataSource" :key="tag" :class="{selected: selectedTag === tag}" @click="toggle(tag)">{{tag}}</li>
                    <li class="addTag" @click="addTag"> + </li>
                </ul>
                <!-- <button class="addTag">新增标签</button> -->
            </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop, Watch } from 'vue-property-decorator';

    @Component
    export default class Tags extends Vue{
        selectedTag = '';
        @Prop(Array) readonly dataSource: string[] | undefined;

        toggle(tag: string) {
            if (this.selectedTag === tag) {
                this.selectedTag = '';
            } else{
                this.selectedTag = tag;
            }
            this.$emit('update:value', this.selectedTag)
        }
        addTag() {
            const tagName = window.prompt('请输入标签名'); 
            console.log(this.dataSource);
            if(tagName === '' || tagName === null) {
                return;
            } else if(this.dataSource){
                if(this.dataSource.indexOf(tagName) >= 0) {
                    window.alert('标签已存在');
                }else{
                    this.$emit('update:dataSource', tagName);
                    // this.$emit('update:dataSource', [...this.dataSource, tagName]);
                }  
            }
        }
    }
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
.tagBox {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 4px 8px;
    > .tagList {
        display: flex;
        flex-wrap: wrap;
        padding: 4px;
        > li {
            border: 1px solid $color-border;
            border-radius: 4px;
            height: 28px;
            width: 72px;
            // padding: 12px;
            line-height: 28px;
            margin: 4px 7px;
            &.selected {
                background-color: #666;
                color: #fff;
            }
            &.addTag {
                font-size: 28px;
            }
        }
    } 
}
</style>
