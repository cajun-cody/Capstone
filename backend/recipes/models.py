from django.db import models
from authentication.models import User

# Create your models here.
class Recipe(models.Model):
    title = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    home_chef = models.CharField(max_length=200, default='Home Chef')
    description = models.TextField()
    ingredients = models.TextField()
    instructions = models.TextField()
    image = models.ImageField(upload_to='recipes/', blank=True, null=True)
    serving_size = models.PositiveIntegerField(default=1)
    


