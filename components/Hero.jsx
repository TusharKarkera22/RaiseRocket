'use client';
import Link from 'next/link';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
const Hero = () => {
const Router = useRouter();
return(
  <section>
   <div className="pt-[8%] pl-[5%]">
   <Image className='flex absolute right-[1%] translate-y-[-23%]' src="./animation gif.gif" alt="animation"/>
   <p className=" flex justify-left font-kinetica font-bold text-green text-base ">RAISE A ROCKET </p>
   <p className=" flex justify-left font-kinetica font-bold text-green text-base pt-4">WITH US !</p>
   
   <p className="flex justify-left font-secondary-white text-16 font-kross pt-2">"Launch Your Dreams and Change the World </p>
   <p className="flex justify-left font-secondary-white text-16 font-kross ">with Raise Rocket: The Ultimate Crowdfunding Platform</p>
   <p className="flex justify-left font-secondary-white text-16 font-kross ">for Social Causes and Startups!"</p>
   <p className="flex justify-left font-secondary-white font-kinetica font-bold pt-[6%]">You want to ?</p>
   <div className="flex justify-left py-4 space-x-6">
   <Link passHref href={'/explore'} active={Router.pathname == "/explore" ? true : false} 
     ><button className="justify-items-start text-green hover:text-primary-black border
      border-green hover:bg-green text-center focus:ring-4 px-6 py-2.5 text-sm focus:outline-none 
      focus:ring-green-300 font-excratch rounded-lg text-green  dark:border-green dark:text-green
       dark:hover:text-primary-black dark:hover:bg-green dark:focus:ring-green">DONATE</button>
          
     </Link>
     <Link passHref href={'/createcampaign'} active={Router.pathname == "/createcampaign" ? true : false} 
     >
    <button className="justify-items-center text-green 
    hover:text-primary-black border border-green hover:bg-green focus:ring-4 px-8 py-2.5 text-sm focus:outline-none 
    focus:ring-green-300 font-excratch rounded-lg text-green  dark:border-green dark:text-green
     dark:hover:text-primary-black dark:hover:bg-green dark:focus:ring-green">RAISE</button>
    </Link>
   </div>
   </div>
  </section>
);
};

export default Hero;