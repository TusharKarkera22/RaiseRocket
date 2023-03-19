'use client'

import styled from "styled-components";
import Image from "next/image";
import {ethers} from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import Campaign from '../artifacts/contracts/Campaign.sol/Campaign.json'
import { useEffect, useState } from "react";
import { Footer } from "../components";


export default function Detail({Data, DonationsData}) {
  const [mydonations, setMydonations] = useState([]);
  const [story, setStory] = useState('');
  const [amount, setAmount] = useState();
  const [change, setChange] = useState(false);

  useEffect(() => {
    const Request = async () => {
      let storyData;
      
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();
      const Address = await signer.getAddress();

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );
    
      const contract = new ethers.Contract(
        Data.address,
        Campaign.abi,
        provider
      );

      fetch('https://raiserocket.infura-ipfs.io/ipfs/' + Data.storyUrl)
            .then(res => res.text()).then(data => storyData = data);

      const MyDonations = contract.filters.donated(Address);
      const MyAllDonations = await contract.queryFilter(MyDonations);

      setMydonations(MyAllDonations.map((e) => {
        return {
          donar: e.args.donar,
          amount: ethers.utils.formatEther(e.args.amount),
          timestamp : parseInt(e.args.timestamp)
        }
      }));

      setStory(storyData);
    }

    Request();
  }, [change])


  const DonateFunds = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const contract = new ethers.Contract(Data.address, Campaign.abi, signer);
      
      const transaction = await contract.donate({value: ethers.utils.parseEther(amount)});
      await transaction.wait();

      setChange(true);
      setAmount('');
      
  } catch (error) {
      console.log(error);
  }

  }

  return (
    <>
    <div className="flex flex-col items-center bg-primary-black pb-6">
    <DetailWrapper className="flex justify-betweeen w-[1140px] h-[549px]">
      <LeftContainer className="mt-[4%]">
        <ImageSection>
          <Image
          className="border-1 border-green rounded"
            alt="raiserocket dapp"
            layout="fill"
            src={
              "https://raiserocket.infura-ipfs.io/ipfs/" + Data.image
            }
          />
        </ImageSection>
        <Text className="font-kross text-[14px] text-secondary-white ml-2 border-2 border-dashed rounded border-green ring-offset-green-100/20 mt-[6%]">
          {story}
        </Text>
      </LeftContainer>
      <RightContainer className="mt-4 ml-4 ">
        <Title className="font-excratch text-[20px] text-secondary-white ">{Data.title}</Title>
        <DonateSection className="mt-4 flex justify-between items-center mt-[7%]">
          <Input className=" p-[15px] font-kross border-dashed border-2  border-#D9D9D9 rounded" value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Enter Amount To Donate" />
          <Donate className="w-[180px] h-[40px ] translate-x-[-30%] translate-y-[-10%] flex justify-center align-center transition-all duration-300 cursor-pointer
        inline-flex items-center  space-x-2 text-green hover:img hover:text-primary-black border
         border-green hover:bg-green  px-2 py-2.5 text-sm focus:outline-none focus:ring-green-300 font-excratch 
         rounded-lg text-green  dark:border-green dark:text-green dark:hover:text-primary-black dark:hover:bg-green dark:focus:ring-green" onClick={DonateFunds}>Donate</Donate>
        </DonateSection>
        <FundsData className="flex justify-between mt-[8%] ">
          <Funds className="align-center">
            <FundText className="font-kinetica text-[20px] text-secondary-white">Required Amount</FundText>
            <FundText className="translate-x-[30%] font-kross text-[18px]  ">{Data.requiredAmount} Matic</FundText>
          </Funds>
          <Funds className="align-center ">
            <FundText className="font-kinetica text-[20px] text-secondary-white ">Received Amount</FundText>
            <FundText className="translate-x-[30%] font-kross text-[18px]  " >{Data.receivedAmount} Matic</FundText>
          </Funds>
        </FundsData>
        <Donated className="h-[280px] mt-[15px]  border-dashed border-2  border-#D9D9D9 rounded">
          <LiveDonation>
            <DonationTitle className="font-excratch text-[12px] text-green align-center border-green border-b-2 p-3 text-center">Recent Donation</DonationTitle>
            {DonationsData.map((e) => {
              return (
                <Donation key={e.timestamp}>
                <DonationData className="font-kross text-[12px] text-green">{e.donar.slice(0,6)}...{e.donar.slice(39)}</DonationData>
                <DonationData className="font-kross text-[12px] text-secondary-white">{e.amount} Matic</DonationData>
                <DonationData className="font-kross text-[12px] text-secondary-white">{new Date(e.timestamp * 1000).toLocaleString()}</DonationData>
              </Donation>
              )
            })
            }
          </LiveDonation>
          <MyDonation>
            <DonationTitle className="font-excratch text-[12px] text-green align-center border-green border-b-2 p-3 text-center">My Past Donation</DonationTitle>
            {mydonations.map((e) => {
              return (
                <Donation key={e.timestamp}>
                <DonationData className="font-kross text-[12px] text-green">{e.donar.slice(0,6)}...{e.donar.slice(39)}</DonationData>
                <DonationData  className="font-kross text-[12px] text-secondary-white">{e.amount} Matic</DonationData>
                <DonationData className="font-kross text-[12px] text-secondary-white">{new Date(e.timestamp * 1000).toLocaleString()}</DonationData>
              </Donation>
              )
            })
            }
          </MyDonation>
        </Donated>
      </RightContainer>
    </DetailWrapper>
    </div>
    <Footer/>
    </>
  );
}


export async function getStaticPaths() {
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

  return {
    paths: AllCampaigns.map((e) => ({
        params: {
          address: e.args.campaignAddress.toString(),
        }
    })),
    fallback: "blocking"
  }
}

export async function getStaticProps(context) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    context.params.address,
    Campaign.abi,
    provider
  );

  const title = await contract.title();
  const requiredAmount = await contract.requiredAmount();
  const image = await contract.image();
  const storyUrl = await contract.story();
  const owner = await contract.owner();
  const receivedAmount = await contract.receivedAmount();

  const Donations = contract.filters.donated();
  const AllDonations = await contract.queryFilter(Donations);


  const Data = {
      address: context.params.address,
      title, 
      requiredAmount: ethers.utils.formatEther(requiredAmount), 
      image, 
      receivedAmount: ethers.utils.formatEther(receivedAmount), 
      storyUrl, 
      owner,
  }

  const DonationsData =  AllDonations.map((e) => {
    return {
      donar: e.args.donar,
      amount: ethers.utils.formatEther(e.args.amount),
      timestamp : parseInt(e.args.timestamp)
  }});

  return {
    props: {
      Data,
      DonationsData
    },
    revalidate: 10
  }


}




const DetailWrapper = styled.div`
background: rgba( 84, 84, 84, 0.4);
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 4.5px );
-webkit-backdrop-filter: blur( 4.5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );

`;
const LeftContainer = styled.div`
  width: 45%;
`;
const RightContainer = styled.div`
  width: 50%;
`;
const ImageSection = styled.div`
  width: 100%;
  position: relative;
  height: 350px;
`;
const Text = styled.p`
  
`;
const Title = styled.h1`
  
`;
const DonateSection = styled.div`
  
`;
const Input = styled.input`
 
`;
const Donate = styled.button`
  
`;
const FundsData = styled.div`
  
`;
const Funds = styled.div`
 
`;
const FundText = styled.p`
  
`;
const Donated = styled.div`
  
`;
const LiveDonation = styled.div`
  height: 65%;
  overflow-y: auto;
`;
const MyDonation = styled.div`
  height: 35%;
  overflow-y: auto;
`;
const DonationTitle = styled.div`
 
`;
const Donation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  
  padding: 4px 8px;
`;
const DonationData = styled.p`
 
`;