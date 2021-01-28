import Vue from 'vue';
import Vuex from 'vuex';
import createId from '@/lib/createId.ts';
import clone from '@/lib/clone.ts';

Vue.use(Vuex);

type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
}

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined
  } as RootState,

  mutations: {
    // recordModel
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    saveRecords(state, data: RecordItem[]) {
        window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
        console.log('save');
    },
    createRecord(state, record) {
      const recordClone: RecordItem = clone(record); // 拷贝
      if(recordClone['selectTag'] === ''){
          window.alert('请选择标签');
          return;
      }
      recordClone.date = new Date();
      state.recordList.push(recordClone); 
      store.commit('saveRecords');
      
    },
    // tagsModel
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('expendTagList') || '[]');
    },
    saveTags(state) {
      window.localStorage.setItem('expendTagList', JSON.stringify(state.tagList));
    },
    createTag(state, name: string) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
            window.alert('标签已存在')
        } else {
          const id = createId().toString();
          state.tagList.push({id, name});
          store.commit('saveTags');
          window.alert('添加成功');
        }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
          if (state.tagList[i].id === id) {
              index = i;
              break;
          }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
      } else {
        window.alert('删除失败');
      }

    },
    updateTag(state, payload: { id: string; name: string }) {
      const { id, name } = payload;
      const idList = state.tagList.map(item => item.id);
        if (idList.indexOf(id) >= 0) {
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
              window.alert('标签名重复');
            } else {
              const tag = state.tagList.filter(item => item.id === id)[0];
              tag.name = name;
              store.commit('saveTags');
              window.alert('修改成功');
            }
        } else {
          window.alert('无此标签');
        }
    }
  }
})

export default store;