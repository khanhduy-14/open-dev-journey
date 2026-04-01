import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getProcessId } from '@common/utils/string.utils';
import { RequestMetaDataEnum } from '@common/constants/common.constants';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, originalUrl, body } = req;
    const processId = getProcessId();
    (req as any)[RequestMetaDataEnum.PROCESS_ID] = processId;
    (req as any)[RequestMetaDataEnum.START_TIME] = startTime;

    Logger.log(
      `HTTP => Start process ${processId} >> path: ${originalUrl} >> method: ${method} at ${startTime} >> input: ${JSON.stringify({ body })}`,
    );

    const originalSend = res.send.bind(res);

    res.send = (body: any) => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      Logger.log(
        `HTTP => End process ${processId} >> path: ${originalUrl} >> method: ${method} at ${endTime}  >> duration: ${duration} ms`,
      );
      return originalSend(body);
    };
    next();
  }
}
