import express from 'express'
import { addCourse, updateRoleToEducator } from '../controllers/educatorController'
import upload from '../configs/multer'

const educatorRouter=express.Router()

//add educator role
educatorRouter.get('/update-role',updateRoleToEducator)
educatorRouter.post('/add-course',upload.single('image'),protectEducator,addCourse)

export default educatorRouter;