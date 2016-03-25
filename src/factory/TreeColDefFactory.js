
export default class ColDefFactory {

    createColDefs() {

    function innerCellRenderer(params) {
        var image = 'folder_closed';
        var imageFullUrl = '/img/' + image + '.png';
        return '<img src="'+imageFullUrl+'" style="padding-left: 4px;" /> ' + params.data.$Название;
    }




        var columnDefs = [      
            {headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
                suppressMenu: true, pinned: true},      
            {headerName: "Адрес", cellRenderer: {
                renderer: 'group',
                innerRenderer: innerCellRenderer
            }},
            {headerName: "ROW_ID", field: "row_id",
                        width: 150,editable: true}
                        
        ];
        return columnDefs;
    }
}
