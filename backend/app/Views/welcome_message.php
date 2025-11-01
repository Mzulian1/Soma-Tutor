<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SOMA Tutor API</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
        }
        .container {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            max-width: 600px;
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        p {
            font-size: 1.1rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            margin: 0.5rem;
            font-size: 0.9rem;
        }
        .links {
            margin-top: 2rem;
        }
        a {
            color: #fff;
            text-decoration: none;
            background: rgba(255, 255, 255, 0.2);
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            display: inline-block;
            margin: 0.5rem;
            transition: all 0.3s;
        }
        a:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏥 SOMA Tutor API</h1>
        <p>API REST para el Portal de Tutores y Apoderados de Residentes ELEAM</p>
        
        <div>
            <span class="badge">CodeIgniter 4</span>
            <span class="badge">PHP 8.2</span>
            <span class="badge">JWT Auth</span>
            <span class="badge">RESTful</span>
        </div>

        <div class="links">
            <a href="/api/v1/auth/login" target="_blank">API Endpoint</a>
            <a href="https://github.com" target="_blank">Documentación</a>
        </div>

        <p style="margin-top: 2rem; font-size: 0.9rem; opacity: 0.7;">
            Versión 1.0.0 - Desarrollado con ❤️
        </p>
    </div>
</body>
</html>



