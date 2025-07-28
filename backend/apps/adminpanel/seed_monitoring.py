from apps.adminpanel.models import BlogMonitoring, StaffMonitoring

def seed_blog_monitoring():
    BlogMonitoring.objects.create(name="Blog Post 1", datetime="2025-07-01/10.00", country="Indonesia")
    BlogMonitoring.objects.create(name="Blog Post 2", datetime="2025-07-02/11.00", country="Malaysia")
    BlogMonitoring.objects.create(name="Blog Post 3", datetime="2025-07-03/12.00", country="Singapore")

def seed_staff_monitoring():
    StaffMonitoring.objects.create(name="Staff 1", datetime="2025-07-01/10.00", country="Indonesia")
    StaffMonitoring.objects.create(name="Staff 2", datetime="2025-07-02/11.00", country="Malaysia")
    StaffMonitoring.objects.create(name="Staff 3", datetime="2025-07-03/12.00", country="Singapore")

def run():
    seed_blog_monitoring()
    seed_staff_monitoring()
    print("Seed monitoring selesai!")

if __name__ == "__main__":
    run()
