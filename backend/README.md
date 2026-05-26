# 🚀 Posts Manager Backend

API backend desarrollada con NestJS y MongoDB Atlas para la gestión de posts y comentarios.

---

# 🛠️ Tecnologías

* NestJS
* MongoDB Atlas
* Mongoose
* TypeScript
* DTO Validation

---

# 📦 Funcionalidades

* CRUD de Posts
* CRUD de Comentarios
* Endpoint de carga masiva
* Global Exception Filter
* Response Interceptor
* Respuestas estandarizadas

---

# ⚙️ Instalación

## Instalar dependencias

```bash id="jlwm304"
npm install
```

## Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env id="jlwm305"
MONGO_URI=tu_uri_mongodb
PORT=3000
```

## Ejecutar backend

```bash id="’wini06"
npm run start:dev
```

El backend correrá en:

```bash id="’wini07"
http://localhost:3000
```

---

# 📡 Endpoints API

## Posts

| Método | Endpoint    |
| ------ | ----------- |
| GET    | /posts      |
| GET    | /posts/:id  |
| POST   | /posts      |
| PUT    | /posts/:id  |
| DELETE | /posts/:id  |
| POST   | /posts/bulk |

---

## Comentarios

| Método | Endpoint            |
| ------ | ------------------- |
| GET    | /comments?postId=id |
| POST   | /comments           |
| DELETE | /comments/:id       |

---

# 📦 Ejemplo de carga masiva

```json id="’wini08"
[
  {
    "title": "Post 1",
    "body": "Contenido del post 1",
    "author": "Juan"
  },
  {
    "title": "Post 2",
    "body": "Contenido del post 2",
    "author": "Maria"
  }
]
```
