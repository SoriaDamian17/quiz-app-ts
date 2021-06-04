FROM node:8 as react-build
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

# the production environment
FROM nginx:alpine

COPY --from=react-build /app/dist/ /usr/share/nginx/html
COPY --from=react-build /app/nginx.conf /etc/nginx/conf.d/default.conf