from apps.adminpanel.models import Update, Metric

def seed_updates():
    Update.objects.create(text="Jika Kau Bertemu aku begini", datetime="15-08-2025/14.00", edited_by="Jeki")
    Update.objects.create(text="Aku tak kau anggap pada cerita", datetime="15-08-2025/14.00", edited_by="Rehan")

def seed_metrics():
    Metric.objects.create(title="Pengunjung Hari Ini", value="1.250", trend="+15%", trend_color="text-green-500", description="dari kemarin")
    Metric.objects.create(title="Postingan Aktif", value="85", trend="Stabil", trend_color="text-gray-500", description="minggu ini")
    Metric.objects.create(title="Komentar Baru", value="12", trend="-5%", trend_color="text-red-500", description="dari kemarin")
    Metric.objects.create(title="Postingan Terpopuler", value="Judul Postingan Teratas Ini", trend="5.2K views", trend_color="text-blue-500", description="")

def run():
    seed_updates()
    seed_metrics()
    print("Seed data selesai!")

if __name__ == "__main__":
    run()
