import React, { useEffect, useState } from 'react';
import {restaurants} from '../../DemoDB/Db';
import { useParams } from 'react-router';
import Banner from './Banner';
import Category from './Category';
import FoodItem from './FoodItem';


const Restaurant_menu = () => {
    const {id}= useParams();
    console.log(id)
    const [restaurant,setRestaurants]=useState({})
    useEffect(()=>{
    const findOne = restaurants.find(element=>element.id === parseInt(id)); // tempotari 
    console.log(findOne)
    setRestaurants(findOne)
    },[id])
    const {id:_id,email,image,isOpen,name,}= restaurant || {}
    return (
        <div className='w-full min-h-screen  text-black'>
             <Banner image={image}></Banner>
             <Category></Category>
             <FoodItem></FoodItem>
        </div>
    );
};

export default Restaurant_menu;