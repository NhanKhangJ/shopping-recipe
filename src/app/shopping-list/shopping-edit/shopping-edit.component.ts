import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput')nameInputRef: ElementRef;
  @ViewChild('amountInput')amountInputRef: ElementRef
  @Output()  ingredientAdded = new EventEmitter<ingredient>();
  onAddItem(){
    const newIngredient = new ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    this.ingredientAdded.emit(newIngredient);
  }
}
