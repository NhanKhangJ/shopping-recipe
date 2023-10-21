import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/service/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment.staging';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private hhtp: HttpClient, private recipesService: RecipeService, private AuthService: AuthService) { 

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
      }));
  }
}
