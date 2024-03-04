import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  image =
    'https://t3.ftcdn.net/jpg/04/28/66/58/240_F_428665823_eVnQawJvCREXknWgvaEV8KXEQqk4Wlr1.jpg';
  private recipes: Recipe[] = [
    new Recipe('A Test REcipe Number 1', 'This is a test', this.image),
    new Recipe('A Test REcipe number 2', 'This is a test', this.image),
  ];

  getRecipes() {
    return [...this.recipes];
  }
}
