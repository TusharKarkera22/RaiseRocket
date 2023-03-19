import { Inter } from 'next/font/google'

import { Footer, Navbar,Hero,About } from '../components';

const inter = Inter({ subsets: ['latin'] })

const Home = () => (
  <div className="bg-primary-black ">
    
    <Hero/>
    <About/>
    <Footer/>
  </div>
);

export default Home;