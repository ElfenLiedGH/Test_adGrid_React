import $ from 'jquery';

export default function (successCallback,смещение, размерСтраницы, текущийКаталог) {
    
    

    
    
    var ТЕСТМНОГОЗАПИСЕЙ = false;
    
    if(ТЕСТМНОГОЗАПИСЕЙ){
        var data = {result:{}}
        var КОЛИЧЕСТВОЗАПИСЕЙ = размерСтраницы;
        data.result.записи = [];
         for (var i = 0; i < КОЛИЧЕСТВОЗАПИСЕЙ; i++) {            
            data.result.записи.push({
                $Название: `строка номер ${i}`,
                $Название1: `строка номер ${i}`,
                $Название2: `строка номер ${i}`,
                $Название3: `строка номер ${i}`,
                $Название4: `строка номер ${i}`,
                $Название5: `строка номер ${i}`,
                $Название6: `строка номер ${i}`,
                $Название61: `строка номер ${i}`,
                $Название62: `строка номер ${i}`,
                $Название63: `строка номер ${i}`,
                $Название64: `строка номер ${i}`,
                $Название65: `строка номер ${i}`,
                $Название66: `строка номер ${i}`,
                $Название67: `строка номер ${i}`,
                $Название68: `строка номер ${i}`,
                $Название69: `строка номер ${i}`,
                
            });           
        }
        data.result.всегоЗаписей = data.result.length;
        successCallback(data);
        return;
        
    }
    
    http://localhost:9080/http-interface/services/pool/public?id=1234&action=получитьСписокЛС&размерСтраницы=20&текущийКаталог=13
    
    var адрес = 'http://localhost:9080/http-interface/services/pool/public?id=1234&' 
    var параметры = смещение ? `&смещение=${смещение}` : ``;
    параметры += размерСтраницы ? `&размерСтраницы=${размерСтраницы}` : ``;
    параметры += текущийКаталог ? `&текущийКаталог=${текущийКаталог}` : ``;
    
    var url = `${адрес}action=получитьДокументыРН${параметры}`;
    console.log('запрос ' + url)
    $.ajax({
       url: url,
        dataType: 'json',
        type: 'GET',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },        
        success: (data)=> successCallback(data),
        error: function(xhr, status, err) {
            console.error(url, status, err.toString());
        }.bind(this)
    });
    
    
    
     
    
}