var cors = require("cors");
var express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
var mongoClient=require("mongodb").MongoClient;
var conString = "mongodb://127.0.0.1:27017";
var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(express.json());
const multer = require('multer');
const crypto = require("crypto");
const path = require("path");
const { connect } = require("http2");


mongoClient.connect(conString).then(clientobj=>{
    var details={
        adminName:"Nikhil",
        adminPass:"Nikhil@123",
        mailId:"nikhilraj2908@gmail.com"
    }
    var database=clientobj.db("CRUD");
    database.collection("admin").findOne({adminName:"Nikhil"})
    .then(admin=>{
        if(!admin){
            database.collection("admin").insertOne(details).then(()=>{
                console.log("admin added defaultly");
            })
        }else{
            console.log("already exists")
        }
    })
})


app.get('/admin',(req,res)=>{
MongoClient.connect(conString).then(clientObject=>{
  var  database = clientObject.db("CRUD");
  database.collection("admin").find({}).toArray()
  .then(admin=>{
    console.log("admin loged in")
    res.send(admin);
  })
  
  })
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/images');
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(10, function (err, bytes) {
      if (err) return cb(err);
      const uniqueName = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, uniqueName); // Store unique file name
    });
  }
});

const upload = multer({ storage: storage });

app.post('/create-emp', upload.single('Image'), (req, res) => {
  var emp = {
    Name: req.body.Name,
    EmailID: req.body.EmailID,
    Mobile: parseInt(req.body.Mobile),
    Designation: req.body.Designation,
    Course: req.body.Course,
     Image: req.file ? req.file.filename : "", 
    Gender: req.body.Gender,
    Date: new Date()
  };

  MongoClient.connect(conString).then(clientObject => {
    var database = clientObject.db("CRUD");
    database.collection("employee").insertOne(emp).then(() => {
      console.log("Employee created");
      res.status(200).send("Employee created successfully");
    }).catch(err => {
      console.log(err);
      res.status(500).send("Error creating employee");
    });
  }).catch(err => {
    console.log(err);
    res.status(500).send("Error connecting to the database");
  });
});

// Update employee by _id
app.put('/update-emp/:id', upload.single('Image'), (req, res) => {
  let emp = {
    Name: req.body.Name,
    EmailID: req.body.EmailID,
    Mobile: parseInt(req.body.Mobile),
    Designation: req.body.Designation,
    Course: req.body.Course,
    Gender: req.body.Gender,
    Date: new Date()
  };

  // Check if a new image was uploaded, otherwise retain the existing one
  if (req.file) {
    emp.Image = req.file.filename;
  } else {
    emp.Image = req.body.Image; // Keep the existing image
  }

  MongoClient.connect(conString).then(clientObject => {
    var database = clientObject.db("CRUD");
    database.collection("employee").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: emp }
    ).then(() => {
      console.log("Employee updated");
      res.status(200).send("Employee updated successfully");
    }).catch(err => {
      console.log(err);
      res.status(500).send("Error updating employee");
    });
  }).catch(err => {
    console.log(err);
    res.status(500).send("Error connecting to the database");
  });
});


// Delete employee by _id
app.delete('/delete-emp/:id', (req, res) => {
  MongoClient.connect(conString).then(clientObject => {
    var database = clientObject.db("CRUD");
    database.collection("employee").deleteOne({ _id: new ObjectId(req.params.id) }).then(() => {
      console.log("Employee deleted successfully");
      res.status(200).send("Employee deleted successfully");
    }).catch(err => {
      console.log(err);
      res.status(500).send("Error deleting employee");
    });
  }).catch(err => {
    console.log(err);
    res.status(500).send("Error connecting to the database");
  });
});

// Get all employees
app.get('/get-emp', (req, res) => {
  MongoClient.connect(conString).then(clientObject => {
    var database = clientObject.db("CRUD");
    database.collection("employee").find({}).toArray().then(document => {
      res.status(200).json(document);
    }).catch(err => {
      console.log(err);
      res.status(500).send("Error fetching employees");
    });
  }).catch(err => {
    console.log(err);
    res.status(500).send("Error connecting to the database");
  });
});

// Get employee by _id
app.get('/get-emp/:id', (req, res) => {
  MongoClient.connect(conString).then(clientObject => {
    var database = clientObject.db("CRUD");
    database.collection("employee").findOne({ _id:new ObjectId(req.params.id) }).then(document => {
      res.status(200).json(document);
    }).catch(err => {
      console.log(err);
      res.status(500).send("Error fetching employee");
    });
  }).catch(err => {
    console.log(err);
    res.status(500).send("Error connecting to the database");
  });
});

app.get("/search-emp",(req,res)=>{
  MongoClient.connect(conString).then(clientObject => {
    var database=clientObject.db("CRUD");
    database.collection("employee").find({$or:[{name:req.query.name},{email:req.query.EmailID}]})
    .then(emp=>{
      res.status(200).json(emp);
    })
  })
})

app.get("/count-emp",(req,res)=>{
  MongoClient.connect(conString).then(clientObject => {
    var database = clientObject.db("CRUD");
    database.collection("employee").countDocuments().then(count=>{
      res.status(200).json(count);
    })
  })
})

app.listen(1115, () => {
  console.log("Server connected on port 1115");
});
