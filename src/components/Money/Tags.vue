<template>
            <div class="tagBox">

                <ul class="tagList">
                    <li v-for="tag in dataSource" :key="tag.id" :class="{selected: selectedTag === tag.name}" @click="toggle(tag.name)">
                        {{tag.name}}
                    </li>
                    <li class="addTag"> 
                        <router-link to="/labels" class="edit">全部</router-link>
                    </li>
                </ul>
                <!-- <button @click="addTag">新增标签</button> -->
            </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop} from 'vue-property-decorator';

    @Component
    export default class Tags extends Vue{
        selectedTag = '';
        @Prop(Array) readonly dataSource: string[] | undefined;

        toggle(name: string) {
            console.log('toggle');
            if (this.selectedTag === name) {
                this.selectedTag = '';
            } else{
                this.selectedTag = name;
            }
            this.$emit('update:value', this.selectedTag)
        }

    }
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
.tagBox {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 4px 6px;
    > .tagList {
        display: flex;
        flex-wrap: wrap;
        padding: 4px;
        > li {
            border: 1px solid $color-border;
            border-radius: 4px;
            height: 28px;
            width: 76px;
            line-height: 28px;
            font-size: 16px;
            margin: 6px;
            &.selected {
                background-color: #666;
                color: #fff;
            }
            >.edit {
                color: #ccc;
            }
        }
    } 
}
</style>
