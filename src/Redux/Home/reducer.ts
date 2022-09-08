import { createSlice } from "@reduxjs/toolkit";



interface initialState {
    data:any,
    loading:boolean,
}


const initialState={
    data:[],
    loading:false,
}  


const HomeReducer =createSlice({
    name:'homeReducer',
    initialState,
    reducers:{
        addData:(state,action)=>{
            state.data=action.payload;
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        }
        
    }

    

})

export const {addData,setLoading}=HomeReducer.actions
export default HomeReducer.reducer;


