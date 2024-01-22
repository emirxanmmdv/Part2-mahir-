import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddPage = () => {
  const [product, setProduct] = useState("");
  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:8000/products/");
      setProduct(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const postProduct = async (values) => {
    const response = await axios.post(
      "http://localhost:8000/products/",
      values
    );
    getProduct();
  };

  const deleteProduct = async (id) => {
    const response = await axios.delete(`http://localhost:8000/products/${id}`);
    getProduct();
  };
  return (
    <>
      <Formik
        initialValues={{ image: "", name: "", desc: "", price: "" }}
        validationSchema={Yup.object({
          image: Yup.string().required("Required"),
          name: Yup.string()
            .matches(/^[a-zA-Z ]+?$/, "Only text allowed")
            .required("Required"),
          desc: Yup.string().required("Required"),
          price: Yup.number()
            .positive("price must be higher than 0")
            .required("Required"),
        })}
        onSubmit={(values, { resetForm }) => {
          postProduct(values);
          resetForm({ values: "" });
        }}
      >
        <Form>
          <label htmlFor="image">URL : </label>
          <Field name="image" type="text" />
          <ErrorMessage name="image" />

          <label htmlFor="name">Name : </label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />

          <label htmlFor="desc">Desc: </label>
          <Field name="desc" type="text" />
          <ErrorMessage name="desc" />

          <label htmlFor="price">Price: </label>
          <Field name="price" type="text" />
          <ErrorMessage name="price" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <div className="productTable">
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {product
              ? product.map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>
                      <img src={item.image} />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{item.price}</td>
                    <td>
                      <button onClick={() => deleteProduct(item._id)}>X</button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AddPage;
