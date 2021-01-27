import createId from '@/lib/createId.ts';

const localStorageKeyName = { 'expend': 'expendTagList', 'income': 'incomeTagList' };
type Tag = {
    id: string;
    name: string;
}
type tagListModel = {
    dataExpend: Tag[];
    dataIncome: Tag[];
    fetch: () => void;
    save: () => void;
    create: (name: string) => 'success' | 'duplicated';
    update: (id: string, name: string) => 'success' | 'duplicated' | 'not found'; 
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
        const names = this.dataExpend.map(item => item.name);
        if (names.indexOf(name) >= 0) {
            return 'duplicated';
        }
        const id = createId().toString();
        this.dataExpend.push({ id, name });
        this.save()
        return 'success';
    },
    update(id: string, name: string) {
        const idList = this.dataExpend.map(item => item.id);
        if (idList.indexOf(id) >= 0) {
            const names = this.dataExpend.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return 'duplicated'
            } else {
                const tag = this.dataExpend.filter(item => item.id === id)[0];
                tag.name = name;
                this.save();
                return 'success';
            }
        } else {
            return 'not found';
        }

    },
    remove(id: string) {
        let index = -1;
        for (let i = 0; i < this.dataExpend.length; i++) {
            if (this.dataExpend[i].id === id) {
                index = i;
                break;
            }
        }
        this.dataExpend.splice(index, 1);
        this.save();
        return true;
    }
};

export default tagListModel;