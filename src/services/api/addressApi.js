import { apiClient } from "../apiClient";

  const getUserAddress = async () => {
    try{
        const response = await apiClient.get('users/addresses');
        return response.data;
    }catch(error){
        throw error;
    }
  }

  const saveAddress = async (data) => {
    console.log(data);
    try{
      const response = await apiClient.post('/addresses', data);
      return response.data;
    }catch(error){
      console.log(error);
      throw error;
    }
  }


  export default {getUserAddress, saveAddress};