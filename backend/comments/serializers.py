from rest_framework import serializers
from comments.models import Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'recipe', 'recipe_id', 'user', 'comment']
        depth = 1
    
    #Recipe above is an entire object. We need to add recipe_id to the serializer to make it easier to grab the entire recipe my its ID.
    recipe_id =serializers.IntegerField(write_only=True)