import { Component, EventEmitter, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  @Output() addIngredient = new EventEmitter<Ingredient>();
  onAddClick(name: HTMLInputElement, amount: HTMLInputElement) {
    const newIngredient = new Ingredient(name.value, +amount.value);
    this.addIngredient.emit(newIngredient);
  }
}
