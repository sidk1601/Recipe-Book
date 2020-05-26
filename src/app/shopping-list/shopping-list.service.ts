import { Subject } from 'rxjs';

import { Ingredient } from './../shared/ingredient.model';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    editingStarted = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Cheese', 20),
        new Ingredient('Choco-chips', 30)
      ];

      getIngredient(index: number) {
          return this.ingredients[index];
      }

      getIngredients() {
          return this.ingredients.slice();
      }

      addIngredient(ingredient: Ingredient) {
          this.ingredients.push(ingredient);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
          this.ingredients.push(...ingredients);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number) {
          this.ingredients.splice(index, 1);
          this.ingredientsChanged.next(this.ingredients.slice());
      }
}