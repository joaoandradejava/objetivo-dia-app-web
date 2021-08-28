export class Backend {
  private static servidorHeroku: string = 'https://objetivo-do-dia.herokuapp.com/'
  private static servidorLocal: string = 'http://localhost:8080/'

  private static get servidor(): string {
    return this.servidorHeroku
  }

  public static get login(): string {
    return this.servidor + 'login'
  }

  public static get usuarios(): string {
    return this.servidor + 'usuarios'
  }

  public static objetivos(id: number): string {
    return this.usuarios + `/${id}/objetivos`
  }

  public static tarefas(objetivoId: number): string {
    return this.servidor + `objetivos/${objetivoId}/tarefas`
  }
  public static anotacoes(usuarioId: number): string {
    return this.servidor + `usuarios/${usuarioId}/anotacoes`
  }

  public static categorias(): string {
    return this.servidor + 'categorias'
  }

  public static feedbackDoUsuario(usuarioId: number): string {
    return this.servidor + `usuarios/${usuarioId}/feedbacks`
  }

}
