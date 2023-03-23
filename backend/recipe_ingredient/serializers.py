from rest_framework import serializers
from .models import RecipeIngredient

class RecipeIngredient(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredient
        fields = ['id', 'recipe_id', 'ingredient_id', 'quantity', 'units']