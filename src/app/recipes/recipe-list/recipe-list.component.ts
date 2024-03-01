import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  image =
    'https://t3.ftcdn.net/jpg/04/28/66/58/240_F_428665823_eVnQawJvCREXknWgvaEV8KXEQqk4Wlr1.jpg';
  recipes: Recipe[] = [
    new Recipe('A Test REcipe', 'This is a test', this.image),
    new Recipe('A Test REcipe', 'This is a test', this.image),
  ];
  @Output() recipeSelectedInList = new EventEmitter<Recipe>();
  constructor() {}
  onRecipeSelected(recipe: Recipe) {
    this.recipeSelectedInList.emit(recipe);
  }
}
