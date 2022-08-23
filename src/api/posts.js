import axios from 'axios'

export const getPostRequests = async () => await axios.get('/veiculos');
export const createPostRequests = async (newCar) => await axios.post('/veiculos', newCar);
export const deletePostRequests = async (id) => await axios.delete('/veiculos/' + id);
export const getPostRequest = async (id) => await axios.get('/veiculos/' + id);
export const updatePostRequest = async (id, newFields) => await axios.put(`/veiculos/` + id, newFields);