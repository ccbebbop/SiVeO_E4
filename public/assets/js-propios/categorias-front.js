let idSeleccionadoParaEliminar=0;
let idSeleccionadoParaActualizar=0;

function crearCategoria(){
   const descripcionCategoria= document.getElementById ('descripcionCateAlta').value
    $.ajax({
        method:'POST', //Metodo
        url: window.location.origin+"/categorias",
        data: { //Body
            descripcion:descripcionCategoria
         },
        success: function( result ) {
            if (result.estado==1){
                let categoria = result.categoria;
                //Debemos agregar la categoria la tabla
                let tabla = $('#tabla-categorias').DataTable();
                let Botones = generarBotones(categoria.id);
                let nuevoRenglon = tabla.row.add([categoria.descripcion,Botones]).node()
                //-----------linea Agregada para el ID del renglon-----------
                $(nuevoRenglon).attr('id','renglon_'+categoria.id)
                //----------------------------------------------------
                $(nuevoRenglon).find('td').addClass('table-td');
                tabla.draw(false);

                //Mostrar un mensaje agradable al usuario
              //  alert( result.mensaje)
            }else{
                alert(result.mensaje)
            }
    
        }
      });
}

function getCategorias(){
    $.ajax({
        method:"GET",// metodo
        url: window.location.origin+"/categorias", //params (pero este no usara)
        data: {  }, //Body
        success: function( result ) {
         if(result.estado==1){
            const categorias = result.categorias 
            let tabla = $('#tabla-categorias').DataTable();
            categorias.forEach(categoria => {
              let Botones = generarBotones(categoria.id);
              let nuevoRenglon = tabla.row.add([categoria.descripcion,Botones]).node()
              //-----------linea Agregada para el ID del renglon-----------
              $(nuevoRenglon).attr('id','renglon_'+categoria.id)
              //------------------------------------------------------------
              $(nuevoRenglon).find('td').addClass('table-td');
              tabla.draw( false );
            });

         }else{
            alert(result.mensaje)
         }
        }
      });
}

function borrarCategoria(){
  $.ajax({
    method:"DELETE",
    url: window.location.origin+"/categorias/"+idSeleccionadoParaEliminar,
    data: {},
    success: function( result ) {
     if(result.estado==1){
      //Debemos eliminar el renglon de la Data table
      let tabla =$('#tabla-categorias').DataTable();
      tabla.row('#renglon_'+idSeleccionadoParaEliminar).remove().draw()
     }else{
      alert(result.mensaje)
     }
    }
  });
}


function generarBotones(id){
    let Botones= '<div style="display: flex; justify-content: center;">'
    Botones+='<button type="button" class="btn  btn-outline-primary" style="display: inline-block;" data-toggle="modal" onclick="identificaActualizar('+id+');" data-target="#modal-modificar">'
    Botones+= '<i class="fas fa-edit"></i>'
    Botones+= '</button>'
    Botones+= '<button type="button" class="btn btn-outline-danger" style="display: inline-block;" data-toggle="modal" onclick="identificaEliminar('+id+');" data-target="#modal-eliminar">'
    Botones+=  '<i class="fas fa-edit"></i>'
    Botones+='</button>'
    Botones+= '</div>'
    return Botones;
};

function identificaActualizar(id){
  idSeleccionadoParaActualizar=id;
  //debemos de obtener los datos de la base de datos y mostrar en la ventana
  $.ajax({
    method:"GET",
    url: window.location.origin+"/categorias/"+idSeleccionadoParaActualizar,
    data: {  },
    success: function( result ) {
      if(result.estado==1){
        let categoria = result.categoria;
        //Mostramos en la ventana 
        document.getElementById('descripcionCategoriaActualizar').value=categoria.descripcion;
      }else{
        alert(result.mensaje)
      }
    }
  });
}

function identificaEliminar(id){
  idSeleccionadoParaEliminar=id;
  //debemos de guardar este id de manera global
  //alert(idSeleccionadoParaEliminar);

}

function actualizarCategoria(){
  let descripcionCategoria = document.getElementById('descripcionCategoriaActualizar').value;
  $.ajax({
    method: "PUT",
    url: window.location.origin +"/categorias/"+idSeleccionadoParaActualizar, //params
    data: {//body
      descripcion:descripcionCategoria
    }, 
    success: function( result ) {
      if (result.estado==1){
        // Debemos de actualizar la tabla
        let tabla =$('#tabla-categorias').DataTable();
        let rengloTemporal = tabla.row('#renglon_'+idSeleccionadoParaActualizar).data();
        rengloTemporal[0]= descripcionCategoria;
        //Paso 3
        tabla.row('#renglon_'+idSeleccionadoParaActualizar).data(rengloTemporal).draw()
        alert(result.mensaje);
      }else{
        alert(result.mensaje);
      }
    }
  });
}

//ña mandamos llamas sin condicion
getCategorias();
//una funcion para ver solo una categoria
//dos funciones para actualizar una categorias
//dos funciones para elminar una categorias
//una funcion para crear una categorias
//una funcion que nos regrese el URL independiente: local o de railway.com o render