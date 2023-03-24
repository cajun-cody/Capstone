from rest_framework import serializers
from .models import RecipeIngredient

class RecipeIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredient
        fields = ['id', 'recipe_id', 'ingredient_id', 'quantity', 'units']
        depth = 1

    recipe_id = serializers.IntegerField(write_only=True)
    ingredient_id = serializers.IntegerField(write_only=True)