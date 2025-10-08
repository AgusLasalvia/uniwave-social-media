# 🌊 uniwave — Red Social Universitaria Uruguaya

**uniwave** es una **red social universitaria uruguaya** creada para conectar a **estudiantes de distintas universidades** que comparten **gustos, intereses y conocimientos**.  
Su propósito es fomentar la colaboración, el intercambio de ideas y la creación de comunidades dentro del entorno académico. 🎓🇺🇾

---

## 🧠 Descripción

uniwave busca ofrecer una experiencia moderna y accesible donde los estudiantes puedan:
- 👥 Conectarse con otros usuarios universitarios.
- 📝 Compartir publicaciones, pensamientos e intereses.
- 💬 Interactuar mediante comentarios y reacciones.
- 🔔 Mantenerse actualizados con lo que sucede en su entorno educativo.

---

## ⚙️ Tecnologías utilizadas

### 📱 **Aplicación móvil**
- **React Native** — interfaz móvil multiplataforma.
- **Expo** — entorno de desarrollo, testing y build.
- **TypeScript** — tipado estático y mejor mantenimiento del código.

### 🔙 **Backend**
- **Go (Golang)** — API REST ligera y eficiente.
- **Gin** — framework para manejo de rutas, controladores y middlewares.
- **Firebase Firestore** — base de datos NoSQL para almacenamiento de datos.
- **MinIO** — sistema de almacenamiento tipo *object storage* autoalojado, utilizado como alternativa local a AWS S3 para el manejo de imágenes y archivos multimedia.

---

## 🧩 Arquitectura general

La arquitectura del proyecto está dividida en tres capas principales:
1. **Frontend móvil (React Native + Expo)** — experiencia de usuario.
2. **Backend (Go + Gin)** — gestión de usuarios, publicaciones y autenticación.
3. **Servicios locales (MinIO + Firestore)** — persistencia de datos y almacenamiento de archivos.

---

## 🚀 Objetivo del proyecto
Crear una **plataforma digital para estudiantes universitarios uruguayos**, promoviendo el aprendizaje compartido, la interacción y la conexión entre personas con intereses y conocimientos similares.

---

📍 *Proyecto en desarrollo con fines académicos y sociales.*  
👨‍💻 Autor: [AgusLasalvia](https://github.com/AgusLasalvia)
