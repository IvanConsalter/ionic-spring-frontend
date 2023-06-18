import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'error-messages',
  templateUrl: 'error-messages.html'

})
export class ErrorMessagesComponent {

  constructor() {
  }

  @Input() field?: AbstractControl;

  isFieldInvalid(field: AbstractControl): boolean {
    return field.dirty && !!field.errors;
  }

  getFieldErrorMessage(field: AbstractControl): string {
    if (field.errors) {
      if (field.errors.required) {
        return 'Campo obrigatório.';
      }
      if (field.errors.minlength) {
        return `O campo deve ter no mínimo ${field.errors.minlength.requiredLength} caracteres.`;
      }
      if (field.errors.maxlength) {
        return `O campo deve ter no máximo ${field.errors.maxlength.requiredLength} caracteres.`;
      }
    }

    return 'Valor inválido';
  }

}
