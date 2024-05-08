from django.apps import AppConfig
# import threading

class SocketsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'sockets'

    # def ready(self):
    #     from .server import run_server
    #     server_thread = threading.Thread(target=run_server)
    #     server_thread.start()
