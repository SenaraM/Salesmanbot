import axios from "../axios";


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    retrieveProducts: () => axios.get(`/api/getallproducts`),
    deleteProduct: (id) => axios.delete(`/api/deleteproduct/${id}`),
    updateProduct: (id) => axios.update(`/api/editproduct/${id}`),
}
