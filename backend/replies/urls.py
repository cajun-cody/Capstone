from django.urls import path
from replies import views


urlpatterns = [
    path('', views.get_all_replies),
    path('post_reply/<int:pk>/', views.post_reply),
    path('reply_id/<int:pk>/', views.get_reply_by_id)
]