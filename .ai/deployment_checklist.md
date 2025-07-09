# 部署檢查清單

## GitHub 準備工作
- [ ] 建立 GitHub 儲存庫
- [ ] 推送專案程式碼到儲存庫
- [ ] 確認 `.github/workflows/deploy.yml` 已正確設定

## GCP 帳號設定
- [ ] 建立 GCP 專案
- [ ] 啟用必要的 API (Cloud Run, Container Registry, Cloud Build)
- [ ] 建立服務帳戶
- [ ] 為服務帳戶設置正確的權限
- [ ] 下載服務帳戶金鑰 (JSON 格式)

## GitHub Secrets 設定
- [ ] 新增 `GCP_PROJECT_ID` 密鑰
- [ ] 新增 `GCP_SA_KEY` 密鑰

## 部署與驗證
- [ ] 推送程式碼到 `main` 分支以觸發部署
- [ ] 監控 GitHub Actions 工作流程
- [ ] 確認部署成功
- [ ] 測試已部署的應用程式
- [ ] 檢查 Cloud Run 服務運行狀態
