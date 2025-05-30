import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Fields } from 'src/app/models/fields.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
  standalone: false,
})
export class FormPage implements OnInit {
  public form!: FormGroup;
  @Input() fields: Fields[] = [];
  @Input() data: any;
  @Input() edit: boolean = false;
  @Input() title: string = '';
  @Output() reloadTable = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();

    if (this.edit && this.data) {
      this.form.patchValue(this.data);
    }
  }

  buildForm() {
    let campos: { [key: string]: FormControl } = {};
    this.fields.forEach((item) => {
      campos[item.field] = new FormControl('');
    });
    this.form = this.fb.group({
      ...campos,
    });
    this.validaciones();
  }

  private validaciones() {
    this.fields.forEach((item) => {
      return this.form.controls[item.field].setValidators(
        item.requerido
          ? [
              Validators.required,
              Validators.maxLength(item.maxLength!),
              Validators.pattern(item.pattern!),
            ]
          : []
      );
    });
  }

  onSubmit() {
    let data: any = {};
    if (this.edit) data = { ...this.form.value, id: this.data.id };
    else data = this.form.value;
    this.reloadTable.emit(data);
  }
}
