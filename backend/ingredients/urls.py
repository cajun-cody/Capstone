from django.urls import path
from ingredients import views

urlpatterns = [
    path('all/', views.get_ingredients),
    path('<int:pk>/', views.get_ingredient_by_id), #Append_slash is True so in url for DELETE a final slash is required. 
    path('', views.add_ingredient),
]