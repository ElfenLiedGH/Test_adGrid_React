import RefData from './RefData';

export default class RowDataFactory {

    createRowData(start,length) {
        var rowData = [];

        for (var i = 0; i < RefData.АДРЕС.length; i++) {            
            rowData.push({
                адрес: RefData.АДРЕС[i],
                примечание: RefData.ПРИМЕЧАНИЕ[i]
            });
        }

        return rowData;
    }

}