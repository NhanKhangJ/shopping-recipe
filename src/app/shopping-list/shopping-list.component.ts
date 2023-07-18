import { Component, Input } from '@angular/core';
import { ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
   ingredients: ingredient[] = [
    new ingredient('Apples', 5),
    new ingredient('banana',5)
   ];
        
   constructor(){

   }
    
   onAddIngredient(ingredient: ingredient){
      this.ingredients.push(ingredient);
   }
}
