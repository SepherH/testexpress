# 使用 Node.js 18 作為基礎映像檔
FROM node:18-alpine as builder

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製專案檔案
COPY . .

# 建置應用程式
RUN npm run build

# 使用更輕量的映像檔作為執行環境
FROM node:18-alpine

# 設定工作目錄
WORKDIR /app

# 從 builder 階段複製依賴和編譯後的程式碼
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/views ./views

# 設定環境變數
ENV NODE_ENV=production
ENV PORT=8080

# 暴露 8080 端口 (Cloud Run 會用這個端口)
EXPOSE 8080

# 啟動應用程式
CMD [ "node", "dist/app.js" ]
