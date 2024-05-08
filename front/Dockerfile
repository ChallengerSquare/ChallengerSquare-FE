FROM node:20.12.0 as build
WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install
COPY . .
RUN yarn build

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx","-g","daemon off;"]

# FROM node:20.12.0-alpine
# WORKDIR /app
# COPY package.json yarn.lock ./

# RUN yarn install
# COPY . .
# RUN yarn build

# FROM nginx:stable-alpine

# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/build /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx","-g","daemon off;"]
