
export default class ColDefFactory {

    createColDefs() {

        var columnDefs = [
            {headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
                suppressMenu: true, pinned: true},
           /* {headerName: "Адрес", field: "$_адрес",
                        width: 150, pinned: true},*/
            {headerName: "Адрес", field: "$Название",
                        width: 150, pinned: true},
        ];
        return columnDefs;
    }
}
