const localStorageKeyName = 'recordList'
const recordListModel = {
    clone(date: RecordItem[] | RecordItem) {
        return JSON.parse(JSON.stringify(date));
    },
    fetch() {
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    },
    save(data: RecordItem[]) {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
        console.log('save');
    }
}

export default recordListModel;