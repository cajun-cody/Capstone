from rest_framework import serializers
from .models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'user', 'home_chef', 'description', 'ingredients', 'instructions', 'image', 'serving_size']
        depth = 1