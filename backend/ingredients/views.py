from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Ingredient
from .serializers import IngredientSerializer
from django.shortcuts import get_object_or_404


# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def get_ingredients(request):
    ingredients = Ingredient.objects.all()
    serializer = IngredientSerializer(ingredients, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_ingredient(request):
    serializer = IngredientSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def get_ingredient_by_id(request, pk):
    ingredient = get_object_or_404(Ingredient, pk=pk) #Checks to find if ingredient exists and matches a primary key. 
    if request.method == 'GET':
        serializer = IngredientSerializer(ingredient)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = IngredientSerializer(ingredient, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        ingredient.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    
    




