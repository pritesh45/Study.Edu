import {clerkClient} from '@clerk/express'
import Course from '../models/Course.js'
import {v2 as cloudinary} from 'cloudinary'

//update role to educator
export const updateRoleToEducator = async(req,res)=>{
  try{
    const userId=req.auth.userId
    await clerkClient.users.updateUserMetadata(userId,{
      publicMetadata:{
        role:'educator',
      }
    })
    resizeBy.json({success: true, message:'you can publish a course now'})
  }catch(error){
    res.json({success:false,message:error.message})

  }
}

//add new course

export const addCourse=async(req,res)=>{
  try{
    const {courseData}=req.body
    const imageFile=req.File
    const educatorId=req.auth.userId
    
    if(!imageFile){
      return res.json({success:false,message:'Thumbnail not attached'})
    }
    const parsedCourseData=await JSON.parse(courseData)
    parsedCourseData.educator=educatorId
    const newCourse=await Course.create(parsedCourseData)
    const imageUpload=await cloudinary.uploader.upload(imageFile.path)
    newCourse.courseThumbnail=imageUpload.secure_url
    await newCourse.save()

    res.json({success:true,message:'course Added'})

  }
  catch(error){
    res.json({success:false,message:error.message})

  }
  
}