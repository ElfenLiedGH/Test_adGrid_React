import MyApp from './MyApp.jsx';
import получитьСписокДокументовРН from './middlewares/getRN.js'
import ColDefFactory from './factory/RNDefFactory.js'


export default class RN extends MyApp {
 
    constructor(){
        super();
        var pageSizeDefault= 20;   
        this.dataSource = {
            //rowCount: ???, - not setting the row count, infinite paging will be used
            pageSize: pageSizeDefault, // changing to number, as scope keeps it as a string
            getRows: (params) => {
                console.log('datasource 111');
                получитьСписокДокументовРН(                
                (data) => params.successCallback(data.result.записи, data.result.всегоЗаписей),
                params.startRow, params.endRow)
            }

        };
        
        this.state.columnDefs = new ColDefFactory().createColDefs()
        };
    }    
