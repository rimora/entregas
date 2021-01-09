$(document).ready(function() {
    
/*
    document.addEventListener("deviceready",function(){ 

    
  },false);//document.addEventListener("deviceready",function(){    

*/
var existearticulo=0;
var json = {"alumnoUTP":[{"nombre":"Ricardo","apePaterno":"Carpio","edad":39},{"nombre":"Thiago","apePaterno":"Carpio","edad":5},{"nombre":"José","apePaterno":"Carpio","edad":74}]};


$('#BtnIngresa').click(function () {  
      window.location.href='#pagina2';  
 });
 $('#pagina2').live('pagebeforeshow',function(event, ui){
        
	var DatosJson = JSON.parse(JSON.stringify(json));
    //console.log(DatosJson.alumnoUTP.length);
    $("#tabla").append('<tr><td>Nombre</td>'+
 	'<td>Apellido paterno</td>' + 
 	'<td>Edad</td>');
    for (i = 0; i < DatosJson.alumnoUTP.length; i++){
 
		$("#tabla").append('<tr>' + 
		'<td align="center" style="dislay: none;">' + DatosJson.alumnoUTP[i].nombre + '</td>'+
		'<td align="center" style="dislay: none;">' + DatosJson.alumnoUTP[i].apePaterno + '</td>'+
		'<td align="center" style="dislay: none;">' + DatosJson.alumnoUTP[i].edad + '</td>'+'</tr>');
	}
 });
 $('#txt-articulo').focusout(function() {
       var articulo= $('#txt-articulo').val();  
      
       /*
       $.ajax({url: "http://189.198.138.202:7010/api/articulos/"+ articulo, success: function(resultado){
            
          //alert(resultado[0].Descripcion);
          
            $('#DescripcionArticulo').html(resultado[0].Descripcion);
               existearticulo=1;
                 
            },error : function(xhr, status) {        
              
              $('#DescripcionArticulo').html("Articulo no encontrado en el catálogo");
              
            }
          });//AJAX

*/
      //alert(articulo);
     
                          $.ajax({
                            url: "http://189.198.138.202:7010/api/articulos/"+ articulo,
                         //   url: "http://192.168.0.102:7010/api/articulos/"+ articulo,
                            type: "GET",
                            dataType: 'json',
                           // data:{dispositivo:dispositivo,tipooperacion:operacion,devcab:detalles},
                            success: function(resultado){
                            // Se ejecuta cuando se ha recibido correctamente
                            // los datos de la url
                                $('#DescripcionArticulo').html(resultado[0].Descripcion);
                                existearticulo=1;     
                            },
                            error: function(jqxhr, textStatus, error){
                                $('#DescripcionArticulo').html("Articulo no encontrado en el catálogo");
                                
                            },
                            async: false, // La petici�n es s�ncrona
                            cache: false // No queremos usar la cach� del navegador
                            });



/*
                $.getJSON("http://192.168.1.77:7010/api/articulos/"+ articulo, function(resultado) {
                  $('#DescripcionArticulo').html(resultado[0].Descripcion);
                                existearticulo=1;     
               });

*/



});

$('#BtnGuardar').click(function () {
    var cantidad= $('#num-cantidad').val();  
    var articulo= $('#txt-articulo').val();  
    var bodega= $('#selectbodega').val(); 
    var boleta= $('#txt-boleta').val(); 
	
       if (cantidad<=0 || existearticulo==0)
       {
        alert("La cantidad debe ser mayor a cero y debe existir el articulo en el catalogo");
       }
       else
       {
         var objetoarticulo =  
                 {  
          
                     clavearticulo: articulo,  
                     descripcion: "LXI",   
                     existencia: cantidad,  
                     bodega: bodega,
                     boleta: boleta
          
                };  
         
            var t = JSON.stringify(objetoarticulo);  
           
            
            
            
            $.ajax({type: "POST",  url: "http://189.198.138.202:7010/api/articulos/", contentType: "application/json; charset=utf-8",
           // $.ajax({type: "POST",  url: "http://192.168.0.102:7010/api/articulos/", contentType: "application/json; charset=utf-8",
                dataType: "json", data:t}).done(function( filasafectadas ) {  
               
                if (filasafectadas>0)
                {
                  $('#txt-boleta').val(""); 
                  $('#txt-articulo').val(""); 
                  $('#num-cantidad').val(0);
                  $('#DescripcionArticulo').html("");
                  existearticulo=0;
                  alert("Articulo insertado");
                }
                else
                {
                    alert("Ocurrio un error al guardar el conteo, consulte al administrador del sistema");
                }



            
            }); //AJAX  




          /*
          $.ajax({url: "http://localhost:7010/api/articulos/"+ articulo, success: function(resultado){
            
          //alert(resultado[0].Descripcion);
          
            $('#DescripcionArticulo').html(resultado[0].Descripcion);
               
                 
            },error : function(xhr, status) {        
              
              $('#DescripcionArticulo').html("Articulo no encontrado en el catálogo");
              
            }
          });//AJAX
*/
             
           



        }//existearticulo
    });//click
   
});//$(document).ready(function()