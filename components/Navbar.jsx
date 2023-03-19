'use client';

import Link from 'next/link';




import { useRouter } from 'next/navigation';
import Wallet from '../components/layout/components/Wallet';




const Navbar = () => {
  
  const Router = useRouter();
 
 

  return(
  <nav className='bg-primary-black flex flex-col items-center '>
    <div className='flex justify-center py-4 '>
      <img src='/RaiseRocketlogo.png'
      
      className='w-[280.55px] h-[40px]'/>
    </div>
    <div className='md:flex justify-center font-excratch text-secondary-white items-center '>
     <ul className='px-4 text-[12px] hover:text-green transistion duration-300'>
     <Link passHref href={'/'} active={Router.pathname == "/" ? true : false} >
        Home
     </Link>
     
      </ul>
      <ul className='px-4 text-[12px] hover:text-green transistion duration-300'>
      <Link passHref href={'/explore'} active={Router.pathname == "/explore" ? true : false} >
        Explore
     </Link>
      </ul> 
      <ul className='px-4 text-[12px] hover:text-green transistion duration-300'>
      <Link passHref href={'/createcampaign'} active={Router.pathname == "/createcampaign" ? true : false} >
        Create
     </Link>
      </ul> 
      <ul className='px-4 text-[12px] hover:text-green transistion duration-300'>
      <Link passHref href={'/dashboard'} active={Router.pathname == "/dashboard" ? true : false} >
        Dashboard
     </Link>
      </ul> 
      <button className='absolute right-10 transition-all duration-300 cursor-pointer
        inline-flex items-center  space-x-2 text-green hover:img hover:text-primary-black border
         border-green hover:bg-green  px-2 py-2.5 text-sm focus:outline-none focus:ring-green-300 font-excratch 
         rounded-lg text-green  dark:border-green dark:text-green dark:hover:text-primary-black dark:hover:bg-green dark:focus:ring-green w-[200px]'>
      <Wallet />
      </button>
      
    
      </div>
      <hr className='border-green border-2 w-[1300px] rounded mt-[3%] mb-[2%]'></hr>
    
    
  </nav>  

  );
};

export default Navbar;