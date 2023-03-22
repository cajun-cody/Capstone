from django.db import models

# Create your models here.
class Category(models.Model):
    category = models.CharField(max_length=100)