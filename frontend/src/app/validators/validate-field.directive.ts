import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Directive, Input } from '@angular/core';

export function fieldValidator(fields: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const descriptionInput = control.get(fields[0]);
    const imageInput = control.get(fields[1]);

    if (descriptionInput && descriptionInput.value) {
      return null;
    }

    if(imageInput && imageInput.value){
      return null;
    }

    return {identical: true};
  };
}

@Directive({
  selector: '[appRequired]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidateFieldDirective,
    multi: true
  }]
})

export class ValidateFieldDirective implements Validator {
  @Input('appRequired') requiredFields: string[] = [];
  validate(control: AbstractControl): ValidationErrors | null {
    return fieldValidator(this.requiredFields)(control);
  }
}
