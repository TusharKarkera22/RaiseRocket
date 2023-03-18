const CampaignFactory = require("./artifacts/contracts/Campaign.sol/CampaignFactory.json");
const Campaign = require("./artifacts/contracts/Campaign.sol/Campaign.json");
const { ethers } = require("ethers");
require("dotenv").config({ path: "./.env.local" });

const main = async () => {
  //   const provider = new ethers.providers.JsonRpcProvider(
  //     process.env.NEXT_PUBLIC_RPC_URL
  //   );

  //   const contract = new ethers.Contract(
  //     process.env.NEXT_PUBLIC_ADDRESS,
  //     CampaignFactory.abi,
  //     provider
  //   );

  //   const getDeployedCampaign = contract.filters.campaignCreated(null,null,null,null,null,null,'Health');
  //   let events = await contract.queryFilter(getDeployedCampaign);
  //   let event = events.reverse();
  //   console.log(event);

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    "0xa7204D3E5f2978518E387aD01AF49F3ae1C8072D",
    Campaign.abi,
    provider
  );

  const Donations = contract.filters.donated('0xc5D547D2aBBdB046CC7c11d25ea29cB12859b125');
  const AllDonations = await contract.queryFilter(Donations);

  const DonationsData =  AllDonations.map((e) => {
    return {
      donar: e.args.donar,
      amount: parseInt(e.args.amount),
      timestamp : parseInt(e.args.timestamp)
  }});

  console.log(DonationsData);

};

main();