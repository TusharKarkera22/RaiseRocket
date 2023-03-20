import styled from 'styled-components';
import { FormState } from '../Form';
import { useContext } from 'react';

const FormLeftWrapper = () => {
  const Handler = useContext(FormState);

  return (
    <FormLeft>
      <FormInput className=' flex flex-col mt-5 border-dashed'>
        <label className='font-kinetica text-[16px] text-secondary-white'>Title</label>
        <Input className='font-kross border-dashed border-2  border-#D9D9D9 p-[15px]  mt-4 rounded' onChange={Handler.FormHandler} value={Handler.form.campaignTitle} placeholder='Campaign Title' name='campaignTitle'>
        </Input>
      </FormInput>
      <FormInput className='flex flex-col mt-5'>
        <label className='font-kinetica text-[16px] text-secondary-white'>Details</label>
        <TextArea className='mt-4 p-[15px] font-kross border-dashed border-2  border-#D9D9D9 rounded' onChange={Handler.FormHandler} value={Handler.form.story} name="story" placeholder='Describe Your Story'>
        </TextArea>
      </FormInput>
    </FormLeft>
  )
}

const FormLeft = styled.div`
  width:48%;
`

const FormInput = styled.div`
 
`
const Input = styled.input`
 
`

const TextArea = styled.textarea`
 
  margin-top:4px;
  
  overflow-x:hidden;
  min-height:340px ;
`

export default FormLeftWrapper;