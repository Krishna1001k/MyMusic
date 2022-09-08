import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Apis} from '../../Utils/services';

export const GetData = createAsyncThunk( 
  'homeReducer/getData',
  async () => {
    const response = await axios.get(Apis.getTopArtistAlbum);
    return response;
  
})
