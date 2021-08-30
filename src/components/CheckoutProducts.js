import React from 'react'
import Image from 'next/image'
import {StarIcon} from '@heroicons/react/solid'
import Currency from 'react-currency-formatter'
import { useDispatch } from 'react-redux'
import { addToBasket } from '../slices/basketSlice'
import {removeFromBasket} from '../slices/basketSlice'

function CheckoutProducts({id,title,price,rating,description,category,image, hasPrime}) {

    const dispatch = useDispatch()
    const addItemToBasket = () =>{
        const product ={
            id,title,price,rating,description,category,image, hasPrime
        }
        dispatch(addToBasket(product))
    }
    const removeItemFromBasket = () =>{
        dispatch(removeFromBasket({id}))
    }

    return (
        <div className="grid grid-cols-5" >
            <Image src={image} alt="" width={200} height={200} objectFit='contain'  />
        <div className='col-span-3 mx-5' >
            <p>{title}</p>  
            <div className='flex' >
                {Array(rating).fill().map((_,i)=>(
                    <StarIcon className='h-5 text-yellow-500 ' />
                ))}
            </div>
            <p className='text-xs my-2 line-clamp-2' >{description}</p>
            <div className='mb-5' >
                <Currency quantity={price} currency='USD' />
            </div>
            {hasPrime && (
                <div className='flex items-center space-x-2 -mt-5' >
                    <img className='w-12' loading='lazy' src='https://links.papareact.com/fdw' />
                    <p className='text-xs text-gray-500'>Free delivery</p>
                </div>
            )} 
        </div>
        <div className='flex flex-col space-y-2 my-auto justify-self-end' >
            <button className='mt-auto button' onClick={addItemToBasket} >Add to basket</button>
            <button className='mt-auto button' onClick={removeItemFromBasket}>Remove from basket</button>
        </div>
        
        </div>
    )
}

export default CheckoutProducts
