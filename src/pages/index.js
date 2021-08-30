import Head from "next/head";
import Header from '../components/Header';
import Banner from '../components/Banner'
import ProductFeed from '../components/ProductFeed'
import { getSession } from "next-auth/client";



export default function Home({products}) {
  return (
    <div className='bg-gray-100' >

      <Head>
        <title>Amazon</title>
      </Head>
        <Header/>
        <main className='max-w-screen-2xl mx-auto' >
        <Banner/>
        <ProductFeed products={products} />
        </main>
    </div>
  );
}


export async function getServerSideProps(context){
  const session = await getSession(context)
  const products  = await fetch('https://api.jsonbin.io/b/6124f5a22aa80036126ef7e6/5').then(
    (res) => res.json()
  )
  return{
    props:{
      products,
      session
    }
  }
}
// GET >>> https://fakestoreapi.com/products