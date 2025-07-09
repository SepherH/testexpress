# Google Cloud Platform 設定指南

本文檔提供在 Google Cloud Platform 上設定專案並部署到 Cloud Run 的詳細步驟。

## 1. 建立 GCP 專案

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 點擊頁面頂部的「專案」下拉選單
3. 點擊「新增專案」
4. 輸入專案名稱 (例如：`testexpress`)，點擊「建立」
5. 等待專案建立完成，然後點擊「選取專案」

## 2. 啟用必要的 API

1. 在 Cloud Console 的左側選單中，前往「API 和服務」>「程式庫」
2. 搜尋並啟用以下 API：
   - Cloud Run API
   - Container Registry API
   - Cloud Build API

## 3. 建立服務帳戶

1. 在 Cloud Console 中，前往「IAM 和管理」>「服務帳戶」
2. 點擊「建立服務帳戶」
3. 輸入服務帳戶名稱（例如：`github-actions`）
4. 點擊「建立並繼續」
5. 在「授予此服務帳戶對專案的存取權」部分，新增以下角色：
   - Cloud Run Admin
   - Storage Admin
   - Service Account User
   - Cloud Build Editor
6. 點擊「完成」

## 4. 建立服務帳戶金鑰

1. 在服務帳戶列表中，找到剛剛建立的服務帳戶
2. 點擊該服務帳戶，進入其詳細資訊頁面
3. 在「金鑰」標籤中，點擊「新增金鑰」>「建立新的金鑰」
4. 選擇「JSON」格式，點擊「建立」
5. 系統會自動下載金鑰檔案，請妥善保管此檔案，後面需要上傳到 GitHub Secrets

## 5. 取得專案 ID

1. 在 Cloud Console 的頂部可以看到您的專案 ID
2. 記下此專案 ID，後面需要設定到 GitHub Secrets

## 6. 設定 GitHub Secrets

在 GitHub 儲存庫中，添加以下 secrets：

1. 前往您的 GitHub 儲存庫
2. 點擊「Settings」>「Secrets」>「Actions」
3. 點擊「New repository secret」，添加以下兩個 secrets：
   - 名稱：`GCP_PROJECT_ID`，值：您的 GCP 專案 ID
   - 名稱：`GCP_SA_KEY`，值：服務帳戶金鑰 JSON 檔案的全部內容

## 7. 推送程式碼並觸發部署

1. 確保已經建立並推送 GitHub Actions 工作流程檔案 `.github/workflows/deploy.yml`
2. 提交並推送程式碼到 `main` 分支
3. 前往 GitHub 儲存庫的 Actions 頁面，查看部署進度

## 8. 測試部署

1. 部署完成後，在 Actions 工作流程的輸出中可以找到服務 URL
2. 訪問該 URL，確認應用程式已成功部署

## 注意事項

1. 首次部署可能需要等待較長時間，因為需要構建 Docker 映像檔
2. 如果遇到權限問題，請檢查服務帳戶的角色是否設定正確
3. 確保 `deploy.yml` 中的 `REGION` 值與您實際希望部署的區域一致
4. 您可以在 Cloud Run 控制台中監控應用程式的運行狀態和資源使用情況
