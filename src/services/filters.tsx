import axios from 'axios'

const baseUrl = 'http://localhost:3001/filters'

const getAllFilterQueries = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const createNewFilterQuery = (newFilterQuery : any) => {
  const request = axios.post(baseUrl, newFilterQuery)
  return request.then(res => res.data)
}

const deleteFilterQuery = (id : string) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(res => res.data)
}

export default {getAllFilterQueries, createNewFilterQuery, deleteFilterQuery}

