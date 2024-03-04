import { Component, EventEmitter, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  constructor(private shoppingListService: ShoppingListService) {}
  onAddClick(name: HTMLInputElement, amount: HTMLInputElement) {
    const newIngredient = new Ingredient(name.value, +amount.value);
    this.shoppingListService.addIngredient(newIngredient)
  }
}
