import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';


@NgModule({
  declarations: [
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    ReactiveFormsModule,
    NgxBootstrapIconsModule.pick(allIcons),

  ]
})
export class FeedbackModule { }
