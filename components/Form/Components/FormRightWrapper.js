'useclient'

import styled from 'styled-components';
import { FormState } from '../Form';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import {TailSpin} from 'react-loader-spinner'
import {create as IPFSHTTPClient} from 'ipfs-http-client';

const projectId = process.env.NEXT_PUBLIC_IPFS_ID
const projectSecret = process.env.NEXT_PUBLIC_IPFS_KEY
const auth = 'Basic ' + Buffer.from(projectId + ":" + projectSecret).toString('base64')

const client = IPFSHTTPClient({
  host:'ipfs.infura.io',
  port:5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
})

const FormRightWrapper = () => {
  const Handler = useContext(FormState);

  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const uploadFiles = async (e) => {
    e.preventDefault();
    setUploadLoading(true);

    if(Handler.form.story !== "") {
      try {
        const added = await client.add(Handler.form.story);
        Handler.setStoryUrl(added.path)
      } catch (error) {
        toast.warn(`Error Uploading Story`);
      }
    }


      if(Handler.image !== null) {
          try {
              const added = await client.add(Handler.image);
              Handler.setImageUrl(added.path)
          } catch (error) {
            toast.warn(`Error Uploading Image`);
          }
      }

      setUploadLoading(false);
      setUploaded(true);
      Handler.setUploaded(true);
      toast.success("Files Uploaded Sucessfully")
}

  return (
    <FormRight>
      <FormInput  className='flex flex-col mt-5 border-dashed'>
        <FormRow>
          <RowFirstInput>
            <label className='font-kinetica text-[16px] text-secondary-white'>Required Amount</label>
            <Input className='mt-3 p-[15px] font-kross border-dashed border-2  border-#D9D9D9 rounded' onChange={Handler.FormHandler} value={Handler.form.requiredAmount} name="requiredAmount" type={'number'} placeholder='Required Amount'></Input>
          </RowFirstInput>
          <RowSecondInput className='mt-6'>
            <label className='font-kinetica text-[16px] text-seondary-white'>Choose Category</label>
            <Select  className=' my-2 space-x-2 px-[70px] py-[15px] text-secondary-white font-kross border-dashed border-2  border-#D9D9D9 rounded' onChange={Handler.FormHandler} value={Handler.form.category} name="category">
              <option>Education</option>
              <option>Health</option>
              <option>Social</option>
              <option>Startup</option>
              <option>Personal</option>
              <option>Creative</option>
              <option>Others</option>
            </Select>
          </RowSecondInput>
        </FormRow>
      </FormInput>
      {/* Image */}
      <FormInput className='mt-3'>
        <label className='font-kinetica text-[16px] text-seondary-white'>Select Image</label>
        <Image className='mt-3 p-[15px] font-kross border-dashed border-2  border-#D9D9D9 rounded' alt="dapp" onChange={Handler.ImageHandler} type={'file'} accept='image/*'>
        </Image>
      </FormInput>
      {uploadLoading == true ? <Button><TailSpin color='#D9D9D9' height={20} /></Button> :
        uploaded == false ? 
        <Button  className='mt-8 translate-x-[30%] items-center transition-all duration-300 cursor-pointer
        inline-flex items-center  space-x-2 text-green hover:img hover:text-primary-black border
         border-green hover:bg-green  px-2 py-2.5 text-sm focus:outline-none focus:ring-green-300 font-excratch 
         rounded-lg text-green  dark:border-green dark:text-green dark:hover:text-primary-black dark:hover:bg-green dark:focus:ring-green' onClick={uploadFiles}>
          Upload Files to IPFS
        </Button>
        : <Button style={{cursor: "no-drop"}}>Files uploaded Sucessfully</Button>
      }
      <Button className='mt-6 translate-x-[60%]  transition-all duration-300 cursor-pointer
        inline-flex items-center  space-x-2 text-green hover:img hover:text-primary-black border
         border-green hover:bg-green  px-2 py-2.5 text-sm focus:outline-none focus:ring-green-300 font-excratch 
         rounded-lg text-green  dark:border-green dark:text-green dark:hover:text-primary-black dark:hover:bg-green dark:focus:ring-green' onClick={Handler.startCampaign}>
        Start Campaign
      </Button>
    </FormRight>
  )
}

const FormRight = styled.div`
  width:45%;
`

const FormInput = styled.div`
  
`

const FormRow = styled.div`
  
`

const Input = styled.input`

` 

const RowFirstInput = styled.div`
 
`

const RowSecondInput = styled.div`
 
`

const Select = styled.select`
 
`

const Image = styled.input`
  
  &::-webkit-file-upload-button {
    padding: 15px ;
    background-color: ${(props) => props.theme.bgSubDiv} ;
    color: ${(props) => props.theme.color} ;
    
    font-weight:bold ;
  }  
`

const Button = styled.button`

`

export default FormRightWrapper