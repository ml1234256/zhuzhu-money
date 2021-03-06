type RecordItem = {
    type: string;
    selectTag: string;
    remarks: string;
    amount: number; // 数据类型 object | string
    date?: string;  // '?' 表示可以没有
}
type Tag = {
  id: string;
  type: string;
  name: string;
}

type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
}
