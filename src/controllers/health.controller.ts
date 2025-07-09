import { Request, Response } from 'express';
import os from 'os';

/**
 * 健康檢查控制器
 * @param req - 請求物件
 * @param res - 響應物件
 */
export const healthCheck = (req: Request, res: Response): void => {
    res.status(200).json({
        status: 'success',
        message: '伺服器運行正常',
        timestamp: new Date().toISOString()
    });
};

/**
 * 伺服器資訊控制器
 * @param req - 請求物件
 * @param res - 響應物件
 */
export const serverInfo = (req: Request, res: Response): void => {
    const serverInfo = {
        status: 'success',
        hostname: os.hostname(),
        platform: os.platform(),
        architecture: os.arch(),
        cpus: os.cpus().length,
        memoryTotal: `${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB`,
        memoryFree: `${Math.round(os.freemem() / (1024 * 1024 * 1024))} GB`,
        uptime: `${Math.floor(os.uptime() / 3600)} 小時 ${Math.floor((os.uptime() % 3600) / 60)} 分鐘`,
        nodeVersion: process.version,
        timestamp: new Date().toISOString()
    };

    res.status(200).json(serverInfo);
};
