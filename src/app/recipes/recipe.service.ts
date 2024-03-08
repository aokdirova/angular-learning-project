import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  image =
    "https://t3.ftcdn.net/jpg/04/28/66/58/240_F_428665823_eVnQawJvCREXknWgvaEV8KXEQqk4Wlr1.jpg";
  private recipes: Recipe[] = [
    new Recipe("A Test REcipe Number 1", "This is a test", this.image, [
      new Ingredient("carrots", 4),
      new Ingredient("onions", 2),
    ]),
    new Recipe("A Test REcipe number 2", "This is a test", this.image, [
      new Ingredient("noodles", 4),
      new Ingredient("beef", 2),
    ]),
  ];
  constructor(private slService: ShoppingListService) {}
  getRecipes() {
    return [...this.recipes];
  }
  getSingleRecipe(index: number) {
    return this.recipes[index];
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.slService.addMultipleIngredients(ingredients);
  }
}
