from django.db import models
from recipes.models import Recipe
from ingredients.models import Ingredient


# Create your models here.
class RecipeIngredient(models.Model):
    recipe_id = models.ForeignKey(Recipe, on_delete=models.CASCADE) 
    ingredient_id = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.IntegerField(blank=True, null=True)
    units = models.CharField(max_length=200)
    
    # class Meta:
    #     unique_together = ('recipe_id', 'ingredient_id')