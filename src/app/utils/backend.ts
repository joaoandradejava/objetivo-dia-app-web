export class Backend {
  private static get servidor(): string {
    return 'https://objetivo-do-dia.herokuapp.com/'
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
}
