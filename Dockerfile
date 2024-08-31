FROM node:18.20.3-alpine AS build
WORKDIR /app
COPY package.json /app/package.json
RUN npm set progress=false
RUN npm install --force --registry=https://registry.npmmirror.com
COPY . /app
RUN npm run build


FROM node:18.20.3-alpine
WORKDIR /usr/src/app

COPY --from=build /app/dist /usr/src/app/dist
COPY --from=build /app/file /usr/src/app/file
COPY --from=build /app/node_modules /usr/src/app/node_modules
COPY --from=build /app/package.json /usr/src/app/package.json

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
EXPOSE 3000

# 容器启动命令
CMD ["node", "dist/src/main.js"]
