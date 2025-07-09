import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import morgan from 'morgan';
import { healthRoutes } from './routes/health.routes';

// 建立 Express 應用程式
const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '3000');

// 中間件設定
app.use(morgan('dev')); // HTTP 請求日誌
app.use(express.json()); // 解析 JSON 請求體
app.use(express.urlencoded({ extended: true })); // 解析 URL 編碼的請求體
app.use(express.static(path.join(__dirname, '../public'))); // 靜態檔案服務

// 設定視圖引擎
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// 路由設定
app.use('/api', healthRoutes);

// 首頁路由
app.get('/', (req: Request, res: Response) => {
    res.send(`
    <html>
      <head>
        <title>TypeScript Express 範例</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
          }
          h1 {
            color: #333;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
          }
          .container {
            background-color: #f9f9f9;
            border-radius: 5px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .endpoints {
            margin-top: 20px;
          }
          .endpoint {
            background-color: #fff;
            border-left: 4px solid #28a745;
            padding: 10px;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Node.js TypeScript Express 範例伺服器</h1>
          <p>這是一個使用 Node.js、TypeScript 和 Express 構建的網頁伺服器範例。</p>
          
          <div class="endpoints">
            <h2>可用的 API 端點：</h2>
            <div class="endpoint">GET /api/health - 健康檢查</div>
            <div class="endpoint">GET /api/info - 伺服器資訊</div>
          </div>
        </div>
      </body>
    </html>
  `);
});

// 404 錯誤處理
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({
        status: 'error',
        message: '找不到請求的資源'
    });
});

// 全域錯誤處理
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send({
        status: 'error',
        message: '伺服器內部錯誤'
    });
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`伺服器運行於: http://localhost:${PORT}`);
});

export default app;
