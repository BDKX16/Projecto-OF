FROM 14.17.3-alpine3.14

WORKDIR /api

# Copiar solo los archivos de dependencias primero
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

EXPOSE 3001

CMD ["node", "index.js"]