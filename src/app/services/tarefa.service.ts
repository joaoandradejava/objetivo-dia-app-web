import { TarefaInput } from './../models/tarefa-input';
import { Backend } from './../utils/backend';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient) { }

  public buscarTarefas(objetivoId: number): Observable<any> {
    return this.http.get(Backend.tarefas(objetivoId))
  }

  public adicionarTarefa(objetivoId: number, tarefaInput: TarefaInput): Observable<any> {
    return this.http.post(Backend.tarefas(objetivoId), tarefaInput)
  }

  public deletarTarefa(objetivoId: number, tarefaId: number): Observable<any>{
    return this.http.delete(Backend.tarefas(objetivoId) + `/${tarefaId}`)
  }

  public fazerTarefa(objetivoId: number, tarefaId: number): Observable<any>{
    return this.http.put(Backend.tarefas(objetivoId) + `/${tarefaId}/feita`, null)
  }

  public desfazerTarefa(objetivoId: number, tarefaId: number): Observable<any>{
    return this.http.delete(Backend.tarefas(objetivoId) + `/${tarefaId}/feita`)
  }
}
