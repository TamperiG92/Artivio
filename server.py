import http.server
import socketserver
import os
import socket
import sys

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

PORT = 5000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

local_ip = get_local_ip()

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print("=" * 60)
    print("  🚀 KREAVERSIA 3D MARKETPLACE - SERVIDOR ACTIVO")
    print("=" * 60)
    print(f"  💻 En tu PC:     http://localhost:{PORT}")
    print(f"  📱 En tu Celular: http://{local_ip}:{PORT}")
    print("=" * 60)
    print("  💡 Asegúrate de que el celular esté conectado a la misma")
    print("     red Wi-Fi que esta computadora.")
    print("=" * 60)
    httpd.serve_forever()

