export class CorProgresso {
  public static corProgresso(progresso: number): string {
    if (progresso < 35) {
      return 'rgb(238, 1, 1)'
    } else if (progresso < 100) {
      return 'rgb(255, 219, 15)'
    } else {
      return 'rgb(119, 255, 29)'
    }
  }

  public static corProgressoBootstrap(progresso: number): string {
    if (progresso < 35) {
      return "danger"
    } else if (progresso < 100) {
      return "warning"
    } else {
      return "success"
    }
  }
}
