FROM node:18.16.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Cambiamos a una imagen Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copiamos los archivos estáticos generados por la compilación de la aplicación en el contenedor de Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copiamos los certificados SSL de Certbot al contenedor
# COPY /etc/letsencrypt/live/leawebpage.com /etc/nginx/certs

# Exponemos el puerto 80 y 443 (HTTP y HTTPS) en los que Nginx estará escuchando
EXPOSE 80
EXPOSE 443