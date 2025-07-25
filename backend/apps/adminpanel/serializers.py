from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    new_password = serializers.CharField(write_only=True, required=False)
    current_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ["id", "name", "email", "tipe", "new_password", "current_password"]
        # password field tidak dikirim ke frontend sama sekali

    def create(self, validated_data):
        password = validated_data.pop("new_password", None)
        user = User(**validated_data)
        if not password:
            raise serializers.ValidationError({"new_password": "Password wajib diisi."})
        if len(password) < 6:
            raise serializers.ValidationError({"new_password": "Password minimal 6 karakter."})
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        current_password = validated_data.pop("current_password", None)
        new_password = validated_data.pop("new_password", None)

        instance.name = validated_data.get("name", instance.name)
        instance.email = validated_data.get("email", instance.email)
        instance.tipe = validated_data.get("tipe", instance.tipe)

        if new_password:
            if not current_password:
                raise serializers.ValidationError({"current_password": "Password lama wajib diisi untuk mengganti password."})
            if not instance.check_password(current_password):
                raise serializers.ValidationError({"current_password": "Password lama salah"})
            if len(new_password) < 6:
                raise serializers.ValidationError({"new_password": "Password minimal 6 karakter."})
            instance.set_password(new_password)

        instance.save()
        return instance
