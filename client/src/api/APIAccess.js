import axios from "axios"

const $host = axios.create({
  baseURL: "https://candyshopnodeapp.onrender.com/api"
})

const $authHost = axios.create({
  baseURL: "https://candyshopnodeapp.onrender.com/api"
})

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}


$authHost.interceptors.request.use(authInterceptor)
$authHost.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      throw error
    }
    else {
      throw error
    }
  }
)

export {
  $host,
  $authHost
}