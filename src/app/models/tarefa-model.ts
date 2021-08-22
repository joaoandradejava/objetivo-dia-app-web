export class TarefaModel{
  id: number
  titulo: string
  isFeita: boolean

  constructor(id: number, titulo: string, isFeita: boolean){
    this.id = id
    this.titulo = titulo
    this.isFeita = isFeita
  }

}
