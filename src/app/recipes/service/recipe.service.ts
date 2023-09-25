import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ingredient } from 'src/app/shared/ingredient.model';
import { ShoppinglistService } from 'src/app/shopping-list/service/shoppinglist.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Another test',
               'test', 
               'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFOOPfEjJEgKxYq51rqsWQsq3KuHcSZS3pA&usqp=CAU',
    [
      new ingredient('Meat',1),
      new ingredient('pork', 1)
      ]),
    new Recipe('khang', 'test', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFOOPfEjJEgKxYq51rqsWQsq3KuHcSZS3pA&usqp=CAU',[
      new ingredient('brocoli',1),
      new ingredient('Buns', 1)
    ])
   ]; 

  constructor(private slService: ShoppinglistService) { }

  
  getRecipee(): Recipe[]{
    return this.recipes.slice();
  }

  getRecipe(id: number) {
     return this.recipes.slice()[id];
  }

  addIngredientsToShoppingList(ingredients: ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
