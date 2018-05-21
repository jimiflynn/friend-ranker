import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { AvatarGeneratorComponent } from './avatar-generator/avatar-generator.component';
import { SafeHtmlPipe } from './safe-html/safe-html.pipe';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    AvatarGeneratorComponent,
    SafeHtmlPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AvatarGeneratorComponent,
    SafeHtmlPipe
  ]
})
export class SharedModule { }
