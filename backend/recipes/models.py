from django.db import models
from authentication.models import User
from category.models import Category
from ingredients.models import Ingredient

# lets us explicitly set upload path and filename
def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)


# Create your models here.
class Recipe(models.Model):
    title = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    home_chef = models.CharField(max_length=200, default='Home Chef')
    description = models.TextField()
    ingredients = models.ManyToManyField(Ingredient)
    instructions = models.TextField()
    image = models.ImageField(upload_to=upload_to,blank=True, null=True)
    serving_size = models.PositiveIntegerField(default=1)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default='Anytime Meal')
    


