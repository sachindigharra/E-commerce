import JWT from "jsonwebtoken";
import userModel from "../models/userModels.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    console.log("inside requirsesign in headers",req.headers);
    const decode = JWT.verify(                               //  jo token bna hai usko jiss data se token bnaya tha usi data mai le aata hai wapas
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;                             
    next();

  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in login middelware",
    });
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    console.log("checking mate 1 ");
    const user = await userModel.findById(req.user._id);

    // console.log("userCookie",req.cookies)      // checking all cookies which are present in browser (all cookies jo humne bnayi hai){token,user}-maded

    // const userCookie = req.cookies.user;      // accesing user cookie to acces role from it

    
    // const userObject = JSON.parse(userCookie);        // parsing data from cookie to use as user object 
    // console.log("ans to be",userObject)


    if (user.role !== 1) {                         // to use userobject here -> if(userObject.role!=1)
      return res.status(200).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
    console.log("checking mate 2 done");
  } catch (error) {
    console.log("checking mate 3");
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};