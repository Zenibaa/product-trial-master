// contact.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-contact',
  templateUrl: "/contact.component.html",
  styleUrls: ["./contact.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  contactForm: FormGroup;
  isSubmitting = false;

  constructor() {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  get messageLength(): number {
    return this.contactForm.get('message')?.value?.length || 0;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Demande de contact envoyée avec succès'
        });

        this.contactForm.reset();
        this.isSubmitting = false;
      }, 1000);
    } else {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  onReset() {
    this.contactForm.reset();
  }
}
