from django.urls import path
from recipes import views

urlpatterns = [
    path('', views.recipe_list),
    path('new_recipe/', views.add_recipe),
    path('<int:pk>/', views.get_recipe_by_id),
]