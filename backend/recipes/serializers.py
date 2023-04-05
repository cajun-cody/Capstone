from rest_framework import serializers
from .models import Recipe
from recipe_ingredient.models import RecipeIngredient


class RecipeSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'user', 'user_id', 'home_chef', 'description', 'ingredients', 'instructions', 'image', 'serving_size', 'category', 'category_id']
        depth = 1

    user_id = serializers.IntegerField(write_only=True) #Allows us to use the user_id in the form-data for testing.
    category_id = serializers.IntegerField(write_only=True)

#Added a new serializer that takes in a function to get the name of ingredient. This allows for 1 serializer to be used in the vew function. 
class RecipeIngredientWithIngredientSerializer(serializers.ModelSerializer):
    ingredient_name = serializers.SerializerMethodField()

    class Meta:
        model = RecipeIngredient
        fields = ['id', 'ingredient_name', 'quantity', 'units']

    def get_ingredient_name(self, obj):
        return obj.ingredient_id.name



    