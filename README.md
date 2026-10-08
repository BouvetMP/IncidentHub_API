# IncidentHub API

### Problema que soluciona
Esta API ( Application Programming Interface, Interfaz de Programación de Aplicaciones), permite reportar las novedades tecnológicas por llamadas y mensajes informales para dejar constancia de la etapa del proceso en que se encuentra una incidencia. Se permite registrar, consultar, actualizar, atender y eliminar discrepancias.

## Tecnologías

El lenguaje utilizado es Node.js, Express y Typescript. Todo lo desarrollado es guardado de forma local (arrays) y subido al repositorio. 

## Instalación
``` bash ```
``` npm install ```
``` npm install -g pnpm```
``` install```

## Ejecución
``` pnpm run dev ```

Servidor en http://localhost:3000

## Endpoints:

| Método | Ruta | Descripción | Respuesta |
|---|---|---|---|
| GET | /api/incidents | Listar incidentes | 200 |
| GET | /api/incidents/:id | Consultar por ID | 200 / 404 |
| POST | /api/incidents | Crear incidente | 201 |
| PUT | /api/incidents/:id | Actualizar incidente | 200 / 404 |
| PATCH | /api/incidents/:id/status | Cambiar estado | 200 / 400 / 404 |
| DELETE | /api/incidents/:id | Eliminar (solo admin) | 204 / 401 / 403 / 404 |
| GET | /api/incidents/critical | Incidentes críticos | 200 |
| GET | /api/incidents/pending | Incidentes pendientes | 200 |
| GET | /api/incidents/stats | Estadísticas | 200 |

Tokens: Bearer instructor-token (admin) y Bearer technician-token (técnico).

## Middlewares
Los middlewares se encargan de procesar y validar las solicitudes antes de que lleguen a los controladores, además de gestionar errores y registrar información de las peticiones.

- **admin.middleware.ts:** Verifica que el usuario tenga permisos de administrador para acceder a determinadas funcionalidades o rutas.
- **auth.middleware.ts:** Comprueba la autenticación del usuario y valida que la solicitud cuente con las credenciales necesarias para acceder a rutas protegidas.
- **error.middleware.ts:** Centraliza el manejo de errores de la aplicación y devuelve respuestas de error con un formato consistente.
- **logger.middleware.ts:** Registra información relevante de las solicitudes HTTP para facilitar el seguimiento y diagnóstico de las peticiones.
- **not-found.middleware.ts:** Maneja las solicitudes realizadas a rutas que no existen y devuelve una respuesta indicando que el recurso solicitado no fue encontrado.
- **request-info.middleware.ts:** Recopila y registra información relacionada con las solicitudes HTTP, como el método, la ruta y otros datos relevantes de la petición.
- **validate-id.middleware.ts:** Valida que el identificador (id) recibido en la solicitud tenga un formato válido antes de continuar con el procesamiento.
- **validate-incident-middleware.ts:** Valida los datos relacionados con un incidente para garantizar que la información recibida cumpla con los requisitos establecidos.
- **validate-priority.middleware.ts:** Comprueba que la prioridad proporcionada para un incidente sea válida y corresponda a los valores permitidos.
- **validate-time.middleware.ts:** Valida que los valores relacionados con el tiempo o las fechas recibidas en la solicitud tengan un formato y/o valor permitido.

## DTO vs Model
Model: Representa cómo se guarda un incidente dentro de la aplicación. Contiene toda la información del incidente, como su id, título, descripción, persona que lo reporta, ubicación, prioridad, estado, tiempo estimado y fecha de creación.

DTO: Representa la información que el usuario puede enviar desde el cliente al crear o modificar un incidente. Por ejemplo, al hacer un POST, se envían datos como el título, descripción, reporter, ubicación, prioridad y tiempo estimado.

Diferencia: La forma más sencilla de verlo es que el DTO contiene los datos que proporciona el usuario, mientras que el Model representa el incidente completo una vez que el sistema lo procesa y agrega información propia, como el id, el estado o la fecha de creación.

## Reflexión
La pregunta es: ¿qué ventajas tiene usar middlewares para validaciones, autenticación y errores, en vez de escribir todo en cada controller?
> RTA: La ventaja fundamental radica en que implementar validaciones, autenticación y manejo de errores mediante middlewares hace que el proyecto sea mucho más ordenado y fácil de mantener, eso en primer instancia. Segundo, en lugar de aplicar la misma lógica en cada Controller, los middlewares permiten centralizarla y reutilizarla en diferentes rutas.
Por ejemplo, si necesitamos comprobar que un usuario esté autenticado, podemos hacerlo una sola vez en un middleware y utilizarlo en todas las rutas que lo necesiten.




