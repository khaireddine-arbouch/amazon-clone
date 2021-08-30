import React from 'react'
import Image from 'next/image'
import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon
} from '@heroicons/react/outline'

import {signIn , signOut, useSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import {selectItems} from '../slices/basketSlice'
import {useSelector} from 'react-redux'

function Header() {
    const [session] = useSession()
    const router = useRouter()
    const items = useSelector(selectItems)
    return (
    <header>

            {/*top navigation bar: logo*/}

        <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2' >
            <div className='mt-2 flex items-center flex-grow sm:flex-grow-0' >
                <Image
                onClick={() => router.push('/')}
                    src="https://links.papareact.com/f90"
                    width={150}
                    height={40}
                    objectFit='contain'
                    className="cursor-pointer"
                />
            </div>

            {/*top navigation bar: search_bar*/}


            <div className='sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500' >
                {/*<div id="myDropdown" class="dropdown-content">*/}
               <input className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4' id="myInput" autocomplete="on|off" onkeyup='filterFunction()' type="text" placeholder='Search..'/>
                {/*<a href="#about">About</a>
                <a href="#base">Base</a>
                <a href="#blog">Blog</a>
                <a href="#contact">Contact</a>
                <a href="#custom">Custom</a>
                <a href="#support">Support</a>
                <a href="#tools">Tools</a>
                </div>*/}
                <SearchIcon className='h-12 p-4' />
            </div>

            {/*top navigation bar: right-side*/}
            <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap' >
                <div onClick={!session ? signIn : signOut} className='Link' >
                    <p>
                        {session ? `Hello, ${session.user.name}` : 'Sign in'}
                    </p>
                    <p className='font-extrabold md:text-sm' > Accounts & Lists</p>
                    </div>
                <div onClick={() => router.push("/orders")} className=' cursor-pointer Link' >
                    <p>Returns</p>
                    <p className='font-extrabold md:text-sm' >& Orders</p>
                </div>
                <div onClick={() => router.push('/checkout')} className='relative Link flex cursor-pointer items-center' >

                    <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold' >{items.length}</span>

                    <ShoppingCartIcon className='h-10 ' />
                    <p className=' md:inline  font-extrabold md:text-sm mt-2' >Basket</p>
                </div>
            </div>
        </div>
        {/*bottom navigation bar*/}
            <div className='flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm' >
                <div>
                    <button className='Link flex items-center cursor-pointer' class="openbtn" onclick="openNav()">☰ All</button>
                </div>
                
                        

                <p className='Link' >Prime Video</p>
                <p className='Link' >Amazon Business</p>
                <p className='Link' >Today's Deals</p>
                <p className='Link' >Electronics</p>
                <p className='Link hidden lg:inline-flex' >Food & Grocery</p>
                <p className='Link hidden lg:inline-flex' >Prime</p>
                <p className='Link hidden lg:inline-flex' >Buy Again</p>
                <p className='Link hidden lg:inline-flex' >Shopper Toolkit</p>
                <p className='Link hidden lg:inline-flex' >Health & Personal Care</p>
            </div> 
    </header>
    )
}


function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

export default Header
