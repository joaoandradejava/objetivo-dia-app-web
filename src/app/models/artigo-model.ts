import { CategoriaModel } from './categoria-model';
export interface ArtigoModel {
  id: number
  titulo: string
  avatarUrl: string
  descricao: string
  dataPublicacao: string
  dataAtualizacao: string
  categoria: CategoriaModel

}
