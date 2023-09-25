import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { ingredient } from 'src/app/shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {
  ingredientsChanged = new Subject<ingredient[]>;
  startedEditting = new Subject<number>();

  ingredients: ingredient[] = [
    new ingredient('Apples', 5),
    new ingredient('banana',5)
   ];
  constructor() { };
  
  getIngredients(): ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number): ingredient{
    console.log(this.ingredients[index])
    return this.ingredients[index];
  }

  addIngredient(ingredient: ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  
  addIngredients(ingredients: ingredient[]){
     this.ingredients.push(...ingredients);
     this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
