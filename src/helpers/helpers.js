//err msg func
exports.error=(msg="")=>`<h2 style='color:red'>${msg}</h2>`


// json resp
exports.respJson =(status=0, message="", httpResp)=>{
    httpResp
    .status(status)
    .json({message})
} 

exports.sqlQuery=(sql,insertedData=null) => new Promise((resolve, reject) => {

    //in case of insert query
    if(insertedData)  // if is it true
  DB.query(sql,insertedData,(err, res) => {
        if (err) reject(err)
        else { resolve(res) }
    })
    else
  DB.query(sql,(err, res) => {
        if (err) reject(err)
        else { resolve(res) }
    })
})

sqlQuery
respJson(500, error.message,resp )
