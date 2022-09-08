import { configureStore, getDefaultMiddleware, } from "@reduxjs/toolkit";
import reducer from "../Home/reducer";
import logger from 'redux-logger'

const Store= configureStore({
    reducer:reducer,
    middleware:[logger]
})

export default Store;