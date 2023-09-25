import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ingredient } from 'src/app/shared/ingredient.model';
import { ShoppinglistService } from '../service/shoppinglist.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subCription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: ingredient;

  constructor(private slService: ShoppinglistService){

  }
  
  ngOnInit(): void {
   this.subCription = this.slService.startedEditting.subscribe((index: number)=>{
    this.editedItemIndex = index;
    this.editMode = true;
    this.editedItem =  this.slService.getIngredient(index);
    this.slForm.setValue({
      name: this.editedItem.name,
      amount: this.editedItem.amount
    })
   });
  }

  onAddItem(form: NgForm){
    const value = form.value;
    const newIngredient = new ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
    } else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode =false;
    form.reset();
  }

  onClear(){
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete(){
    this.onClear();
    this.slService.deleteIngredient(this.editedItemIndex);
  }
  
  ngOnDestroy(): void {
    this.subCription.unsubscribe();
  }
}
