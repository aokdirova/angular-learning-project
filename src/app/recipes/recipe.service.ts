import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
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
  recipesChanged = new Subject<Recipe[]>();
  constructor(private slService: ShoppingListService) {}
  getRecipes() {
    return [...this.recipes];
  }
  getSingleRecipe(index: number) {
    return this.recipes[index];
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.slService.addMultipleIngredients(ingredients);
    this.recipesChanged.next([...this.recipes]);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next([...this.recipes]);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next([...this.recipes]);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next([...this.recipes]);
  }
}
