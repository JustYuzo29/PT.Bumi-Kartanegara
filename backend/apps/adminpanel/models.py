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

# Tambahan untuk API updates dan metrics
class Update(models.Model):
    text = models.TextField()
    datetime = models.CharField(max_length=50)
    edited_by = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.text[:30]}... by {self.edited_by}"

class Metric(models.Model):
    title = models.CharField(max_length=100)
    value = models.CharField(max_length=50)
    trend = models.CharField(max_length=20)
    trend_color = models.CharField(max_length=20)
    description = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.title

# Monitoring models
# Sudah didefinisikan di atas, hapus duplikat
# Monitoring models
class BlogMonitoring(models.Model):
    name = models.CharField(max_length=100)
    datetime = models.CharField(max_length=50)
    country = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} - {self.country}"

class StaffMonitoring(models.Model):
    name = models.CharField(max_length=100)
    datetime = models.CharField(max_length=50)
    country = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} - {self.country}"
    
# Statistik Pengunjung dan Sumber Lalu Lintas
class VisitorStat(models.Model):
    date = models.DateField()
    visitors = models.IntegerField()
    page_views = models.IntegerField()
    bounce_rate = models.FloatField()

    def __str__(self):
        return f"{self.date} - {self.visitors} pengunjung"

class TrafficSource(models.Model):
    date = models.DateField()
    source = models.CharField(max_length=50)
    count = models.IntegerField()

    def __str__(self):
        return f"{self.date} - {self.source}: {self.count}"