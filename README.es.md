# Portal de Gestión

[Ver Sitio Web en Vivo](https://fourgeeks-management-portal.onrender.com/)

![Vista Previa](frontend/public/preview.png)

## Tabla de Contenidos

- [Instrucciones](#instrucciones)
- [Nota Personal](#nota-personal)
- [Base de Datos](#base-de-datos)
  - [Stack Tecnológico](#stack-tecnológico)
  - [Gráfico UML](#gráfico-uml)
  - [Desafíos](#desafíos)
  - [Lecciones](#lecciones)
- [Backend](#backend)
  - [Stack Tecnológico](#stack-tecnológico-1)
  - [Desafíos](#desafíos-1)
  - [Lecciones](#lecciones-1)
- [Frontend](#frontend)
  - [Stack Tecnológico](#stack-tecnológico-2)
  - [Desafíos](#desafíos-2)
  - [Lecciones](#lecciones-2)

## Instrucciones

### 1. Base de Datos

Utilizo PostgreSQL y por lo tanto solo puedo proporcionar instrucciones para eso. Asegúrate de tenerlo [instalado](https://www.postgresql.org/download/) en tu sistema.

#### 1. Crea una nueva base de datos (puedes elegir cualquier nombre que te guste, `management_portal` es mi predeterminado). En tu terminal, ejecuta:

```sql
psql postgres
CREATE DATABASE management_portal;
\q
```

#### 2. Renombra `backend/.env.example` a `backend/.env`, luego edita el valor de `DATABASE_URL` para reflejar tu configuración de PostgreSQL. reemplaza los `****` con tu contraseña real de usuario de PostgreSQL, y usa el mismo puerto que PostgreSQL (5432 es el predeterminado):

```
DATABASE_URL=postgresql://postgres:****@localhost:5432/management_portal
```

### 2. Backend

Sugiero encarecidamente crear un nuevo entorno virtual antes de instalar las dependencias (listadas en `backend/requirements.txt`). Omite el paso 2 si prefieres trabajar globalmente, pero aún así ejecuta `cd backend`.

1. #### Cambia el valor de `SECRET_KEY` a una **Codeigniter Key** de [randomkeygen](https://randomkeygen.com/):

```
SECRET_KEY=<key desde randomkeygen>
```

2. #### Crea un nuevo `venv`:

```bash
cd backend
python -m venv venv
```

3. #### Activa el `venv`:

- #### Linux/Mac

```bash
source venv/bin/activate
```

- #### Windows

```
venv\Scripts\activate
```

4. #### Instala las dependencias:

```bash
pip install -r requirements.txt
```

5. #### Crea las tablas de la base de datos:

```bash
flask db upgrade
```

6. #### Pobla la base de datos para generar y agregar datos de muestra

```bash
python seed_db.py
```

7. #### Finalmente, inicia el servidor:

```bash
python run.py
```

8. #### Puedes ejecutar las pruebas usando:

```bash
pytest
```

### 3. Frontend

1. #### Instala las dependencias con pnpm o npm (yo uso pnpm):

```bash
cd frontend
pnpm install O npm install
```

2. #### Renombra `frontend/.env.example` a `frontend/.env`, y asegúrate de que tenga el mismo puerto configurado que `FLASK_PORT` en `backend/.env` (predeterminado 5000)

```
VITE_API_URL=http://localhost:5000
```

3. #### Inicia el servidor de desarrollo, luego visita el enlace impreso en la terminal:

```bash
pnpm run dev O npm run dev
```

### ¡Ahora deberías estar funcionando!

No dudes en enviarme un mensaje con cualquier bug que encuentres.

## Nota Personal

Este fue un proyecto divertido y extremadamente desafiante para mí. Me tomó alrededor de 20 horas completarlo, y aprendí mucho sobre código profesional y estructura (no es que lo haya logrado 😅). Este fue mi primer proyecto fullstack completo, y estoy orgulloso de mi resultado. Veo los defectos y el desorden que aún quedan en mi código, y lo limpiaré y refinaré con el tiempo y a medida que crezca mi experiencia...

## Base de Datos

### Stack Tecnológico

Utilicé PostgreSQL ya que es el que estudiamos en el bootcamp, y mi primera y única base de datos hasta ahora. Uso DBeaver localmente para ver la base de datos y hacer modificaciones rápidas.

Seguí los mismos patrones de los proyectos de Instagram y la API de Star Wars del bootcamp.

### Gráfico UML

Puedes echar un vistazo al código de este gráfico en [QDB](https://app.quickdatabasediagrams.com/#/d/Uiq9y1)

![Gráfico UML](frontend/public/uml.png)

Elegí agregar una tabla de `Products` después de completar mi página de `Users` en el frontend, ya que me di cuenta de que sería muy fácil de crear y mostrar, y facilitaría la creación de pedidos.

### Desafíos

Siempre me he sentido muy cómodo con las hojas de cálculo, y he escrito muchos pequeños scripts en mi vida en Python, así que esto fue muy sencillo para mí. No hubo desafíos ya que la base de datos es simple y PostgreSQL es fácil de usar.

### Lecciones

Disfruté aprender sobre el seeding ya que he visto esta técnica aplicada en mi uso de p5js y motores de juegos, donde el ruido o el ruido perlin es lo que se siembra. Fue interesante estar del lado del desarrollador esta vez, aunque usé Faker para hacer eso, que fue muy fácil de usar.

## Backend

### Stack Tecnológico

Estoy usando Flask para mi backend, SQLAlchemy para gestionar la base de datos, y Migrate para actualizarla con seguimiento de versiones. Uso Pytest para las pruebas. También agregué Gunicorn para poder alojar mi backend (más sobre esto en la sección de alojamiento).

### Desafíos

Profundizar en los errores y devolver mejores errores mientras mantenía la consistencia ocupó una gran parte de mi tiempo de programación. Ir y venir entre las llamadas fetch del frontend y las devoluciones de errores del backend fue tan tedioso como gratificante. Al final me aseguré de volver atrás y hacer que todos mis errores siguieran patrones consistentes.

### Lecciones

Me gustaría destacar principalmente mi verificación de errores, ya que me tomó el mayor esfuerzo y tiempo construir y refinar. Seguí los [Estándares de MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status) para asegurarme de devolver códigos de estado apropiados.

- Incluí 2 errores globales en mi `app/__init__.py` para evitar los feos errores de flask por urls mal escritas, rutas o endpoints de API.

- Para capturar cualquier error basado en rutas (base de datos, bugs, etc.), envolví todas las rutas con bloques try-except para devolver errores informativos en lugar de colapsar.

- Me aseguro de validar consistentemente los campos de formulario y devolver mensajes de error claros para informar al usuario del problema exacto sin tener que verificar la base de datos. Me aseguré de incluir:

  - Campos requeridos
  - Sin campos vacíos
  - Formato de email apropiado
  - Números válidos (por ejemplo, el precio no puede ser menor que 0)

- Usé `IntegrityError` donde necesitaba devolver errores específicos, como `A user with this email already exists`. También para revertir la base de datos en cualquier error de commit.

- Me aseguré de mantener mis respuestas JSON consistentes entre errores para que siempre devuelva datos en un formato esperado por el frontend.

- Finalmente, escribí pruebas básicas para verificar que cada `GET` de rutas devuelva la información correcta. Quería construir pruebas más complejas, pero habría tomado demasiado tiempo ya que soy muy nuevo en ellas. Lo intenté, y accidentalmente eliminé mis tablas 😂. Necesito más tiempo aprendiendo sobre pruebas apropiadas ya que me doy cuenta de que es más complejo de lo que pensaba.

## Frontend

### Stack Tecnológico

Para poner en uso las habilidades y herramientas que aprendí en el bootcamp, me quedé con el mismo stack tecnológico que se estaba enseñando. Sin embargo, comencé el proyecto desde [mi propia plantilla](https://github.com/WaficMikati/react-router-js-template) en la que he estado trabajando y expandiendo a lo largo del bootcamp, que intento mantener actualizada a las últimas versiones de cada tecnología:

- React 19 como el framework
- React Router v7 en modo Framework
- Vite 7 como mi herramienta de construcción y servidor de desarrollo
- Bootstrap 5 como mi biblioteca CSS
- FontAwesome para mis iconos

### Desafíos

Habiendo trabajado con React muy intensamente y en busca de código profesional, me sentí muy cómodo con él, especialmente porque tengo mi propia plantilla construida desde cero para aprender el modo framework de React Router. Esto hizo que construir el proyecto fuera pan comido.

Mis principales desafíos en el frontend fueron intentar controlar mejor Bootstrap para obtener el diseño que quería. Hacer que los encabezados permanezcan en la parte superior con desplazamiento es un problema que siempre he resuelto usando diseños de cuadrícula especificados y estableciendo `overflow-scroll` en la celda que serviría como el contenido.

Otro desafío fue descubrir cómo hacer un formulario de múltiples páginas para nuevos pedidos, con un selector basado en tabla, y selección múltiple para productos.

El toggle del tema fue más difícil de lo que esperaba también, ya que normalmente solo agrego `data-bs-theme` y modifico el valor en la etiqueta `<html>` con estado de React o contexto, pero esto estaba causando errores de hidratación en React Router, así que tuve que usar `document.documentElement.setAttribute('data-bs-theme', savedTheme)` en un `useEffect` dentro de mi `ThemeContext`, y lo almacené localmente para evitar destellos al refrescar o cambiar páginas, ya que el SSR haría que volviera al tema claro por una fracción de segundo.

### Lecciones

Me gustaría destacar mi sistema de pedidos de múltiples páginas, que creé expandiendo mi concepto de paginación de mi proyecto [Todo List](https://github.com/WaficMikati/4geeks-todo-list) del bootcamp.

- Al principio estaba usando un montón de estados para rastrear las páginas, pero se estaba volviendo desordenado de gestionar. Terminé usando un Reducer para gestionar los diferentes estados en su lugar para un código más limpio.

- Usé el sistema de navegación de React Router para rastrear estados y reaccionar en consecuencia.

- Dividí cada página del formulario en su propio componente para mantener el código más limpio.

- Agregué un `preselectedUser` al estado de `navigate` para poder crear un pedido directamente desde el perfil de un usuario que te lleva a la página dos del formulario de Nuevo Pedido con el usuario seleccionado. Este fue un truco ingenioso por el que sonreí al verlo funcionar.

Luché para obtener el diseño de encabezados fijos que buscaba con `d-grid`, y aprender sobre `flex-grow` y `flex-shrink` ayudó a hacerlo bien. Siempre he sido usuario de `grid` y `subgrid`, y usar Bootstrap me ha obligado a finalmente dominar `flex`.

Realmente disfruté profundizar en React Router y conocer mejor su sistema de navegación. Hace las cosas mucho más fáciles cuando se trata de gestión de estado para detectar carga (aunque olvidé agregarlo a la navegación de las páginas principales 🫣)

También estoy orgulloso de la funcionalidad de búsqueda simple, ya que la construí para que fuera basada en el frontend para velocidad, e implementé filtrado de términos que se actualiza por renderizado a medida que el usuario escribe.