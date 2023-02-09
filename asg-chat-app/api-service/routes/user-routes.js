const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const userRoute = express.Router();
let User = require('../schemas/user.ts');
const objectId = require('mongoose').objectId;
const jwt = require('jsonwebtoken');
const JWT_SAMPLE_TOKEN = 'Aybga8X4GO01iGKsqtyZ4cQfXaj0oCDHo-cqrWC4g1g';
const atob = require('atob');

userRoute.route('/login').post( async (req, res, next) =>  {

    const { password, email } = req.body;
    if (!email) {
        return next({ status: 403, message: "Email is required!" });
      }
      if (!password) {
        return next({ status: 403, message: "Password is required!" });
      }
      if (!email) {
        return next({ status: 403, message: "Email is required!" });
      }
  
      if (!password) {
        return next({ status: 403, message: "Password is required!" });
      }

      if(email && password){
        User.find({"email":req.body.email,"password":req.body.password},
        (error, data) => {
  
          if (error) {
            return next(error)
          } else {
              if(data.length<1 ){
                  res.send(null); 
              }
              else{
                try {
                    const token = jwt.sign(
                      {
                        email: data[0].email,
                        userId: data[0]._id,
                      },
                      JWT_SAMPLE_TOKEN,
                      {
                        expiresIn: "30m",
                      }
                    );
                  
                      res.json({ user: data[0], token });
                  
                    
                  } catch (ex) {
                    console.log(ex, "login() error");
                  }
              }
          }
        });
      }
});
userRoute.route('/refresh/token').post((req,res,next)=>{
    const { token } = req.body;
    if (!token) {
      return next({ status: 401, message: "`token` is required" });
    }
    try{
        const test= token.split(".");
       const email = atob(test[0]);
       const userId = atob(test[1]);
        if (email && userId) {
              const  token = jwt.sign({ email, userId }, JWT_SAMPLE_TOKEN, {
                  expiresIn: "30m",
                })
                res.json(token);
            }
           else {
            return next({
              status: 401,
              message: "Malformed token. Cannot refresh token." + test[1],
            });
          }
    }
    catch(err){
        console.log(err);
    }
})
// register
userRoute.route('/add-user').post((req, res, next) => {
    
    User.create({...req.body,_id: new mongoose.Types.ObjectId()}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      
      res.json(data)
    }
  })
});
// getuser list
userRoute.route('/').get((req, res) => {
    User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// get user
userRoute.route('/read-user/:id').get((req, res) => {
    User.findById(req.params.id, (error, data) => {

    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// edit user
userRoute.route('/update-user/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('User updated successfully!')
    }
  })
})
// Delete user
userRoute.route('/delete-user/:id').delete((req, res, next) => {
    User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = userRoute;