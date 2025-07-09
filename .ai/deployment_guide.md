# Node.js TypeScript Express 部署指南

## 概述

本指南提供將 Node.js TypeScript Express 應用程式部署到 Google Cloud Run 的詳細步驟，使用 GitHub Actions 實現自動化部署。

## 前置準備

### 需要的帳戶和工具
- GitHub 帳戶
- Google Cloud Platform (GCP) 帳戶
- Git 命令列工具
- Docker（本地測試用）

## 部署步驟

### 1. GitHub 設定

#### 1.1 建立並設定 GitHub 儲存庫
1. 登入 GitHub，建立新儲存庫
2. 將本地專案推送到 GitHub 儲存庫

```bash
# 初始化 Git（如果尚未初始化）
git init

# 設定 .gitignore（我們已經建立好了）

# 添加檔案到暫存區
git add .

# 提交變更
git commit -m "初始化 Node.js TypeScript Express 專案與 CI/CD 設定"

# 添加遠端儲存庫
git remote add origin https://github.com/您的用戶名/您的儲存庫名稱.git

# 推送到主分支
git push -u origin main
```

### 2. Google Cloud Platform 設定

#### 2.1 建立專案與設定 API
1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立新專案或選擇現有專案
3. 啟用以下 API:
   - Cloud Run API
   - Container Registry API
   - Cloud Build API

#### 2.2 設定服務帳戶
1. 前往 IAM 和管理 > 服務帳戶
2. 點擊「建立服務帳戶」
3. 名稱：`github-actions`，點擊「建立並繼續」
4. 新增以下角色：
   - Cloud Run Admin
   - Storage Admin
   - Service Account User
   - Cloud Build Editor
5. 點擊「完成」

#### 2.3 建立金鑰
1. 在服務帳戶列表中，點擊您剛建立的服務帳戶
2. 選擇「金鑰」標籤，點擊「新增金鑰」 > 「建立新金鑰」
3. 選擇 JSON 格式，點擊「建立」
4. 下載的金鑰檔案需要妥善保管，將用於設定 GitHub Secrets

### 3. GitHub Secrets 設定

1. 在您的 GitHub 儲存庫頁面，點擊「Settings」
2. 選擇「Secrets and variables」 > 「Actions」
3. 點擊「New repository secret」，添加以下密鑰：
   - 名稱：`GCP_PROJECT_ID`
   - 值：您的 GCP 專案 ID（可在 GCP 控制台首頁查看）
4. 再次點擊「New repository secret」：
   - 名稱：`GCP_SA_KEY`
   - 值：貼上您下載的服務帳戶金鑰 JSON 檔案的全部內容

### 4. 部署與驗證

#### 4.1 觸發部署
一旦您設定完 GitHub Secrets，並推送程式碼到 `main` 分支，GitHub Actions 工作流程將自動觸發。

1. 前往 GitHub 儲存庫的「Actions」頁面
2. 您應該能看到一個正在執行或已完成的工作流程
3. 點擊該工作流程可查看詳細的執行步驟和日誌

#### 4.2 驗證部署
1. 部署完成後，工作流程的輸出中會顯示 Cloud Run 服務的 URL
2. 訪問該 URL 確認應用程式是否正常運行
3. 測試以下端點：
   - `/` - 主頁
   - `/api/health` - 健康檢查
   - `/api/info` - 伺服器資訊

### 5. 本地 Docker 測試

在推送到 GitHub 進行自動部署之前，您可以在本地測試 Docker 映像檔：

```bash
# 執行我們提供的測試腳本
./test_locally.sh
```

腳本會：
1. 建置 Docker 映像檔
2. 在本地運行容器
3. 測試 API 端點

## 持續整合與部署

### 更新應用程式
當您需要更新應用程式時：

1. 在本地進行代碼修改
2. 提交並推送到 GitHub
```bash
git add .
git commit -m "描述您的更改"
git push origin main
```
3. GitHub Actions 將自動部署最新版本

### 監控部署
1. 在 GitHub 的 Actions 頁面監控部署進度
2. 在 GCP Cloud Run 控制台查看服務狀態和日誌

## 疑難排解

### GitHub Actions 失敗
- 檢查 GitHub Actions 日誌中的錯誤訊息
- 確認 GitHub Secrets 設定正確
- 驗證服務帳戶權限是否足夠

### 應用程式無法啟動
- 檢查 Cloud Run 服務日誌
- 確保應用程式在 Docker 容器中能正確監聽 `PORT` 環境變數指定的端口

### 無法存取應用程式
- 確認 Cloud Run 服務已設為公開訪問（`--allow-unauthenticated` 旗標）
- 檢查應用程式的監聽端口是否正確

## 結語

恭喜您！您已成功設定了使用 GitHub Actions 自動部署到 Google Cloud Run 的 CI/CD 流程。這個自動化流程讓您可以專注於開發，而不必擔心部署的複雜性。
