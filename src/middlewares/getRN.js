import $ from 'jquery';

export default function (successCallback,errorCallback,смещение, размерСтраницы, текущийКаталог) {
    
    
    var адрес = 'http://localhost:9080/http-interface/services/pool/public?id=1234&' 
    var параметры = смещение ? `&смещение=${смещение}` : ``;
    параметры += размерСтраницы ? `&размерСтраницы=${размерСтраницы}` : ``;
    параметры += текущийКаталог ? `&текущийКаталог=${текущийКаталог}` : ``;
    
    var urlAuth = "http://localhost:9080/http-interface/services/session/login/public?login=9&password=123456";
    var url = `${адрес}action=получитьСписокЛСИерархияДоУлиц${параметры}`;
    console.log('запрос получитьСписокЛСИерархияДоУлиц ' + url)
    $.ajax({
       url: url,
        dataType: 'json',
        type: 'GET',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },        
        success: (data)=> successCallback(data),
        error: error=>errorCallback(error)
    });
    
    
    
     
    
}