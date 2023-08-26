import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { ingredient } from 'src/app/shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {
  ingredientsChanged = new Subject<ingredient[]>;

  ingredients: ingredient[] = [
    new ingredient('Apples', 5),
    new ingredient('banana',5)
   ];
  constructor() { };
  
  getIngredients(): ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  
  addIngredients(ingredients: ingredient[]){
     this.ingredients.push(...ingredients);
     this.ingredientsChanged.next(this.ingredients.slice());
  }


}
