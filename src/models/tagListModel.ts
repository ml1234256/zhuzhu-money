const localStorageKeyName = {'expend': 'expendTagList', 'income': 'incomeTagList'};
// type Tag = {
//     id: string;
//     name: string;
// }
type tagListModel = {
    dataExpend: string[];
    dataIncome: string[];
    fetch: () => void;
    save: () => void;
    create: (name: string) => 'success' | 'duplicated';
    update: (id: string, name: string) => 'success' | 'not found'; 
    remove: (id: string) => boolean;
}
const tagListModel: tagListModel = {
    dataExpend: [],
    dataIncome: [],
    fetch() {    
        this.dataExpend = JSON.parse(window.localStorage.getItem(localStorageKeyName['expend']) || '[]');
        this.dataIncome = JSON.parse(window.localStorage.getItem(localStorageKeyName['income']) || '[]');
    },
    save() {
        window.localStorage.setItem(localStorageKeyName['expend'], JSON.stringify(this.dataExpend));
        window.localStorage.setItem(localStorageKeyName['income'], JSON.stringify(this.dataIncome));
    },
    create(name: string) {
        return 'success';
    },
    update(id: string, name: string) {
        return 'success';
    },
    remove(id: string) {
        return true;
    }
};

export default tagListModel;