import Header from "../components/Header"
import Image from 'next/image'
import { useSelector } from "react-redux"
import { selectItems, selectTotal } from "../slices/basketSlice"
import CheckoutProducts from "../components/CheckoutProducts"
import Currency from 'react-currency-formatter'
import {useSession} from "next-auth/client"
import { loadStripe } from "@stripe/stripe-js" 
import axios from "axios"
const stripePromise = loadStripe(process.env.stripe_public_key)
function checkout() {
    const  items = useSelector(selectItems)
    const Total = useSelector(selectTotal)
    const [session] = useSession()
    const CreateCheckoutSession = async() =>{
        const stripe = await stripePromise
        const checkoutSession = await axios.post('/api/createcheckoutsession',
        {
            items : items,
            email: session.user.email
        })
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        })
        if(result.error) alert(result.error.message)

    }
    return (
        <div className="bg-gray-100" >
            <Header/>
        <main className="lg:flex max-w-screen-2xl mx-auto" >

        <div className=" flex-grow m-5 shadow-sm  " >
            <Image src="https://links.papareact.com/ikj" alt="" width={1020} height={250} objectFit='contain' />
            <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4" >{items.length === 0 ? 'No Items In The Basket' : 'Your Shopping Basket'}</h1>  
            {items.map((item, i) =>(
                <CheckoutProducts

                    key={i}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    rating={item.rating}
                    description= {item.description}
                    category={item.category}
                    image ={item.image}
                    hasPrime ={item.hasPrime}
                />
            ) )}
        </div>
        </div>  
        
            <div className='flex flex-col bg-white p-10 shadow-md' >
                {items.length > 0 && (
                    <>
                        <h2 className='whitespace-nowrap font-bold' >Total ({items.length} items ): {" "}
                            <span className='font-bold' >
                                <Currency quantity={Total} currency='USD' /> 
                            </span>
                        </h2>
                        <button
                        onClick={CreateCheckoutSession} 
                        role="link" 
                        disabled={!session} 
                        className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'} `} >
                            {!session ? 'Sign in to complete' : "Proceed to checkout"}
                        </button>
                    </>
                )}
            </div>
        </main>
</div>
    )
}

export default checkout
