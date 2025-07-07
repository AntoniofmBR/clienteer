export interface Client {
  id: number
  name: string
  company: string
  routePlan: string
  fixedPlan: string
  server: string
  manager: string
  status: 'Ativo' | 'Bloqueado'
}

