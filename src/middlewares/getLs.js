import $ from 'jquery';

export default function (successCallback,смещение, размерСтраницы, текущийКаталог) {
    
    var адрес = 'http://localhost:9080/http-interface/services/pool/public?id=1234&' 
    var параметры = смещение ? `&смещение=${смещение}` : ``;
    параметры += размерСтраницы ? `&размерСтраницы=${размерСтраницы}` : ``;
    параметры += текущийКаталог ? `&текущийКаталог=${текущийКаталог}` : ``;
    
    var urlAuth = "http://localhost:9080/http-interface/services/session/login/public?login=9&password=123456";
    var url = `${адрес}action=получитьСписокЛС${параметры}`;
    console.log('запрос ' + url)
    $.ajax({
        url: urlAuth,
        dataType: 'json',
        type: 'GET',        
        success: (data)=>{
            console.log("отправка после логина")
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
            })
        }, 
        error: function(xhr, status, err) {
            console.error(urlAuth, status, err.toString());
        }.bind(this)
    });
    
    
    
     
    
}