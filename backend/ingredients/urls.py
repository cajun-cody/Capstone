from django.urls import path
from ingredients import views

urlpatterns = [
    path('', views.add_ingredient),
    path('all/', views.get_ingredients),
    path('<int:pk>/', views.get_ingredient_by_id),
    
]