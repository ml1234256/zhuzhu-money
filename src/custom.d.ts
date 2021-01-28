type RecordItem = {
    type: string;
    selectTag: string;
    remarks: string;
    amount: number; // 数据类型 object | string
    date?: Date;  // '?' 表示可以没有
}
type Tag = {
    id: string;
    name: string;
}