import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Recipe } from './../recipes/recipe.model';
import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {

                }
    
    storeRecipes() {
        const token = this.authService.getToken();
        return this.httpClient.put('https://angular-recipe-abb1e.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    fetchRecipes() {
        const token = this.authService.getToken();

        this.httpClient.get('https://angular-recipe-abb1e.firebaseio.com/recipes.json?auth=' + token)
        .subscribe((response: any) => {
            const recipes: Recipe[] = response.json();
            recipes.map((recipe) => {
                if(!recipe['ingredients']) {
                    // console.log(recipe);
                    recipe['ingredients'] = [];
                }
                return recipe;
            });
            this.recipeService.setRecipes(recipes);
        });
    }
}