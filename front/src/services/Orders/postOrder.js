import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";

export const postOrder = async (body, token) => {

   const { products, appointmentDate } = body;

   await axios.post(`${BASE_URL}/orders`, { products, appointmentDate }, {
      headers: {
         Authorization: token
      }
   })
   .catch((err) => {throw new Error(err.response.data.error)});
   
};


// .catch((err) => {throw new Error(err.response.data.error)})