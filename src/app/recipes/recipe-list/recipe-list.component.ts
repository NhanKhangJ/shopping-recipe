import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
   @Output() recipeWasSelected = new EventEmitter<Recipe>();
   recipes: Recipe[] = [
    new Recipe('Another test', 'test', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFOOPfEjJEgKxYq51rqsWQsq3KuHcSZS3pA&usqp=CAU'),
    new Recipe('khang', 'test', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFOOPfEjJEgKxYq51rqsWQsq3KuHcSZS3pA&usqp=CAU')
   ];

   constructor() {
           
   }
   
   onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
    console.log('emit successful')
   }


}
