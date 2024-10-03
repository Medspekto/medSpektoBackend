const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 8080;
app.use(bodyParser.json({ limit: '800mb' }));
app.use(cors());
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'bbk0mvpigingyheq89qn-mysql.services.clever-cloud.com',
    user: 'udqvci4www57zy7p',
    password: 'EjQRW63xMCm8jSqXilaw',
    database: 'bbk0mvpigingyheq89qn',
    connectTimeout: 10000,
    acquireTimeout: 10000,
  });
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('Error getting database connection: ', err);
  
    } else {
      console.log("DB Connected")
  
    }
  })

  app.use(express.json());

 app.get('/',(req,res)=>{
    res.json({
        status:200,
        message:'Welcome to MedSpekto'
    })
 }) 

 app.post('/api/createEnquiry',(req,res)=>{
  console.log(req.body)
    const data=req.body;
    console.log(data)
    pool.query(`insert into Contact (id,name,email,message,orgId) values (uuid(),?,?,?,?)`,[data.name,data.email,data.message, data.orgId],(err,results)=>{
      if(err){
        console.log(err)
        res.status(500).json({
          message:err
        })
      }else{
        res.status(200).json({
          data:"Submitted Successfully"
        })
      }
    })
 })

 app.get('/api/getEnquiry',(req,res)=>{
  pool.query(`select * from Contact`,(err,results)=>{
    if(err){
      res.json({
        status:500,
        error:err
      })
    }else{
      res.json({
        status:200,
        data:results
      })
    }
  })
 })

 app.post('/api/createOrganization',(req,res)=>{
  const data = req.body;
  pool.query(`insert into organization (id, name) values (uuid(), ?)`,[data.name],(err,results)=>{
    if(err){
      res.json({
        status:500,
        error:err
      })
    }else{
      res.json({
        status:200,
        message:'Organization Created Successfully'
      })
    }
  })
 })

 app.get('/api/Organization',(req,res)=>{
  pool.query(`select * from organization`,(err,results)=>{
    if(err){
      res.json({
        status:500,
        error:err
      })
    }else{
      res.json({
        status:200,
        data:results
      })
    }
  })
 })

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});