import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/service/recipe.service';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.staging';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private hhtp: HttpClient, private recipesService: RecipeService) { 

  }

  storeRecipes(){
    const recipes = this.recipesService.getRecipee();
    return this.hhtp.put(`${environment.fireBaseUrl}/recipes.json`, recipes).subscribe(response =>{
      console.log(response);
    });
  }

  fetchRecipes(){
    return this.hhtp.get<Recipe[]>(`${environment.fireBaseUrl}/recipes.json`)
    .pipe(
      map(recipes =>{
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          }
        })
      }),
      tap(recipes =>{
        this.recipesService.setRecipes(recipes)
      })
    )
  }
}
