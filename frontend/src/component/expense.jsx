import { useEffect, useState } from "react"
import axios from "axios"
import { Input,InputGroup,InputLeftElement,InputRightElement,Text,Button} from '@chakra-ui/react'

const Expense = () => {
    const[description,setdescription] = useState("");
  const[amount,setamount] = useState(0);
  const[list,setlist] = useState([]);
  const data = async()=>{
    const res = await axios.get("http://localhost:3000/expenses")
    setlist(res.data)
   
  }
  useEffect(()=>{
data();
  },[])
  return (
    <>
    <div className=" px-80 py-8">
    <div className=" space-y-4" >
      <Input placeholder="Description" onChange={e => setdescription(e.target.value)}></Input>
      <br>
      </br>
      <InputGroup>
    <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
      <Text color="green">₹</Text>
    </InputLeftElement>
    <Input placeholder="Enter amount" onChange={e => setamount(e.target.value)} ></Input>
   
  </InputGroup>
    </div> 
    <div className=" mt-4 flex justify-center">
    <Button colorScheme='teal' variant='outline' onClick={async()=>{
     const res = await axios.post("http://localhost:3000/expenses",{description,amount})
     console.log(res.data);
    }}>
    Add
  </Button>
  </div>
    <div>
      {list.map(l =>
        <div className="grid grid-cols-2">
            <div className=" text-xl">
          {l.description}
          </div>
          <div className=" text-xl">
          <Text color="red">₹{l.amount}</Text>
          </div>
          </div>
      )}
    </div>
    </div>
    </>
  )
}

export default Expense