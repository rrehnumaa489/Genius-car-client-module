import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from "react-hook-form";
import './UpdateUser.css'

const UpdateUser = () => {
    const { register } = useForm();

   const [service, setService] = useState({});
    const {id} = useParams();

    useEffect(() => {
        const url = `http://localhost:5000/services/${id}`
        fetch(url)
        .then(res => res.json())
        .then(data => setService(data))
    }, []);

    const handleNameChange = e => {
        const updatedName = e.target.value;
        const updatedService = {name: updatedName, description: service.description, price: service.price, img: service.img};
        setService(updatedService);

    }
    const handleDescriptionChange = e => {
        const updatedDescription = e.target.value;
        const updatedService = {name: service.name, description: updatedDescription, price: service.price, img: service.img};
        setService(updatedService);
    }
    const handlePriceChange = e => {
        const updatedPrice = e.target.value;
        const updatedService = {name: service.name, description: service.description, price: updatedPrice, img: service.img};
        setService(updatedService);
    }

    const handleImageChange = e => {
        const updatedImage = e.target.value;
        const updatedService = {name: service.name, description: service.description, price: service.price, img: updatedImage};
        setService(updatedService);
    }

    const handleUpdateUser = e => {
        const url = `http://localhost:5000/services/${id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(service)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                alert('Updated Successfully');
                setService({});
            }
        })

        e.preventDefault();
    }
        
    return (
        <div className="update-user">
           
            <h2>Your Name: {service.name}</h2>
            <p>Your ID: <small>{id}</small></p>
            <form onSubmit={handleUpdateUser}>
                <input {...register("name", { required: true, maxLength: 20 })} placeholder="Name" value={service.name || ''} onChange={handleNameChange}/>
                <textarea {...register("description")} placeholder="Description" value={service.description || ''} onChange={handleDescriptionChange}/>
                <input type="number" {...register("price")} placeholder="Price" value={service.price || ''} onChange={handlePriceChange}/>
                <input {...register("img")} placeholder="image url" value={service.img || ''} onChange={handleImageChange}/>
                <input type="submit" value="Update"/>
            </form>
        </div>
    );
};

export default UpdateUser;