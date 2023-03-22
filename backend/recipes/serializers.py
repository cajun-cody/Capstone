from rest_framework import serializers
from .models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'user', 'user_id', 'home_chef', 'description', 'ingredients', 'instructions', 'image', 'serving_size']
        depth = 1

    user_id = serializers.IntegerField(write_only=True) #Allows us to use the user_id in the form-data for testing.