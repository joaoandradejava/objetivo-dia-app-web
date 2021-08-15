import { FormGroup } from "@angular/forms";

export class ValidadorFormulario {
  public static mensagemDeCampoObrigatorio(label: string): string {
    return `Preencha o campo ${label}!`;
  }

  public static mensagemCampoInvalido(label: string): string {
    return `${label} inválido`;
  }

  public static mensagemDeTamanhoMinimoEMaximo(label: string, min: number, max: number): string {
    return `${label} tem que ter o tamanho entre ${min} á ${max} caractéres!`
  }

  public static getCssFormulario(formulario: FormGroup, label: string): object {
    return { 'is-invalid': formulario.get(label)?.invalid && formulario.get(label)?.touched, 'is-valid': formulario.get(label)?.valid && formulario.get(label)?.touched }
  }
}
