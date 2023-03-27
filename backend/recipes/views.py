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
def add_basic_recipe(request):
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


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def add_recipe(request):
#     # Create RecipeSerializer instance with the data from the request
#     serializer = RecipeSerializer(data=request.data)
#     parser_classes = (MultiPartParser, FormParser)
    
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def add_recipe(request):
#     serializer = RecipeSerializer(data=request.data)
#     parser_classes = (MultiPartParser, FormParser) #required to automatically parse out form-data-data
#     if serializer.is_valid():
#         recipe_data = serializer.validated_data.copy()
#         print(recipe_data)
#         ingredients_data = recipe_data.pop('ingredient_name')
#         print(ingredients_data)
#         # recipe_ingredients_list = []
#         # #Create the list of ingredients
#         # for ingredient_data in ingredients_data:
#         #     ingredient_serializer = IngredientSerializer(data=ingredient_data)
#         #     if ingredient_serializer.is_valid():
#         #         try:
#         #             ingredient = Ingredient.objects.get(name=ingredient_data['name'])
#         #             recipe_data['ingredients'].add(ingredient)
#         #         except Ingredient.DoesNotExist:
#         #             ingredient = ingredient_serializer.save()
#         #             recipe_data['ingredients'].add(ingredient)
#         #     else:
#         #         return Response(ingredient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#         # recipe = Recipe.objects.create(user=request.user, **recipe_data)
#         # #Loop to create the ingredient and recipe ingredient in database.
#         # for ingredient_data in ingredients_data:
#         #     ingredient = Ingredient.objects.get(name=ingredient_data['name'])
#         #     recipe_ingredient, created = RecipeIngredient.objects.get_or_create(recipe=recipe, ingredient=ingredient)
#         #     if not created:
#         #         recipe_ingredient.quantity = ingredient_data['quantity']
#         #         recipe_ingredient.units = ingredient_data['units']
#         #         recipe_ingredient.save()
#         #     else:
#         #         recipe_ingredient.quantity = ingredient_data['quantity']
#         #         recipe_ingredient.units = ingredient_data['units']
#         #         recipe_ingredient.save()
#         #         recipe_ingredients_list.append(recipe_ingredient)
                
#         # recipe_serializer = RecipeSerializer(recipe)
#         return Response(status=status.HTTP_201_CREATED)
#         # return Response(recipe_serializer.data, status=status.HTTP_201_CREATED)
        
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






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