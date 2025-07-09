# Node.js TypeScript Express 部署計劃

## 部署目標
將 Node.js TypeScript Express 專案部署到 Google Cloud Run，並使用 GitHub Actions 實現 CI/CD 自動化流程。

## 步驟概述
1. 準備 GCP 環境
   - 建立 GCP 專案
   - 設定 Cloud Run 權限
   - 建立服務帳戶並下載金鑰

2. 準備 Dockerfile 與 .dockerignore
   - 建立適合 Node.js 的 Dockerfile
   - 配置 .dockerignore 以排除不必要的檔案

3. 設定 GitHub Actions 工作流程
   - 建立 GitHub Actions 配置文件
   - 設定 GitHub Secrets

4. 部署與測試
   - 推送程式碼到 GitHub 儲存庫
   - 驗證自動部署流程
   - 測試部署後的應用程式

## 目前進度
- [x] 初始化 Node.js TypeScript Express 專案
- [ ] 建立 GCP 環境
- [x] 準備 Docker 設定
  - [x] 建立 Dockerfile
  - [x] 建立 .dockerignore
- [x] 設定 GitHub Actions
  - [x] 建立工作流程文件 (.github/workflows/deploy.yml)
  - [ ] 設定 GitHub Secrets
- [ ] 部署到 Cloud Run

## 已完成工作詳情

### Docker 設定
已建立多階段 Dockerfile，優化了部署映像檔大小和安全性：
- 使用 node:18-alpine 作為基礎映像檔
- 實作多階段建置流程
- 配置生產環境設定
- 使用 .dockerignore 排除不必要的文件

### GitHub Actions 工作流程
已設定自動化部署流程：
- 當程式碼推送到 main 分支時觸發
- 自動建置和測試專案
- 建置 Docker 映像檔並推送到 Google Container Registry
- 自動部署到 Cloud Run

## 後續步驟詳細說明

### 1. 設定 GCP 環境

#### 1.1 建立 GCP 專案
1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立新專案或使用現有專案
3. 記下您的專案 ID，後面會用到

#### 1.2 啟用必要的 API
1. Cloud Run API
2. Container Registry API
3. Cloud Build API

#### 1.3 建立服務帳戶和權限
1. 在 IAM 和管理中建立服務帳戶
2. 授予以下權限：
   - Cloud Run Admin
   - Storage Admin
   - Service Account User
   - Cloud Build Editor
3. 下載服務帳戶金鑰（JSON 格式）

### 2. 設定 GitHub 儲存庫

#### 2.1 建立儲存庫並推送程式碼
```bash
# 初始化 Git 儲存庫（如果尚未初始化）
git init

# 新增要推送的檔案
git add .

# 提交變更
git commit -m "初始化 Node.js TypeScript Express 專案和 CI/CD 設定"

# 新增遠端儲存庫
git remote add origin <您的GitHub儲存庫網址>

# 推送到遠端儲存庫的 main 分支
git push -u origin main
```

#### 2.2 設定 GitHub Secrets
1. 前往您的 GitHub 儲存庫頁面
2. 點擊 "Settings" > "Secrets and variables" > "Actions"
3. 新增以下一對 Secrets：
   - `GCP_PROJECT_ID`: 您的 GCP 專案 ID
   - `GCP_SA_KEY`: 您的服務帳戶金鑰檔案內容（整個 JSON 檔）

### 3. 部署到 Cloud Run

#### 3.1 監控部署狀態
1. 推送程式碼到 main 分支後，前往 GitHub 儲存庫的 "Actions" 頁面
2. 查看部署工作流程的進度
3. 工作流程完成後，可以在輸出中看到服務 URL

#### 3.2 驗證部署
1. 訪問 Cloud Run 服務的 URL
2. 確認應用程式是否正確運行
3. 測試各個 API 端點（/api/health 和 /api/info）

### 4. 監控與維護

#### 4.1 監控服務
1. 在 Cloud Run 控制台查看服務狀態
2. 設定提醒和監控政策

#### 4.2 更新應用程式
1. 對程式碼進行更改
2. 將更改推送到 GitHub
3. GitHub Actions 會自動觸發新的部署
