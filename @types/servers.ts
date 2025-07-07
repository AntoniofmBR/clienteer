export interface Server {
  id: number
  name: string
  ip: number
  totalClients: number
  status: 'Funcionando' | 'Inoperante'
}