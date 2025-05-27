import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

export const Add = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [details, setDetails] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: ""
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleDetailChange = (event) => {
    const { name, value } = event.target;
    setDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", details.name);
    formData.append("description", details.description);
    formData.append("price", Number(details.price));
    formData.append("category", details.category);
    formData.append("image", imageFile);
    try{
        const response = await axios.post("http://localhost:4000/api/food/add",formData);
        if(response.data.success)
        {
            setDetails({
            name: "",
            description: "",
            category: "Salad",
            price: ""
        })
        setImageFile(null)
        toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }
    }
    catch(error)
    {
        console.log("error adding food", error)
    }
  };

  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p className='upload-image'>Upload Image</p>
          <label htmlFor="image">
            <img src={imagePreview || assets.upload_area} alt="Preview" />
          </label>
          <input
            type="file"
            id="image"
            hidden
            required
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            type='text'
            name='name'
            placeholder='Product name'
            onChange={handleDetailChange}
            value={details.name}
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name='description'
            rows="6"
            placeholder='Product description'
            value={details.description}
            onChange={handleDetailChange}
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              name='category'
              onChange={handleDetailChange}
              value={details.category}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwiches">Sandwiches</option>
              <option value="Cakes">Cakes</option>
              <option value="Pastas">Pastas</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              type='number'
              name='price'
              placeholder='$20'
              onChange={handleDetailChange}
              value={details.price}
            />
          </div>
        </div>

        <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  );
};
