# Portfolio Web

Web profesional de Carlos Bernal, periodista y comunicador.

Proyecto construido como web estatica mobile first con HTML, CSS, JavaScript, assets optimizados y despliegue previsto en Netlify.

## URLs

- Produccion Netlify: pendiente
- Preview local habitual: http://127.0.0.1:5179/
- Repositorio GitHub: https://github.com/carbernalherrero-coder/portfolioweb

## Estado actual

- Proyecto inicializado desde cero.
- Estructura base creada.
- Preview local disponible mediante Node.
- Configuracion base de Netlify anadida.
- Pendiente de diseno visual, contenidos definitivos y conexion final con Netlify.

## Estructura

```text
.
|-- README.md
|-- index.html
|-- netlify.toml
|-- preview-server.js
|-- .gitignore
|-- assets/
|   |-- images/
|   |   `-- .gitkeep
|   |-- video/
|   |   `-- .gitkeep
|   |-- icons/
|   |   `-- .gitkeep
|   `-- documents/
|       `-- .gitkeep
|-- css/
|   `-- styles.css
`-- js/
    `-- main.js
```

## Preview local

Desde la carpeta del repositorio:

```bash
node preview-server.js
```

Despues abre:

```text
http://127.0.0.1:5179/
```

El servidor publica los archivos estaticos del repositorio y usa `index.html` como entrada principal.

## Despliegue en Netlify

Configuracion base incluida en `netlify.toml`:

- Directorio de publicacion: raiz del repositorio.
- Comando de build: no necesario para esta web estatica inicial.
- Archivo principal: `index.html`.

Cuando se conecte Netlify, la URL de produccion debera actualizarse en este README.

## Stack

- HTML semantico.
- CSS propio mobile first.
- JavaScript ligero sin dependencias externas.
- Preview local con Node.js.
- Despliegue previsto en Netlify.

## Proximos pasos

- Definir direccion visual definitiva.
- Incorporar contenidos profesionales reales.
- Anadir imagenes, video, iconos y documentos optimizados.
- Revisar accesibilidad y rendimiento.
- Conectar el repositorio con Netlify.

