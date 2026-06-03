import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  config.headers = config.headers ?? {}

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})



export const deleteNote = async (id: string) => {
  const { data } = await instance.delete(`/notes/${id}`)
  return data
}

export const createNote = async (note: any) => {
  const { data } = await instance.post('/notes', note)
  return data
}

export const fetchNotes = async (page: number, search: string) => {
  const { data } = await instance.get('/notes', {
    params: { page, perPage: 12, search },
  })
  return data
}

