# Node.js TypeScript Express 網頁伺服器範例

## 專案介紹

這是一個使用 Node.js、TypeScript 和 Express 構建的網頁伺服器範例專案。專案提供了基本的路由設定、控制器、錯誤處理和靜態檔案服務等功能。

## 功能特點

- 使用 TypeScript 提供型別安全
- Express 作為 Web 框架
- 完善的專案結構和模組化設計
- 內置健康檢查和伺服器資訊 API
- 錯誤處理中間件
- 靜態檔案服務
- 開發環境熱重載

## 安裝與使用

### 前置需求

- Node.js (建議 v14 或更高版本)
- npm 或 yarn

### 安裝依賴

```bash
npm install
```

或

```bash
yarn install
```

### 開發環境運行

```bash
npm run dev
```

或

```bash
yarn dev
```

此命令會啟動開發伺服器，並在程式碼變更時自動重新載入。

### 編譯 TypeScript

```bash
npm run build
```

或

```bash
yarn build
```

### 生產環境運行

```bash
npm start
```

或

```bash
yarn start
```

## API 端點

- `GET /` - 首頁
- `GET /api/health` - 健康檢查
- `GET /api/info` - 伺服器資訊

## 專案結構

```
/
├── src/                  # 源碼目錄
│   ├── controllers/      # 控制器
│   ├── routes/           # 路由定義
│   ├── middlewares/      # 中間件
│   ├── models/           # 資料模型
│   └── app.ts            # 應用程式入口
├── dist/                 # 編譯後的程式碼
├── public/               # 靜態檔案
├── views/                # 視圖文件
├── package.json          # 項目依賴
├── tsconfig.json         # TypeScript 設定
└── README.md             # 專案說明
```

## 授權

ISC
