//import module
const express = require('express')
let mongodb = require('mongodb')
//
let mcl = mongodb.MongoClient
//
let router = express.Router()
//
let url = require("../url")
//
router.post("/",(req,res)=>{
    let p_id = req.body.p_id
    let p_name = req.body.p_name
    let p_cost = req.body.p_cost
    let obj = {
        "p_name":p_name,
        "p_cost":p_cost
    }
    mcl.connect(url,(err,conn)=>{
        if(err)
        {
            console.log("Error in connection:-",err)
        }
        else
        {
            let db = conn.db("nodedb")
            db.collection("products").deleteOne(obj,(err)=>{
                if(err)
                {
                    res.json({'delete':'failed'})
                }
                else
                {
                    console.log("Data deleted")
                    res.json({'delete':'success'})
                }
            })
        }
    })
})
//
module.exports = router