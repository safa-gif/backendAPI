const express = require("express");
const router = express.Router();

//import User Model
const User = require("../models/Users");

//import Bcrypt module
const bcrypt = require("bcrypt");
const user = require("../models/Users");

//SignUp
router.post("/signup", (req, res) => {
  console.log("here in create user", req.body);
  let user = {};
    User.findOne({ email: req.body.email }).then(
        (resultEmail) => {
            if (resultEmail) {
                res.status(200).json({
                    message: "that email has already registered ,please use a different email"
                });
            }
            else {
                bcrypt.hash(req.body.pwd, 10).then(cryptedPwd => {
                    user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        tel: req.body.tel,
                        pwd:cryptedPwd,
                        
                        
                    });
                    //sauvegarde (save()est une foncion prédéfinies du mongodb) 
                    user.save();
                    res.status(200).json({
                        message: "User created",
                        data:user
                        
                    })
                })
            }
        }
    )
    });


 //SignIN
 router.post("/signin", (req, res) => {
    console.log("Here user obj from FE", req.body);
    User.findOne({ email: req.body.email })
       .then((emailResult) => {
         console.log("Search by email", emailResult);
         if (!emailResult) {
           res.status(500).json({
             message: "0", // User not found
           });
         }
         return bcrypt.compare(req.body.pwd, emailResult.pwd);
       })
       .then((pwdResult) => {
         console.log("pwdResult", pwdResult);
         if (!pwdResult) {
           res.status(400).json({
             message: "1", // Password is incorrect
           });
         }
         User.findOne({ email: req.body.email }).then((finalResult) => {
           console.log("finalResult", finalResult);
           let userToSend = {
             name: finalResult.name,
             tel: finalResult.tel,
             
           };
           console.log("userToSend", userToSend);
           res.status(200).json({
             message: "2", // Successful login
             result: userToSend,
           });
         });
       });
   });


//  Edit UserBy_ID (Update)
router.put("/:id", (req, res) => {
    // param: id
    console.log("here into edit user", req.params.id);
    // new values: req.body
    console.log("here into edit user", req.body);
    User.updateOne({ _id: req.params.id },req.body).then((result) => {

      console.log("Here result after update", result),
        res.status(200).json({
          message: "Edited with success",
          
        });
    })
  });


//Get All Users
  router.get("/", (req, res) => {
    console.log("Here into BL to get all users");
    User.find().then((result) => {
      console.log("Here result after find", result);
  
  
      if (result) {
        res.status(200).json({
          message: "Here all users",
          result: result,
  
        });
      }
    });
  });



  // Business Logic: Get User By ID
router.get("/:id", (req, res) => {
  console.log("Here into get match by id", req.params.id);
  User.findOne({ _id: req.params.id }).then((result) => {
    if (result) {
      res.status(200).json({
        result: result,
        message: "Here match object",
      });
    }
  });
});

// Business Logic: Delete User By ID
router.delete("/:id", (req, res) => {
  console.log("Here into delete", req.params.id);
  User.deleteOne({ _id: req.params.id }).then((result) => {
    console.log("Here result after delete", result);
    if (result.deletedCount == 1) {
      res.status(200).json({
        alert: " Deleted with success",
        message: " Deleted with success",
      });
    }
  });
  });

  
module.exports = router;
