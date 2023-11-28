import categoryModel from "../models/categoryModel.js"
import slugify from 'slugify'
export const createCategoryController = async (req,res) =>{

    try {
      // console.log("req.header",req.headers);
        const {name} = req.body;
        if(!name){
            return res.status(401).send({
                success:false,
                message:"name is required"
            })
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(401).send({
                success:false,
                message:"category already exists"
            })
        }
        const category = await new categoryModel({
            name,
            slug:slugify(name)
        }).save();
        res.status(200).send({
            success:true,
            message:"category created successfully",
            category
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message:"error in category"

        })
    }
}

export const updateCategoryController = async (req,res) =>{
    try {
        const {name} = req.body;
        const{id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,
        {
            name,
            slug:slugify(name)
        },
        {new:true});
        res.status(201).send({
            success:true,
            message:"category updated successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error while updating category"
    })
}
}
// all category
export const categoryControlller = async (req, res) => {
    try {
      const category = await categoryModel.find({});
      res.status(200).send({
        success: true,
        message: "All Categories List",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all categories",
      });
    }
};
// single category
export const singleCategoryController = async (req, res) => {
    try {
      const category = await categoryModel.findOne({ slug: req.params.slug });
      res.status(200).send({
        success: true,
        message: "Get SIngle Category SUccessfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While getting Single Category",
      });
    }
};
// delete 

export const deleteCategoryCOntroller = async (req, res) => {
    try {
      console.log("coming");
      const { id } = req.params;
      await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Categry Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting category",
        error,
      });
    }
  };