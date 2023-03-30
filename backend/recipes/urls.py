from django.urls import path
from recipes import views

urlpatterns = [
    path('', views.recipe_list),
    path('new_recipe/', views.add_basic_recipe),
    path('<int:pk>/', views.get_recipe_by_id),
    path('user_recipes/<int:user_id>', views.get_user_recipes),
    path('all_ingredients/<int:pk>/', views.get_all_ingredients_of_recipe),
]