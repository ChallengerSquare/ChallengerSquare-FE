from apscheduler.schedulers.background import BackgroundScheduler
from django.utils import timezone
from datetime import timedelta
from apies.models import Node # MyModel은 해당 필드를 포함하는 모델의 이름입니다.
from .signal import signal

scheduler = BackgroundScheduler()

def heartBeat():
    now = timezone.now()
    ninety_minutes_ago = now - timedelta(minutes=90)
    # nodes = Node.objects.filter(LAST_CON_DATE__lte=ninety_minutes_ago)
    nodes = Node.objects.all()
    for node in nodes:
        signal(node.IP, int(node.PORT))


scheduler.add_job(heartBeat, 'interval', minutes=1)