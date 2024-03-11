import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  @ViewChild('f', { static: false }) editForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}
  // onAddClick(name: HTMLInputElement, amount: HTMLInputElement) {
  //   const newIngredient = new Ingredient(name.value, +amount.value);
  //   this.shoppingListService.addIngredient(newIngredient);
  // }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.editForm.setValue({
          ingredientName: this.editedItem.name,
          ingredientAmount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit() {
    const newIngredient = new Ingredient(
      this.editForm.value.ingredientName,
      +this.editForm.value.ingredientAmount
    );
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editForm.reset();
    this.editMode = false;
  }

  onClearClick() {
    this.editForm.reset();
    this.editMode = false;
  }
  onDeleteClick() {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editedIndex);
      this.onClearClick();
    } else {
      return;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
