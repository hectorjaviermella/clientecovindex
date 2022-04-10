//console.log('arranca cliente');

const clienteWS = require('websocket').client;

const clienteWSApp = new clienteWS();
var contador =1;
//clienteWSApp.connect('wss://covindex.uncoma.edu.ar:8082/lider','echo-protocol');
clienteWSApp.connect('wss://covindex.uncoma.edu.ar:8082/lider');




clienteWSApp.on('connectFailed', function(error){
  console.log('Connect Error xx : ' + error.toString());

});


clienteWSApp.on('connect', function(connection){
   
    console.log('WwebSocket cliente conectado ' +  connection);
    var msjenvio1 = '{"version":"0.0","id":"1234","params":{"user":"20-0000-0", "password":"admin"},"method":"hello", "token":"0"}';
    var msjenvio1json = JSON.parse(msjenvio1);
    if (contador ==1) {
        contador= contador + 1;
        console.log('msj envio1  hello');
        console.log(msjenvio1);
        connection.send(msjenvio1);
    }

  
 
    connection.on('error',  function(error){
       // clienteWSApp.pong();
        console.log("coneccion error " + error.toString());
        

    });

    connection.on('close',  function(){
        console.log('echo-protocol connection closed');

    });
   
    connection.on('message',  function(message){
        if (message.type === 'utf8'){
        
        //console.log('message ');
        var msjenvio2json = msjenvio1json;
        var res= message.utf8Data;
        var resultadoenvio1json = JSON.parse(res);
      
        if (contador ==2) {

          console.log('vuelta segundo hello');
           console.log(resultadoenvio1json);
            contador = contador +1;
            msjenvio2json.method="connect";
            msjenvio2json.token= resultadoenvio1json.result.token;
        
            var hospital = resultadoenvio1json.result.hospitales;
            let params = 
              {
              "hospital": hospital[0].idHospital,
               "sector": hospital[0].sectores[0].idSector,
               "isla" : "I0"
            
                
              }
            

            msjenvio2json.params=params;
            console.log('msj envio2json  connect');
            console.log(msjenvio2json);
            //console.log(msjenvio2json);
            connection.send(msjenvio2json);
        
        }
        if (contador ==3) {
          contador= contador +1;
          var res= message.utf8Data;
        var resultadoenvio1json = JSON.parse(res);
        console.log('vuelta segundo haskhan');
        console.log(res);
        console.log(resultadoenvio1json);
        console.log(resultadoenvio1json.result.hospitales.sectores);
       


        }
         
        }
    });


  
  });




//miWebSocket.addEventListener('open', open);