from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class User(models.Model):
    TIPE_CHOICES = (
        ('admin', 'Admin'),
        ('staff', 'Staff'),
    )

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    tipe = models.CharField(max_length=20, choices=TIPE_CHOICES)
    password = models.CharField(max_length=255)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.name
