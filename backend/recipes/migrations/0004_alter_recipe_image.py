# Generated by Django 4.1.7 on 2023-03-22 15:14

from django.db import migrations, models
import recipes.models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0003_recipe_home_chef'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=recipes.models.upload_to),
        ),
    ]
