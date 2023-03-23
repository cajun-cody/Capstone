from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Ingredient
from .serializers import IngredientSerializer
from django.shortcuts import get_object_or_404


# Create your views here.
# function add ingredient to recipe
#Step get ingredient by Id
#Step 2 get recipe by id
#step 3 recipe.ingredients.add(ingredient)
#step 4 serializer.save

# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_recipe_ingredients(request):
#     recipe_ingredients = Ingredient.objects.all()
#     serializer = IngredientSerializer(recipe_ingredients, many=True)
#     return Response(serializer.data)