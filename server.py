from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

# Définir le port du serveur
PORT = 8000

# Créer le gestionnaire de requêtes
handler = SimpleHTTPRequestHandler

# Créer le serveur
with HTTPServer(("", PORT), handler) as httpd:
    print(f"Serveur démarré sur le port {PORT}")
    print(f"Ouvrez votre navigateur et allez sur http://localhost:{PORT}")
    
    # Servir les fichiers du répertoire courant
    httpd.serve_forever()
