import axios from 'utils/axiosConfig.js'
import useAxios, { configure } from 'axios-hooks'

// https://github.com/simoneb/axios-hooks#useaxiosurlconfig-options
// https://github.com/axios/axios#request-config
configure({ axios })

export default function UseAxiosHook({ config }) {
  const [{ data, loading, error }, refetch] = useAxios(config)

  return { data, loading, error, refetch }
}
