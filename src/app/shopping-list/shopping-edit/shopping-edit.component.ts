import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  editingMode: boolean = false;
  editingIndex: number;
  editingItem: Ingredient;

  @ViewChild('f') shoppingForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingListService.editingStarted.subscribe((index: number) => {
      this.editingMode = true;
      this.editingIndex = index;
      this.editingItem = this.shoppingListService.getIngredient(index);
      this.shoppingForm.setValue({
        name: this.editingItem.name,
        amount: this.editingItem.amount
      });
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    if(this.editingMode) {
      this.shoppingListService.updateIngredient(this.editingIndex, { name: value.name, amount: value.amount });
    } else {
      this.shoppingListService.addIngredient({name: value.name, amount: value.amount});
    }
    this.editingMode = false;
    this.shoppingForm.reset();
  }

  onClear() {
    this.editingMode = false;
    this.shoppingForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editingIndex);
    this.onClear();
  }

}
