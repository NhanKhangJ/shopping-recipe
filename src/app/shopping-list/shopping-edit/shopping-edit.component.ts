import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ingredient } from 'src/app/shared/ingredient.model';
import { ShoppinglistService } from '../service/shoppinglist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput')nameInputRef: ElementRef;
  @ViewChild('amountInput')amountInputRef: ElementRef
  
  constructor(private slService: ShoppinglistService){

  }
  
  ngOnInit(): void {
    
  }

  onAddItem(){
    const newIngredient = new ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    this.slService.addIngredient(newIngredient);
  }
}
