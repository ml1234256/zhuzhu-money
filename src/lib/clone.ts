const clone = (date: RecordItem[] | RecordItem) => {
    return JSON.parse(JSON.stringify(date));
}

export default clone;