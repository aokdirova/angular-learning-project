import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  image =
    'https://t3.ftcdn.net/jpg/04/28/66/58/240_F_428665823_eVnQawJvCREXknWgvaEV8KXEQqk4Wlr1.jpg';
  private recipes: Recipe[] = [
    new Recipe('A Test REcipe Number 1', 'This is a test', this.image, [
      new Ingredient('carrots', 4),
      new Ingredient('onions', 2),
    ]),
    new Recipe('A Test REcipe number 2', 'This is a test', this.image, [
      new Ingredient('noodles', 4),
      new Ingredient('beef', 2),
    ]),
  ];

  getRecipes() {
    return [...this.recipes];
  }
}
