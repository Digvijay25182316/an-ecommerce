import React, { useContext, useState } from 'react'
import { Box, Button, VStack,Input,FormLabel, SimpleGrid} from '@chakra-ui/react'
import axios from 'axios'
import { SERVER_URL } from '../../App'
import { CartContext } from '../../context/store'
export const fileuploadStyle={
    cursor:"pointer",
    marginLeft:"-5%",
    width:'110%',
    height:"100%",
    border:"none",
    color:"purple",
    backgroundColor:"white",
}

const createProduct =async(formdata,token)=>{
    const data = await axios.post(`${SERVER_URL}/admin/createproduct`,formdata,{headers:{
        "Content-Type":"multipart/form-data",
        Authorization:`Bearer <${token}>`
    },
    withCredentials:true
})
    return data
}

function CreateProductForm() {
    const {loadingHandler,successHandler,ErrorHandler}=useContext(CartContext)
    const [name,setName] = useState("")
    const [price,setPrice] = useState("")
    const [description,setDescription] = useState("")
    const [category,setCategory] = useState("")
    const [quantity,setQuantity] = useState("")
    const [features,setFeatures] = useState("")
    const [brand,setBrand] =useState("")
    const [imagePrev,setImagePrev] = useState('')
    const [image,setImage] = useState('')
    const [material,setMaterial] = useState("")

    const formdata =new FormData()
    formdata.append("name",name)
    formdata.append("price",price)
    formdata.append("description",description)
    formdata.append("category",category)
    formdata.append("quantity",quantity)
    formdata.append("brand",brand)
    formdata.append("material",material)
    formdata.append("features",features)
    formdata.append("file",image)

    const changeImageHandler=(e)=>{
        const file=e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setImagePrev(reader.result)
            setImage(file)
        }
    }

    const handleSubmit =(e)=>{
        loadingHandler(true)
        e.preventDefault()
        createProduct(formdata).then(data=>{
            successHandler(data.data)
            setName("")
            setQuantity("")
            setBrand("")
            setCategory("")
            setDescription("")
            setFeatures("")
            setImage("")
            setFeatures("")
            setMaterial("")
            setPrice("")
            setImagePrev("")
        }).catch(err=>ErrorHandler(err))
    }
  return (
    <VStack h={"full"} justifyContent={'center'} spacing={'16'} alignItems={"center"}>
            <form style={{width:"90vw"}} onSubmit={handleSubmit}>
                <SimpleGrid columns={[1, 2, 3, 4]} spacing={"6"} alignItems={"center"}>
                <Box my={"4"}>
                    
                <FormLabel htmlFor='name' children="Product Name"/>
                <Input required id='name' value={name} onChange={e=>setName(e.target.value)}
                focusBorderColor='purple.400'
                placeholder='Product Name'
                type='text'
                />
                </Box>
                <Box my={"4"}>
                    
                <FormLabel htmlFor='price' children="Price"/>
                <Input required id='price' value={price} onChange={e=>setPrice(e.target.value)}
                focusBorderColor='purple.400'
                placeholder='price'
                type='number'
                />
                </Box>
                <Box my={"4"}>

                <FormLabel htmlFor='description' children="Description"/>
                <Input required id='description' value={description} onChange={e=>setDescription(e.target.value)} placeholder='Enter your description' type='description' focusBorderColor='purple.400'/>
                </Box>
                <Box>
                <FormLabel htmlFor='category' children="Category"/>
                <Input required id='Category' value={category} onChange={e=>setCategory(e.target.value)} placeholder='Category' type='Category' focusBorderColor='purple.400'/>
                </Box>
                <Box my={"4"}>
                    
                <FormLabel htmlFor='Quantity' children="Total Stock"/>
                <Input required id='Quantity' value={quantity} onChange={e=>setQuantity(e.target.value)}
                focusBorderColor='purple.400'
                placeholder='Stock'
                type='number'
                />
                </Box>
                <Box my={"4"}>
                    
                <FormLabel htmlFor='brand' children="Product Brand"/>
                <Input required id='brand' value={brand} onChange={e=>setBrand(e.target.value)}
                focusBorderColor='purple.400'
                placeholder='brand'
                type='text'
                />
                </Box>
                <Box my={"4"}>

                <FormLabel htmlFor='material' children="Material"/>
                <Input required id='material' value={material} onChange={e=>setMaterial(e.target.value)} placeholder='material of product' type='text' focusBorderColor='purple.400'/>
                </Box>
                <Box>
                <FormLabel htmlFor='features' children="Features"/>
                <Input required id='features' value={features} onChange={e=>setFeatures(e.target.value)} placeholder='Features' type='description' focusBorderColor='purple.400'/>
                </Box>
                </SimpleGrid>
                <Box my={"4"}>

                <FormLabel htmlFor='choose Avatar' children="Choose A Poster For this Product"/>
                <Input accept={"image/*"} required id='poster' onChange={changeImageHandler} type='file' focusBorderColor='purple.400' css={{"&::file-selector-button":fileuploadStyle}}/>
                </Box>
                <Button my={'4'} colorScheme='purple' type='submit'>Submit</Button>
            </form>
        </VStack>
  )
}

export default CreateProductForm