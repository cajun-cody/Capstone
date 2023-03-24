from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from recipes.models import Recipe
from recipes.serializers import RecipeSerializer, RecipeIngredientWithIngredientSerializer
from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from recipe_ingredient.models import RecipeIngredient
from ingredients.models import Ingredient
from ingredients.serializers import IngredientSerializer
from recipe_ingredient.serializers import RecipeIngredientSerializer


# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def recipe_list(request):
    recipes = Recipe.objects.all()
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_recipe(request):
    serializer = RecipeSerializer(data=request.data)
    parser_classes = (MultiPartParser, FormParser) #required to automatically parse out form-data-data
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def get_recipe_by_id(request, pk):
    recipe = get_object_or_404(Recipe,pk=pk)
    if request.method == 'GET':
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = RecipeSerializer(recipe, data=request.data, partial=True)
        parser_classes = (MultiPartParser, FormParser)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    elif request.method == 'DELETE':
        recipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_ingredients_of_recipe(request, pk):
    #Filtering RecipeIngredient for Ingredient items that are attached to recipe_id
    recipe_ingredients = RecipeIngredient.objects.filter(recipe_id=pk)
    #New serializer to serialize recipe_ingredient and get ingredient name. 
    serializer = RecipeIngredientWithIngredientSerializer(recipe_ingredients, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)




# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_all_ingredients_of_recipe(request, pk):
#     #Filtering RecipeIngredient for Ingredient items that are attached to recipe_id
#     recipe_ingredients = RecipeIngredient.objects.filter(recipe_id=pk)
#     print(recipe_ingredients[0].ingredient_id)
#     #Emtpy array to hold list of recipe ingredients
#     recipe_ingredients_list = []
#     #Loop to iterate over each item from filter. Bring in qty and units from RecipeIngredient.
#     for item in recipe_ingredients:
#         #List of the data I want
#         ingredient_item = {
#             'name':item.ingredient_id.name,
#             'quantity':item.quantity,
#             'units':item.units
#         }
#         #Add each item to my recipe_ingredients_list
#         recipe_ingredients_list.append(ingredient_item)
#     serializer_measure = RecipeIngredientSerializer(recipe_ingredients_list, many=True)
#     serializer_ingredient = IngredientSerializer(recipe_ingredients_list, many=True)
#     #List of data coming in from 2 serializers
#     data = {
#         'measure': serializer_measure.data,
#         'ingredient': serializer_ingredient.data
#     }
#     return Response(data, status=status.HTTP_200_OK)