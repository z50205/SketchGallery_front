# 使用官方的 Node.js Alpine 映像作為基礎映像
FROM node:20-alpine AS build

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./
ENV NODE_OPTIONS=--openssl-legacy-provider
# 安裝依賴
RUN npm install

# 複製其他檔案到容器中
COPY . .

# 建置 React 專案
RUN npm run build

# 使用 Nginx 作為伺服器
FROM nginx:alpine

# 複製 build 的結果到 Nginx 的預設資料夾
COPY --from=build /app/build /usr/share/nginx/html

# 複製自定義的 Nginx 配置（如果需要）
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 3000

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]