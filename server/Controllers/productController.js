import { tastySchema } from "../Models/productSchema.js";

export const GetAllProducts = async (req, res) => {
 try {
  const data = await tastySchema.find({});
  res.send(data);
 } catch (error) {
  console.log(error.message);
 }
};

export const GetAllProductsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await tastySchema.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json("error");
  }
};

export const PostProduct = async (req, res) => {
  try {
    const newProduct = new tastySchema({ ...req.body });
    await newProduct.save();
    res.status(200).json("added!");
  } catch (error) {
    res.status(500).json("error");
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await tastySchema.findByIdAndDelete(id);
    res.status(200).json("deleted!");
  } catch (error) {
    res.status(500).json("error");
  }
};
