from django.urls import path
from category import views

urlpatterns = [
    path('', views.add_category),
    path('all/', views.get_ingredients),
    path('<int:pk>/', views.get_category_by_id),
]