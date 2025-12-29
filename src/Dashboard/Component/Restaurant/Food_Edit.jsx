import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosPublic from '../../../Public/Hook/useAxiosPublic';
import Loading from '../../../CustomeLoading/Loading';

const Food_Edit = () => {
    const {id}= useParams();
    const axiosPublic = useAxiosPublic();
    console.log('id',id)
    const {data:food_item,refetch,isPending}=useQuery({
        queryKey:['food_item',id],
        queryFn:async()=>{
        const res = await axiosPublic.get(`/api/restaurant/single_food_item/${id}`);
        console.log('food item ::',res.data)
        return res.data;
        }
    })
    if(isPending){
        return (
            <Loading></Loading>
        )
    }

const {id:food_id,res_id,category,food_name,price,food_image,available,description}= food_item || {}
    return (
        <div>
            here is food edit page !!
        </div>
    );
};

export default Food_Edit;