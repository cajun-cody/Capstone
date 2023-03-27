from django.urls import path
from comments import views

urlpatterns = [
    path('', views.post_comment),
    path('<int:pk>/', views.comment_list_recipe_id),
    path('comment_id/<int:pk>/', views.get_comment_by_id),
]
    
