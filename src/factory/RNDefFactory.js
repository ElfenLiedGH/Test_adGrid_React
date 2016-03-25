
export default class ColDefFactory {

    createColDefs() {


        var columnDefs = [      
            {headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
                suppressMenu: true, pinned: true},
            {headerName: "Название", field: "название",
                        width: 150,editable: true},
            {headerName: "РасчМесяц", field: "расчмесяц",
                        width: 150,editable: true}
                        
        ];
        return columnDefs;
    }
}
