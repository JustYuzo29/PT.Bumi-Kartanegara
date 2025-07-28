from django.contrib import admin
from .models import User, Update, Metric, BlogMonitoring, StaffMonitoring, VisitorStat, TrafficSource
@admin.register(VisitorStat)
class VisitorStatAdmin(admin.ModelAdmin):
    list_display = ("id", "date", "visitors", "page_views", "bounce_rate")
    search_fields = ("date",)
    list_filter = ("date",)

@admin.register(TrafficSource)
class TrafficSourceAdmin(admin.ModelAdmin):
    list_display = ("id", "date", "source", "count")
    search_fields = ("source",)
    list_filter = ("source", "date")
@admin.register(BlogMonitoring)
class BlogMonitoringAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "datetime", "country")
    search_fields = ("name", "country")
    list_filter = ("country",)

@admin.register(StaffMonitoring)
class StaffMonitoringAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "datetime", "country")
    search_fields = ("name", "country")
    list_filter = ("country",)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "tipe")
    search_fields = ("name", "email", "tipe")
    list_filter = ("tipe",)

@admin.register(Update)
class UpdateAdmin(admin.ModelAdmin):
    list_display = ("id", "text", "datetime", "edited_by")
    search_fields = ("text", "edited_by")
    list_filter = ("edited_by",)

@admin.register(Metric)
class MetricAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "value", "trend", "trend_color", "description")
    search_fields = ("title", "value", "trend")
