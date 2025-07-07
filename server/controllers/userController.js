import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'


//signup
export const signup = async(req,res)=>{
    const {fullName,email,password,bio}=req.body;
    try {
        if(!fullName || !email || !password || !bio){
            return res.json({success:false, message:"Missing Details"})
        }
        const user = await User.findOne({email})
        if(user){
            return res.json({success:false, message:"Account already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,email,password:hashedPassword,bio
        });

        const token = generateToken(newUser._id)
        res.json({success:true,userData:newUser,token,message:"Account created successfully"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }
}


//login

export const login = async(req,res)=>{
    try {
        const {email,password}=req.body;
        const userData = await User.findOne({email})


        const isPasswordCorrect = await bcrypt.compare(password,userData.password)

        if(!isPasswordCorrect){
            return res.json({success:false,message:"Invalid credentials"});
        }
         const token = generateToken(userData._id)
        res.json({success:true,userData,token,message:"Login successfully"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}


//controller to check if user is authentication
export const checkAuth = (req,res)=>{
    res.json({success:true,user:req.user})
}

//controller to update user profilr details

export const updateProfile=async(req,res)=>{

    if(!req.body) return res.json({success:false,message:"no proper data,please send valid data"})
    console.log("after if")

    try {
        const {profilePic,bio,fullName}=req.body;
        console.log("body:",{profilePic,bio,fullName})
        const userId = "686a7e6ca4b0bba0335ef321";
        // console.log("userid:",req.user._id)
        // const userId = req.user._id;
        let updateUser;

        if(!profilePic){
            updateUser=await User.findOneAndUpdate(userId,{bio,fullName},
            {new:true})
        }
        else{
    
            const upload = await cloudinary.uploader.upload(profilePic);
            updateUser=await User.findByIdAndUpdate(userId,{profilePic:upload.secure_url,bio,fullName,},
                {new:true});
        }
           

        res.json({success:true,user:updateUser})
    } catch (error) {
        console.log("error:",error.message);
        res.json({success:false,message:error.message})
        
    }
}