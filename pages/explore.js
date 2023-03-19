

'use client'
import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { useState } from 'react';
import Link from 'next/link'
import { Footer } from '../components';

export default function Index({AllData, HealthData, EducationData, SocialData, StartupData, PersonalData, CreativeData, OthersData}) {
  const [filter, setFilter] = useState(AllData);

  return (
    <>
    <HomeWrapper className='bg-primary-black flex flex-col items-center pb-6'>
      
      {/* Filter Section */}
      <FilterWrapper className='flex justify-center items-center font-excratch text-secondary-white text-[12px] space-x-12 cursor-pointer '>
        
        <Category onClick={() => setFilter(AllData)}>All</Category>
        <Category onClick={() => setFilter(HealthData)}>Health</Category>
        <Category onClick={() => setFilter(EducationData)}>Education</Category>
        <Category onClick={() => setFilter(SocialData)}>Social</Category>
        <Category onClick={() => setFilter(StartupData)}>Startup</Category>
        <Category onClick={() => setFilter(PersonalData)}>Personal</Category>
        <Category onClick={() => setFilter(CreativeData)}>Creative</Category>
        <Category onClick={() => setFilter(OthersData)}>Others</Category>
      </FilterWrapper>
      <hr className='border-green border-2 w-[1081px] rounded mt-[2%] mb-[2%]'></hr>

      {/* Cards Container */}
      <CardsWrapper className='flex flex-wrap justify-between gap-x-4 gap-y-4'>

      {/* Card */}
      {filter.map((e) => {
        return (
          <Card className="h-[464px] w-[420.86px]" key={e.title}>
          <CardImg className='w-[390.8px]  h-[262.66px] relative'>
            <Image 
           
              alt="RaiseRocket dapp"
              layout='fill' 
              src={"https://raiserocket.infura-ipfs.io/ipfs/" + e.image} 
            />
          </CardImg>
          <Title className='font-kinetica text-[12px] uppercase cursor-pointer ml-3 '>
            {e.title}
          </Title>
          <CardData className='font-kross text-[12px] flex ml-3 space-x-2 mb-3'>
            <Text className='text-#828282 font-kross '>Owner :</Text> 
            <Text className='text-green font-kross'>{e.owner.slice(0,6)}...{e.owner.slice(39)}</Text>
          </CardData>
          <CardData className='font-kross text-[12px] flex ml-3 space-x-2 mb-3'>
            <Text className='font-kross'>Amount :</Text> 
            <Text>{e.amount} Matic</Text>
          </CardData>
          <CardData className='font-kross text-[12px] flex ml-3 space-x-2'>
            <Text><img src="Calendar.png"/></Text>
            <Text className='mt-1.5'>{new Date(e.timeStamp * 1000).toLocaleString()}</Text>
          </CardData>
          <Link passHref href={'/'+ e.address}><Button className='absolute right-5 transition-all duration-300 cursor-pointer
        inline-flex items-center  space-x-2 text-green hover:img hover:text-primary-black border
         border-green hover:bg-green  px-2 py-2.5 text-sm focus:outline-none focus:ring-green-300 font-excratch 
         rounded-lg text-green  dark:border-green dark:text-green dark:hover:text-primary-black dark:hover:bg-green dark:focus:ring-green w-[186.23px] h-[45.24px]'>
            Go to Campaign
          </Button></Link>
        </Card>
        )
      })}
        {/* Card */}

      </CardsWrapper>
    </HomeWrapper>
    <Footer/>
    </>
   
  )
}



export async function getStaticProps() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ADDRESS,
    CampaignFactory.abi,
    provider
  );

  const getAllCampaigns = contract.filters.campaignCreated();
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
  });

  const getHealthCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Health');
  const HealthCampaigns = await contract.queryFilter(getHealthCampaigns);
  const HealthData = HealthCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getEducationCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'education');
  const EducationCampaigns = await contract.queryFilter(getEducationCampaigns);
  const EducationData = EducationCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getSocialCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Social');
  const SocialCampaigns = await contract.queryFilter(getSocialCampaigns);
  const SocialData = SocialCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getStartupCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Startup');
  const StartupCampaigns = await contract.queryFilter(getStartupCampaigns);
  const StartupData = StartupCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getPersonalCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Personal');
  const PersonalCampaigns = await contract.queryFilter(getPersonalCampaigns);
  const PersonalData = PersonalCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });const getCreativeCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Creative');
  const CreativeCampaigns = await contract.queryFilter(getCreativeCampaigns);
  const CreativeData = CreativeCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });
  const getOthersCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Others');
  const OthersCampaigns = await contract.queryFilter(getOthersCampaigns);
  const OthersData = OthersCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });




  return {
    props: {
      AllData,
      HealthData,
      EducationData,
      SocialData,
      StartupData,
      PersonalData,
      CreativeData,
      OthersData
    },
    revalidate: 10
  }
}






const HomeWrapper = styled.div`
  
`
const FilterWrapper = styled.div`
  
`
const Category = styled.div`
 
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