from apps.adminpanel.models import VisitorStat, TrafficSource
from datetime import date, timedelta


def seed_visitor_stats():
    today = date.today()
    VisitorStat.objects.all().delete()  # opsional
    for i in range(30):
        d = today - timedelta(days=i)
        VisitorStat.objects.create(
            date=d,
            visitors=100 + i,
            page_views=200 + i * 2,
            bounce_rate=0.3 + (i % 10) * 0.01
        )


def seed_traffic_source():
    sources = ["Organic Search", "Direct", "Referral", "Social Media", "Email"]
    today = date.today()
    TrafficSource.objects.all().delete()  # opsional
    for i in range(30):
        d = today - timedelta(days=i)
        for idx, src in enumerate(sources):
            TrafficSource.objects.create(
                date=d,
                source=src,
                count=50 + idx * 10 + i
            )


def run():
    seed_visitor_stats()
    seed_traffic_source()
    print("✅ Seed statistik pengunjung & sumber lalu lintas selesai!")
