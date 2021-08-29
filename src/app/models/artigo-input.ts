import { CategoriaIdInput } from "./categoria-id-input";

export interface ArtigoInput {
  titulo: string
  autor: string
  conteudo: string
  avatarUrl: string
  descricao: string
  categoria: CategoriaIdInput
}
