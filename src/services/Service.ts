import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
// Service que será usada para CADASTRAR USUÁRIO no backend
export const cadastrarUsuario = async(url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}
// Service que será usada para LOGAR no backend
export const login = async(url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}
// Service que será usada para BUSCAR informações no backend
export const buscar = async(url: string, setDados: Function, header: Object) => {
  const resposta = await api.get(url, header)
  setDados(resposta.data)
}
// Service que será usada para CADASTRAR informações no backend
export const cadastrar = async(url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.post(url, dados, header)
  setDados(resposta.data)
}
// Service que será usada para ATUALIZAR informações no backend
export const atualizar = async(url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.put(url, dados, header)
  setDados(resposta.data)
}
// Service que será usada para DELETAR informações no backend
export const deletar = async(url: string, header: Object) => {
  await api.delete(url, header)
}