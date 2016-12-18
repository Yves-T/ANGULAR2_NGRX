import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Item } from '../../models/item.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  originalName: string;
  selectedItem: Item;
  form: FormGroup;
  public submitted: boolean;

  // Every time the "item" input is changed, we copy it locally ( and keep the original name to display )
  @Input()  set item(value: Item) {
    if (value) {
      this.originalName = value.name;
    }
    this.selectedItem = Object.assign({}, value);
    if (!this.form) {
      this.initForm();
    }
    this.form.controls['name'].setValue(this.selectedItem.name, {onlySelf: true});
    this.form.controls['description'].setValue(this.selectedItem.description, {onlySelf: true});
  }

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      'name': new FormControl(''),
      'description': new FormControl(''),
    });
  }

  onSubmit(item) {
    this.submitted = true;
    console.log(JSON.stringify(item));
    this.selectedItem.name = item.name;
    this.selectedItem.description = item.description;
    this.saved.emit(this.selectedItem);
  }

  cancel(event) {
    event.preventDefault();
    this.cancelled.emit(this.selectedItem);
  }
}
