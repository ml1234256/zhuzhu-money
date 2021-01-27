<template>
    <div>
        <layout>
            <types :type.sync="type"/>
            <ul class="tag-list">
                <li v-for="tag in currentTagList" :key="tag.id">
                    <span>{{tag.name}}</span>
                    <div class='edit'>
                        <div @click="editTag(tag.id)"><Icon name="edit" /></div>
                        <div class='remove' @click="removeTag(tag.id)"><Icon name="remove" /></div>
                    </div>
                    
                </li>
            </ul>
            <button @click="createTag">新增标签</button>
        </layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component} from 'vue-property-decorator';
    import Types from '@/components/Money/Types.vue';
    import tagListModel from "@/models/tagListModel.ts";

    tagListModel.fetch();

    @Component({
        components: {Types}
    })
    export default class Labels extends Vue{
        type = '-';
        expendTagList = tagListModel.dataExpend;
        incomeTagList = tagListModel.dataIncome;
         get currentTagList() {
            if(this.type === '+'){
                return this.incomeTagList;
            }
            return this.expendTagList;
        }
        createTag() {
            const tagName = window.prompt('请输入标签名'); 
            if(tagName === '' || tagName === null) {
                return;
            } else {
                const message = tagListModel.create(tagName);
                if (message === 'duplicated') {
                    window.alert('标签已存在');
                } else {
                    window.alert('添加成功');
                }
            }  
        }
        editTag(id: string) {
            const name = window.prompt('重命名');
             if(name === '' || name === null) {
                return;
            } else {
                const message = tagListModel.update(id, name);
                if (message === 'duplicated') {
                    window.alert('标签名重复');
                } else if (message === 'success') {
                    window.alert('修改成功');
                }
            }
        }
        removeTag(id: string) {
            tagListModel.remove(id);
        }
        
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
.tag-list{
    > li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid $color-border;
        height: 40px;
        font-size: 16px;
        padding: 0 12px 0 16px;
    }
}
 .edit{
        display: flex;
        align-items: center;
        > div {
            padding-left: 8px;
        }
    }
.remove {
    font-size: 20px;
    color: #f00;
}
</style>
