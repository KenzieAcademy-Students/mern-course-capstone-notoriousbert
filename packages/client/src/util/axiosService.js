import axios from 'utils/axiosConfig.js'

const getAllPlaces = () => {
  return axios.get('places')
}

const getPlaceById = (id) => {
  return axios({
    config: {
      url: `places/${id}`,
      params: {
        id: id,
      },
    },
  })
}


const findByName = (name) => {
  return axios.get(`/places?name=${name}`)
}

export { getAllPlaces, getPlaceById, findByName }