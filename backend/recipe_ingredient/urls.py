from django.urls import path
from recipe_ingredient import views

urlpatterns = [
    path('', views.get_recipe_ingredients),
    path('<int:recipe_id>/', views.get_recipe_ingredients_by_recipe_id),
    path('<int:recipe_id>/ingredients/<int:ingredient_id>/', views.add_ingredient_to_recipe),
]