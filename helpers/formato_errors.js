const formato_errors_texto = (errors)=>{
    let nuevo = {};
    let cad = "";
    for(let i=0;i<errors.length;i++)
    {
        nuevo[errors[i].path] = [];
    }
    
    for(let i=0;i<errors.length;i++)
    {
       nuevo[errors[i].path].push(errors[i].msg);
    }
    
    console.log('nuevo',nuevo,Object.keys(nuevo));

    for(let k of Object.keys(nuevo))
    {
        cad+="<b>"+k+":</b> "+nuevo[k][0]+"<br/>";
    }
    
    return cad;
}


module.exports = {
    formato_errors_texto
}