const multer = require('multer');
const express=require('express');
const sql=require("mysql")
const path=require("path")
const mon=require("nodemon")
var nodemailer = require('nodemailer');
const { request } = require("http");
const { connect } = require('http2');
const app=express();
const con=sql.createConnection({
host:"nodebase.crcwgeeoeb2d.us-east-1.rds.amazonaws.com",
user:"admin",
database:"form4",
password:"Pras300618"
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/'); // Directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    let filename=req.body.name;
    cb(null, filename+ '-' + Date.now() + path.extname(file.originalname)); // File naming
  }
});

const upload = multer({ storage: storage });


app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));
//app.use('/img', express.static('/img'));
app.use(express.json()); 
    app.set('img',path.join(__dirname+'img'))
    app.set('veiw engine','ejs') 
app.use(express.urlencoded({extended: true})); 
 con.connect(function(err){
    if(err){
      throw err
    }else{
   return console.log("connected")
    }
  })
app.get("/",(req,res)=>{
   return res.sendFile(__dirname+'/FORM.html')
});
app.post("/data", upload.single('img') ,(req, res) => {
    const username = req.body.name;
    const name2=req.body.name2;
    const name3=req.body.name3;
    const mail = req.body.mail;
    const mail2=req.body.mail2;
    const mail3=req.body.mail3;
    const clg = req.body.clg;
    const dep=req.body.dept;
    const dep2=req.body.dept2;
    const dep3=req.body.dept3;
    const year=req.body.Year;
    const year2=req.body.Year2;
    const year3=req.body.Year3;
    // const roll=req.body.Roll;
    const ph=req.body.phn;
    const ph2=req.body.phn2;
    const ph3=req.body.phn3;
    const pp=req.body.PP;
    const wd=req.body.WD;
    const cd=req.body.CD;
    const ws=req.body.WS;
    const pe=req.body.PE;
    const ed=req.body.ED;
    const tq=req.body.TQ;
    const online="onlne";
    const sn=null;
    console.log(username+" "+mail+" "+clg+" "+dep+" "+year+" "+ph+" "+pp+" "+wd+" "+cd+" "+ws+" "+pe+" "+ed+" "+tq)
    var q="INSERT INTO symbo(name1,name2,name3,email,email2,email3,college,department,department2,department3,year1,year2,year3,phone,phon2,phon3,Paperpresentation,WebDesign,Codedebugging,Workshop,ProjectExpo,Posterpresentation,Technicalquiz,Payment) VALUES('"+username+"','"+name2+"','"+name3+"','"+mail+"','"+mail2+"','"+mail3+"','"+clg+"','"+dep+"','"+dep2+"','"+dep3+"','"+year+"','"+year2+"','"+year3+"','"+ph+"','"+ph2+"','"+ph3+"','"+pp+"','"+wd+"','"+cd+"','"+ws+"','"+pe+"','"+ed+"','"+tq+"','"+online+"')";
    con.query(q,function(err,result){
      if(err){
        
        throw err}

      if(!err){
       
        console.log("inserted")
        console.log("name " + username);
       res.sendFile(__dirname+"/response.html")
      }
    })
    //console.log(typeof(ph)+" "+typeof(roll))
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'techsparkk.2k24@gmail.com',
      pass: 'lqes mmbi lrxz ccym'
    }
  });
  let mailfin=mail+','+mail2+','+mail3
  var mailOptions = {
    from: 'techsparkk.2k24@gmail.com',
    to: mailfin,
    subject: 'Conformatoin Mail',
   html: "<h5>Thank you for registration </h5><br><p>Dear participant your are succesfully registered for Event. If you are regitered for paper presenation kindly send the absract to this mail. </p> <br> <p> <br> <p>Do you intrested to attend our second day event workshop on 'Angular JS' click the below link and register for it. <br> <h5>Worshop Registration Link:</h5><a href='https://docs.google.com/forms/d/e/1FAIpQLScSPfB-bj7Vx3UC7zPT5YNd4u_Q7GpM-bSoe8oELkEOjasY9g/viewform?usp=sf_link'>https://docs.google.com/forms/d/e/1FAIpQLScSPfB-bj7Vx3UC7zPT5YNd4u_Q7GpM-bSoe8oELkEOjasY9g/viewform?usp=sf_link</a></p><br> <p>Join with our Whatsapp Group<br> Whatsapp : <a href='https://chat.whatsapp.com/LDk7sONV09gCDEvToaJzaV'>https://chat.whatsapp.com/LDk7sONV09gCDEvToaJzaV</a></p> <br> <h5>contact:</h5><br>Mr.M.Dhanabal AP/IT(9994036446) <br>S.Pavithra(9994036446)<br> M.T.Dharneesh(6374506995) <br> B.Vikram Kumar(9500579700)</p><center>THANK YOU..</center>"
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      return console.log(error);
    } else {
     return console.log('Email sent: ' + info.response+mailfin);
    }
  });
});
app.listen(9000);
    

