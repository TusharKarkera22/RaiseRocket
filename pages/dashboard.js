'use client'
import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { useEffect, useState } from 'react';
import {Footer} from '../components'
import Link from 'next/link';

export default function Dashboard() {
  const [campaignsData, setCampaignsData] = useState([]);

  useEffect(() => {
    const Request = async () => {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();
      const Address = await signer.getAddress();

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );
  
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        CampaignFactory.abi,
        provider
      );
  
      const getAllCampaigns = contract.filters.campaignCreated(null, null, Address);
      const AllCampaigns = await contract.queryFilter(getAllCampaigns);
      const AllData = AllCampaigns.map((e) => {
      return {
        title: e.args.title,
        image: e.args.imgURI,
        owner: e.args.owner,
        timeStamp: parseInt(e.args.timestamp),
        amount: ethers.utils.formatEther(e.args.requiredAmount),
        address: e.args.campaignAddress
      }
      })  
      setCampaignsData(AllData)
    }
    Request();
  }, [])

  return (
    <>
    <div className='flex flex-col h-screen justify-between bg-primary-black'>
    <div className='flex flex-col align-center items-center justify-center bg-primary-black pb-6'>
    <p className='font-excratch text-[20px] my-4 text-secondary-white bg-primary-black'>My DASHBOARD</p>
    
    <HomeWrapper  className='bg-primary-black flex flex-col align-center items-center pb-6'>

      {/* Cards Container */}
      <CardsWrapper className='flex flex-wrap w-[80%] mt-[25px] justify-between gap-x-4 gap-y-4 '>

      {/* Card */}
      {campaignsData.map((e) => {
        return (
          <Card className='w-[50%] h-[460px]' key={e.title}>
          <CardImg className='w-[300.8px]  h-[262.66px] relative ml-3 mt-1'>
            <Image
              alt="raiserocket dapp"
              layout='fill' 
              src={"https://raiserocket.infura-ipfs.io/ipfs/" + e.image} 
            />
          </CardImg>
          <Title className='font-kinetica text-[12px] uppercase cursor-pointer ml-3 '>
            {e.title}
          </Title>
          <CardData className='font-kross text-[12px] flex ml-3 space-x-2 mb-3'>
            <Text className='text-#828282 font-kross '>Owner</Text> 
            <Text className='text-green font-kross'>{e.owner.slice(0,6)}...{e.owner.slice(39)}</Text>
          </CardData>
          <CardData className='font-kross text-[12px] flex ml-3 space-x-2 mb-3'>
            <Text className='font-kross'>Amount</Text> 
            <Text className='text-green font-kross'>{e.amount} Matic</Text>
          </CardData>
          <CardData  className='font-kross text-[12px] flex ml-3 space-x-2'>
            <Text><img src="Calendar.png"/></Text>
            <Text className='mt-1.5'>{new Date(e.timeStamp * 1000).toLocaleString()}</Text>
          </CardData>
          <Link passHref href={'/'+ e.address}><Button className='absolute right-1  transition-all duration-300 cursor-pointer
        inline-flex items-center  space-x-2 text-green hover:img hover:text-primary-black border text-[10px] text-center 
         border-green hover:bg-green  p-1 text-sm focus:outline-none focus:ring-green-300 font-excratch 
         rounded-lg text-green  dark:border-green dark:text-green dark:hover:text-primary-black dark:hover:bg-green dark:focus:ring-green '>
            Go to Campaign
          </Button></Link>
        </Card>
        )
      })}
        {/* Card */}

      </CardsWrapper>
    </HomeWrapper>
    </div>
    <footer>
    <Footer  />
    </footer>
    </div>
    </>
  )
}



const HomeWrapper = styled.div`
 
`
const CardsWrapper = styled.div`
  
`
const Card = styled.div`
background: rgba( 84, 84, 84, 0.4);
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 4.5px );
-webkit-backdrop-filter: blur( 4.5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
  &:hover{
    transform: translateY(-10px);
    transition: transform 0.5s;
  }
  
  &:not(:hover){
    transition: transform 0.5s;
  }
`
const CardImg = styled.div`
  
`
const Title = styled.h2`
 
`
const CardData = styled.div`
  
  `
const Text = styled.p`
 
`
const Button = styled.button`
 
`