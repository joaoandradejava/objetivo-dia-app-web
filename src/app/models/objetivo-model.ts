import { CategoriaModel } from './categoria-model';
export interface ObjetivoModel{
  id: number
  titulo: string
  data: string
  porcentagem: number
  categoria: CategoriaModel
}
