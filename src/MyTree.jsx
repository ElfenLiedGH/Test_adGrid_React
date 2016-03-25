import ReactDOM from 'react-dom';
import React from 'react';
import {AgGridReact} from 'ag-grid-react';

import ColDefFactory from './factory/TreeColDefFactory';
import './app.css';

import получитьСписокЛицевых from './middlewares/getAddressTree.js';

// take this line out if you do not want to use ag-Grid-Enterprise
// import 'ag-grid-enterprise';

export default class MyApp extends React.Component {

    constructor() {
        super();
        var pageSizeDefault = 20;

        this.state = {
            quickFilterText: null,
            showGrid: true,
            showToolPanel: false,
            columnDefs: new ColDefFactory().createColDefs()
        };


        this.dataSource = {
            //rowCount: ???, - not setting the row count, infinite paging will be used
            pageSize: pageSizeDefault, // changing to number, as scope keeps it as a string
            getRows: (params) => {                
                получитьСписокЛицевых((data) => {
                    console.log(data.result.записи);
                    var записи = data.result.записи.filter( элемент=>элемент.счета==-10 )
                    for(let элемент of записи){
                        элемент.подкаталоги = data.result.записи; 
                    }
                    
                    params.successCallback(записи, data.result.всегоЗаписей)}
                ,(err)=>console.log(err.toString()),               
                0, 100000)
            }

        };


        var icons = {
             groupExpanded: '<i class="fa fa-minus-square-o"/>',
             groupContracted: '<i class="fa fa-plus-square-o"/>'
        }
        
        
       
        
        var getNodeChildDetails = function(node) {
            if (node.$Папка && node.подкаталоги ) {
                
               var подкаталоги = node.подкаталоги.filter( (элемент)=>элемент.счета==node.row_id );
               if(!подкаталоги) return null;
               
               
               for(let элемент of подкаталоги){
                    элемент.подкаталоги = node.подкаталоги; 
               }
               
            //    return null;
               return{
                   group: true,
                   expanded: false,
                   children: подкаталоги
               }
               
                
              /*  return {
            group: true,
            // open C be default
            expanded: false,
            // provide ag-Grid with the children of this group
            children: подкаталоги,
            // this is not used, however it is available to the cellRenderers,
            // if you provide a custom cellRenderer, you might use it. it's more
            // relavent if you are doing multi levels of groupings, not just one
            // as in this example.
            field: 'group',
            // the key is used by the default group cellRenderer
            key: node.$Название
            
                };*/
            } else {
                return null;
            }
        }
        
        



        // the grid options are optional, because you can provide every property
        // to the grid via standard React properties. however, the react interface
        // doesn't block you from using the standard JavaScript interface if you
        // wish. Maybe you have the gridOptions stored as JSON on your server? If
        // you do, the providing the gridOptions as a standalone object is just
        // what you want!
        this.gridOptions = {
            // this is how you listen for events using gridOptions
            onModelUpdated: function() {
                console.log('event onModelUpdated received');
            },

            rowModelType: 'pagination',

            // this is a simple property
            rowBuffer: 10, // no need to set this, the default is fine for almost all scenarios
            datasource: this.dataSource,
            
            icons: icons,
            
            getNodeChildDetails: getNodeChildDetails
            

        };

    }

    onShowGrid(show) {
        this.setState({
            showGrid: show
        });
    }

    onToggleToolPanel(event) {
        this.setState({ showToolPanel: event.target.checked });
    }

    onGridReady(params) {
        
        
        this.api = params.api;
        
        var listener = (log)=>(console.log('пришло сообщение ' + log))
        
        this.api.addGlobalListener(listener)
        
        this.columnApi = params.columnApi;
    }

    selectAll() {
        this.api.selectAll();
    }

    deselectAll() {
        this.api.deselectAll();
    }

    setCountryVisible(visible) {
        this.columnApi.setColumnVisible('country', visible);
    }

    onQuickFilterText(event) {
        this.setState({ quickFilterText: event.target.value });
    }

    onCellClicked(event) {
        // console.log('onCellClicked: ' + JSON.stringify( event.data ) + ', col ' + event.colIndex);

        


    }
    
    onRowClicked(params) {
        
        
        
    }

    
    onRowDoubleClicked(event) {
        // console.log('onCellClicked: ' + JSON.stringify( event.data ) + ', col ' + event.colIndex);


console.log('rowDoubleClicked:')



    }

    onRowSelected(event) {
        console.log('onRowSelected: ' + event.node.data.name);
    }

    onRefreshData() {
        var newRowData = new RowDataFactory().createRowData();
        this.setState({
            rowData: newRowData
        });
    }

    render() {
        var gridTemplate;
        var bottomHeaderTemplate;
        var topHeaderTemplate;

        topHeaderTemplate = (
            <div>
                <div style={{ float: 'right' }}>
                    <input type="text" onChange={this.onQuickFilterText.bind(this) } placeholder="Type text to filter..."/>
                    <button id="btDestroyGrid" disabled={!this.state.showGrid} onClick={this.onShowGrid.bind(this, false) }>Destroy Grid</button>
                    <button id="btCreateGrid" disabled={this.state.showGrid} onClick={this.onShowGrid.bind(this, true) }>Create Grid</button>
                </div>
                <div style={{ padding: '4px' }}>
                    <b>Employees Skills and Contact Details</b> <span id="rowCount"/>
                </div>
            </div>
        );

        // showing the bottom header and grid is optional, so we put in a switch
        if (this.state.showGrid) {
            bottomHeaderTemplate = (
                <div>
                    <div style={{ padding: 4 }} className={'toolbar'}>
                        <span>
                            Grid API:
                            <button onClick={this.selectAll.bind(this) }>Select All</button>
                            <button onClick={this.deselectAll.bind(this) }>Clear Selection</button>
                        </span>
                        <span style={{ marginLeft: 20 }}>
                            Column API:
                            <button onClick={this.setCountryVisible.bind(this, false) }>Hide Country Column</button>
                            <button onClick={this.setCountryVisible.bind(this, true) }>Show Country Column</button>
                        </span>
                    </div>
                    <div style={{ clear: 'both' }}></div>
                    <div style={{ padding: 4 }} className={'toolbar'}>
                        <label>
                            <input type="checkbox" onChange={this.onToggleToolPanel.bind(this) }/>
                            Show Tool Panel
                        </label>
                        <button onClick={this.onRefreshData.bind(this) }>Refresh Data</button>
                    </div>
                    <div style={{ clear: 'both' }}></div>
                </div>
            );
            gridTemplate = (
                <div style={{ height: '85%' }} className="ag-fresh">
                    <AgGridReact
                        // gridOptions is optional - it's possible to provide
                        // all values as React props
                        gridOptions={this.gridOptions}

                        // listening for events
                        onGridReady={this.onGridReady.bind(this) }
                        onRowSelected={this.onRowSelected.bind(this) }
                        onCellClicked={this.onCellClicked.bind(this) }
                        
                        onRowDoubleClicked={this.onRowDoubleClicked.bind(this) }
                        onRowClicked={this.onRowClicked.bind(this) }

                        // binding to simple properties
                        showToolPanel={this.state.showToolPanel}
                        quickFilterText={this.state.quickFilterText}

                        // binding to an object property
                        icons={this.state.icons}

                        // binding to array properties
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}

                        // no binding, just providing harde coded strings for the properties
                        rowSelection="multiple"
                        enableColResize="true"
                        // enableSorting="true"
                        // enableFilter="true"
                        groupHeaders="true"
                        rowHeight="22"

                        dataSource={this.dataSource}

                        debug="true"
                        />
                </div>
            );
        }

        return <div style={{ width: '100%' }}>
            <div style={{ padding: '4px' }}>
                
                {gridTemplate}
            </div>
        </div>;
    }

}
