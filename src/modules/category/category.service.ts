import { prisma } from "../../lib/prisma"

const createCategoryIntoDb =async(payload : any)=>{
    
    const category= await prisma.category.create({
        data:{
            ...payload
            
        }
    })

    return category;
}

const getCategoriesFromDb = async()=>{
    const categories= await prisma.category.findMany();
    return categories;
}

export const categoryService = {
    createCategoryIntoDb,
    getCategoriesFromDb
}