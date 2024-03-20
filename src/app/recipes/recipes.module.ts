import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipesComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeListComponent,
  ],
  imports: [AppRoutingModule, CommonModule, ReactiveFormsModule],
  exports: [
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipesComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeListComponent,
  ],
})
export class RecipesModule {}
