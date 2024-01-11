import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const billStore = createSlice({
    name:'bill',
    initialState:{
        billList:[]
    },
    reducers:{
        setBillList(state, action){
            state.billList = action.payload
        },
        addBill(state, action){
            state.billList.push(action.payload)
        }
    }
})

// deconstruct the actionCreator
const{ setBillList, addBill} = billStore.actions

// the asynchronous request
const getBillList = () =>
{
    return async(dispatch) =>
    {
        // The source data
        const res = await axios.get('http://localhost:4099/ka')
        //trigger the reducer
        dispatch(setBillList(res.data))
    }
}

const addBillList = (data) =>{
    return async(dispatch)=>
    {
        // asychronous request
        const res = await axios.post('http://localhost:4099/ka',data)
        //trigger the reducer
        dispatch(addBill(res.data))
    }
}

export{getBillList, addBillList}
const reducer = billStore.reducer
export default reducer