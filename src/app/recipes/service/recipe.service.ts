import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ingredient } from 'src/app/shared/ingredient.model';
import { ShoppinglistService } from 'src/app/shopping-list/service/shoppinglist.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

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
}
