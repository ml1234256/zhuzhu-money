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
            <button class="createTag" @click="createTag">新增标签</button>
        </layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component} from 'vue-property-decorator';
    import Types from '@/components/Money/Types.vue';

    @Component({
        components: {Types}
    })
    export default class Labels extends Vue{
        type = '-';
         get currentTagList() {
            if(this.type === '+'){
                return this.$store.state.tagList;
            }
            return this.$store.state.tagList;
        }
        created(){
            this.$store.commit('fetchTags');
        }
        createTag() {
            console.log(this.currentTagList);
            const tagName = window.prompt('请输入标签名'); 
            if(tagName === '' || tagName === null) {
                return;
            }
            this.$store.commit('createTag', tagName);  
        }
        editTag(id: string) {
            const name = window.prompt('重命名');
             if(name === '' || name === null) {
                return;
            } else {
               this.$store.commit('updateTag', {id, name});
            }
        }
        removeTag(id: string) {
            this.$store.commit('removeTag', id);
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
.createTag {
    background: rgb(0, 115, 192);
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 15px;
    margin: 80px auto;
    padding: 6px 12px;
}
</style>
