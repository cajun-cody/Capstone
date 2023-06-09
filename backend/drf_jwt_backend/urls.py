"""drf_jwt_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django .conf.urls.static import static

#static path allows a path to be saved in a seperate media folder. 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/cars/', include('cars.urls')),
    path('api/recipes/', include('recipes.urls')),
    path('api/ingredients/', include('ingredients.urls')),
    path('api/recipe_ingredient/', include('recipe_ingredient.urls')),
    path('api/comments/', include('comments.urls')),
    path('api/replies/', include('replies.urls')),
    path('api/category/', include('category.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
