from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from recipes.models import Recipe
from recipes.serializers import RecipeSerializer
from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from recipe_ingredient.models import RecipeIngredient
from ingredients.models import Ingredient
from ingredients.serializers import IngredientSerializer


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
    recipe_ingredients = RecipeIngredient.objects.filter(recipe_id=pk)

    print(recipe_ingredients[0].ingredient_id)
    recipe_ingredients_list = []
    for item in recipe_ingredients:
        ingredient_item = {
            
        }
        # ingredient = Ingredient.objects.get(id=item.ingredient_id)
        recipe_ingredients_list.append(item.ingredient_id)
    serializer = IngredientSerializer(recipe_ingredients_list, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)