from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import RecipeIngredient
from .serializers import RecipeIngredientSerializer
from django.shortcuts import get_object_or_404
from recipes.models import Recipe
from ingredients.models import Ingredient
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.
#Function to add ingredient to recipe
#Step get ingredient by Id
#Step 2 get recipe by id
#step 3 recipe.ingredients.add(ingredient)
#step 4 serializer.save

@api_view(['GET'])
@permission_classes([AllowAny])
def get_recipe_ingredients(request):
    recipe_ingredients = RecipeIngredient.objects.all()
    serializer = RecipeIngredientSerializer(recipe_ingredients, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_ingredient_to_recipe(request, recipe_id, ingredient_id):
    #Get id of recipe and ingredient.
    recipe = get_object_or_404(Recipe, pk=recipe_id)
    ingredient = get_object_or_404(Ingredient, pk=ingredient_id)
    #Check if ingredient already exists
    ingredient_obj, created = Ingredient.objects.get_or_create(name=ingredient.name)
    parser_classes = (MultiPartParser, FormParser)
    #If ingredient is created, save to database
    if created:
        ingredient_obj.save(ingredient)
    #Check if RecipeIngredient already exists
    recipe_ingredient_obj, created = RecipeIngredient.objects.get_or_create(recipe_id=recipe, ingredient_id=ingredient_obj)
    #If RecipeIngredient 
    if created:
        recipe_ingredient_obj.quantity = 1
        recipe_ingredient_obj.units = ""
        recipe_ingredient_obj.save()
    serializer = RecipeIngredientSerializer(recipe_ingredient_obj)
    return Response(serializer.data, status=status.HTTP_201_CREATED)




# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def get_recipe_ingredient_by_id(request, recipe_pk, ingredients_pk):
#     try:
#         recipe = Recipe.objects.get(id = recipe_pk)
#         ingredients = Ingredient.objects.get(id = ingredients_pk)
#     except:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#     recipe.ingredients.add(Ingredient)
#     serializer.save


# @api_view(['GET','PUT','DELETE'])
# @permission_classes([IsAuthenticated])
# def get_recipe_ingredient_by_id(request, pk):
#     recipe_id = get_object_or_404(Recipe, pk=pk)
#     ingredient_id = get_object_or_404(Ingredient, pk=pk)
#     if request.method == 'GET':
#         serializer = RecipeIngredientSerializer(recipe_id, ingredient_id)
#         serializer.is_valid(raise_exception=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def get_recipe_ingredient_by_id(request, pk):
#     recipe_id = get_object_or_404(Recipe, pk=pk)
#     ingredient_id = get_object_or_404(Ingredient, pk=pk)
#     if request.method == 'POST':
#         try:
#             serializer = RecipeIngredientSerializer(recipe_id, ingredient_id)
#             serializer.is_valid(raise_exception=True)
#             serializer.save()
#         except:
#             print('Something is wrong!')

