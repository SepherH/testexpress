#!/bin/bash
# 本地測試 Docker 映像檔的腳本

# 顏色設置
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 顯示訊息函式
info() {
  echo -e "${YELLOW}[INFO]${NC} $1"
}

success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# 步驟 1: 建置 Docker 映像檔
info "開始建置 Docker 映像檔..."
docker build -t testexpress:local .

# 確認是否建置成功
if [ $? -ne 0 ]; then
  echo "Docker 映像檔建置失敗，請檢查錯誤訊息"
  exit 1
fi
success "Docker 映像檔建置成功"

# 步驟 2: 在本地運行 Docker 容器
info "開始在本地運行 Docker 容器..."
info "將在 http://localhost:8080 提供服務"
docker run -p 8080:8080 --name testexpress_container -d testexpress:local

# 確認是否運行成功
if [ $? -ne 0 ]; then
  echo "Docker 容器運行失敗，請檢查錯誤訊息"
  exit 1
fi
success "Docker 容器運行成功"

# 步驟 3: 測試健康檢查端點
info "等待 3 秒，讓服務完全啟動..."
sleep 3

info "測試健康檢查端點..."
curl -s http://localhost:8080/api/health | grep "success"

# 步驟 4: 測試伺服器資訊端點
info "測試伺服器資訊端點..."
curl -s http://localhost:8080/api/info | grep "success"

# 顯示如何停止和清理
success "測試完成！若要停止和刪除容器，請執行："
echo "  docker stop testexpress_container"
echo "  docker rm testexpress_container"
