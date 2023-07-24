import { Component, Input, OnInit } from '@angular/core';
import { ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from './service/shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent  implements OnInit{
   ingredients: ingredient[];
        
   constructor(private slService: ShoppinglistService){
     
   }

   ngOnInit(){
      this.ingredients = this.slService.getIngredients();
      this.slService.ingredientsChanged.subscribe((ingredients:ingredient[])=>{
         this.ingredients = ingredients;
      })
   } 
    
}
