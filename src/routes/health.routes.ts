import { Router } from 'express';
import { healthCheck, serverInfo } from '../controllers/health.controller';

const router = Router();

// 健康檢查路由
router.get('/health', healthCheck);

// 伺服器資訊路由
router.get('/info', serverInfo);

export { router as healthRoutes };
