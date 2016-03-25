
export default class ColDefFactory {

    createColDefs() {

    function addressCellRenderer(params) {
        if(params.data.тип==5) return params.data['счет-наниматель.фио'];
        return params.data.$Название;
    }


        var columnDefs = [
            {headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
                suppressMenu: true, pinned: true},
           /* {headerName: "Адрес", field: "$_адрес",
                        width: 150, pinned: true},*/
            {headerName: "Адрес", /*field: "$Название",*/
                        width: 150, pinned: true, cellRenderer: addressCellRenderer,editable: true}
                        
             , {headerName: "ROW_ID", field: "row_id",
                        width: 150, pinned: true}
                        
             , {headerName: "Номер лс", field: "номер",
                        width: 150, pinned: true}
                        
             , {headerName: "ФИО", field: "счет-наниматель.фио",
                        width: 150, pinned: true}
                                               
             , {headerName: "Примечание", field: "примечание",
                        width: 150, pinned: true}
                                               
             , {headerName: "Тест4", field: "$Название4",
                        width: 150, pinned: true}
                                               
             , {headerName: "Тест5", field: "$Название5",
                        width: 150, pinned: true}
                       
                        
                        
                        
        ];
        return columnDefs;
    }
}
