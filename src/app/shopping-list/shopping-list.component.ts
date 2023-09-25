import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from './service/shoppinglist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent  implements OnInit, OnDestroy{
   ingredients: ingredient[];
   private igChangeSub: Subscription;
        
   constructor(private slService: ShoppinglistService){
     
   }

   ngOnInit(){
      this.ingredients = this.slService.getIngredients();
     this.igChangeSub = this.slService.ingredientsChanged.subscribe((ingredients:ingredient[])=>{
         this.ingredients = ingredients;
      })
   } 
   

   onEditItem(index: number){
      this.slService.startedEditting.next(index);
   }
   
   ngOnDestroy(): void {
      this.igChangeSub.unsubscribe();
   }
}
