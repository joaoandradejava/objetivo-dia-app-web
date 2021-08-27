import { Backend } from './../utils/backend';
import { Observable } from 'rxjs';
import { FeedbackInput } from './../models/feedback-input';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  public enviarFeedback(usuarioId: number, feedbackInput: FeedbackInput): Observable<any> {
    return this.http.post(Backend.feedbackDoUsuario(usuarioId), feedbackInput)
  }
}
