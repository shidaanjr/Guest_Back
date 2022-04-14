const express = require("express")
const { API_URL } = require("./src/config/api")
const { query } = require("express");
const {} = require("./src/api/category");
const {CategoryModel} = require("./src/models/Category");
const {guestModel} = require("./src/models/Guest")
const { DB } = require("./src/config/mysql");
//create our app
//CONNECT
const app = express()

//look at the requistes where the content-type: application /json (header)


//enable listening http server
app.listen('9000', (req, resp) => {
    console.log("Server is runing on port 9000...")
});
 

app.get(`/api/displayCategories/all`, async (req, resp)=>{
try{ 
    let resQ = await DB.query(`SELECT * FROM category` )
    console.log(resQ);
    resp.send(resQ)     }
    catch (error){
     
    }
        })
    


// app.get(`/api/displayCategories/all`, (req, resp)=> {
//     DB.query(`SELECT * FROM category` , (err, resQ)=>{
//         if (err) throw err;
//         else {console.log(resQ);
//         resp.send(resQ)
//         }
//     })
// });

app.get("/api/display/categories/:id", (req, resp) =>{
    let id= req.params.id
    DB.query(`SELECT * FROM category WHERE id='${id}'`, (err, res)=>{
        if (err) throw err;
        else {
            console.log(resp);
            if(res.length===0){
                resp.send("this category DOESNT exist");

            }else{
                resp.send(res);

            }
        }
    })
})

app.get(`${API_URL.category}/:adminId/category`, (httpRep, httpResp)=>{
    let adminId= req.params.adminId;
    DB.query(`SELECT id FROM admin WHERE id = {adminId}`, (err, resp)=>{
        if (err) throw err;
        else {
            if (resQ.length === 0) {
                resp.send("<h1 style='color:red'> admin not found</h1>")
            } else {
                let query= `SELECT * FROM category WHERE admin=${adminId}`;
                DB.query(query, (err, resQ)=> {
                    if (err) throw err;
                    else {
                        console.log(resQ);
                        resp.send("this admin created" + resQ.length + "category");
                    }
                })
            }
        }

    })
});
///ADD CATEGOY
app.get("/api/:adminId/add/category", (req, resp) =>{
    let adminId= req.params.adminId;
    let newCategory= new CategoryModel("hello", "hello", req.params.adminId);
    //length of the category
    let namePattern= /^.{2,5}$/;
    if(!namePattern.test(newCategory.categoryName)) {
        resp.send("<h1 style='color:red'>lol! category name Should be at least 4 characters & maximum 12 😅 !!</h1>"
        );
        return;
    }
    //here to test length of category description
   let descriptionPattern = /^.{4,12}$/;
   if (!descriptionPattern.test(newCategory.description)) {
    resp.send(
        "<h1 style='color:red'>lol! category description Should be at least 4 characters & maximum 12 😅 !!</h1>"
      );
      return;
   }
   DB.query(`SELECT id from admin WHERE id='${adminId}'`, (err, resQ)=>{
       if (err) throw err;
       else{
           if  (resQ.length === 0){
            resp.send("<h1 style='color:red'> admin not found</h1>");

           }else {
               //checck if category name exist
               DB.query(`SELECT categoryName FROM category WHERE categoryName='${newCategory.categoryName}'` , (err,resQ)=>{
                   if (err) throw err ;
                   else console.log(resQ);
                   // yees this category exist
                   if (resQ.length>0) {
                    resp.send("category already exist");
                   } else{
                       //this category does not exist
                       DB.query(`INSERT INTO category SET ?`, newCategory, (err,resQ)=>{
                           //err cnx with database
                           if (err) throw err;
                           else {
                            resp.send("you added new category");
                           }
                       })
                   }
               })
           }
       }
   })
});

///UPDATE/edite CATEGORY
app.get("/api/:adminId/update/category", (req, resp)=>{
  let adminId= req.params.adminId;
  let categoryId= req.params.categoryId;
  DB.query(`SELECT id FROM admin WHERE id = '${adminId}'` , (err,resQ)=>{
      if (err) throw err;
      else {
          if(resQ.length === 0) {
            resp.send("<h1 style='color:red'> admin not found</h1>");
          } else {
                //check if category name exist
                DB.query( `SELECT id FROM category WHERE id ='${categoryId}'`,
                (err, resQ) => {
                  if (err) throw err;
                  else console.log(resQ);
                  //yes this does not category exist
                  if (resQ.length === 0) {
                    resp.send("category does not exist");
                  } else {
                    //this category does exist
                    DB.query(
                      `UPDATE category SET categoryName="chida", description="CHANGED" WHERE id ='${categoryId}'`,
                      (err, resQ) => {
                        //err cnx with data base
                        if (err) throw err;
                        else {
                          resp.send("you updated new category");
                        }
                      }
                    );
                  }
                }
              );
          }
      }
  })
})


///delete category
app.get("/api/:adminId/delete/category", (req, resp)=>{
    let adminId = req.params.adminId;
    let categoryId = req.params.categoryId;
    DB.query(  `SELECT * FROM category WHERE adminId='${adminId}' AND id='${categoryId}'`,(err, resQQ) =>{
        if (err) throw err;
        else{
            if (resQ.length === 0) {
                resp.send("admin or category not found");
              } else{
                  ///check if the category has no company attached to it??
                  
                }
        }
    } )
})

app.get("/api/guestCIN/BTicket", (req, resp)=>{
    let newGuest= new guestModel("BK1278");
     //lenght of CIN
    let CINPattern = /[A-Z]{2}[0-9]{4}/
    if(!CINPattern.test(newGuest.CIN)) {
        resp.send("<h1 style='color:red'>lol! CIN number is incorrect  !!</h1>"
        );
        return;
    }

    DB.query(`SELECT * from category`, (err, res)=>{
        if (err) throw err;
        else {
            console.log(resp);
            if(res.length===0){
                resp.send("categories DONT exist");

            }else{
                resp.send(res);
               
            }
        }
    })
    
})

app.get("/api/guestCIN/BTicket/Companies/:categoryId", (req, resp)=>{
    let categoryId= req.params.categoryId
    DB.query(`SELECT CompanyName FROM company WHERE categoryId='${categoryId}'` ,(err, res) =>{
        if (err) throw err;
        else{
            console.log(res)
            if(res.length===0){
                resp.send("companies DONT exist");

            }else{
                resp.send(res);
               
            }
        }
    })
})

app.get("/api/guestCIN/BTicket/Services/:Id", (req, resp)=>{
    let categoryId= req.params.categoryId
    DB.query(`SELECT CompanyName FROM company WHERE categoryId='${categoryId}'` ,(err, res) =>{
        if (err) throw err;
        else{
            console.log(res)
            if(res.length===0){
                resp.send("companies DONT exist");

            }else{
                resp.send(res);
                
            }
        }
    })
})

app.get("/api/guestCIN/BTicket/Services/:companyId" , (req, resp)=>{
    let companyId= req.params.companyId
    DB.query(``)
})

