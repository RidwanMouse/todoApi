import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();


export const createNewUser = async(req,res) =>{
    try {
        const {username,email,password} = req.body;
        const newUser = await prisma.users.create({
            data:{
                username,
                email,
                password
            }
        })
        res.status(201).json({
            message: 'User created successfully'
        })
    } catch (error) {
        
    }
}


