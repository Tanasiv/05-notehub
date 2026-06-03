import axios from 'axios'

export const getToken = async (email: string) => {
  const { data } = await axios.post(
    'https://notehub-public.goit.study/api/auth',
    { email }
  )

  return data.token
}