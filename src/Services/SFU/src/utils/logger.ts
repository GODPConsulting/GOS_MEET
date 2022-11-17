import pino from 'pino';

const APP_NAME = 'strive-mediasoup';

interface ILogger {
   info(msg: string, ...args: any[]): void;
   fatal(msg: string, ...args: any[]): void;
   error(msg: string, ...args: any[]): void;
   trace(msg: string, ...args: any[]): void;
   debug(msg: string, ...args: any[]): void;
   warn(msg: string, ...args: any[]): void;
   child(bindings: any): ILogger;
}

export default class Logger {
   private logger: ILogger;

   constructor(prefix?: string) {
      if (prefix) {
         this.logger = pino({
            level: 'debug',
            name: `${APP_NAME}:${prefix}`,
         });
      } else {
         this.logger = pino({
            level: 'debug',
            name: `${APP_NAME}`,
         });
      }
   }

   debug(msg: string, ...args: any[]) {
      this.logger.debug(msg, ...args);
   }

   info(msg: string, ...args: any[]): void {
      this.logger.info(msg, ...args);
   }

   warn(msg: string, ...args: any[]) {
      this.logger.warn(msg, ...args);
   }

   error(msg: string, ...args: any[]) {
      this.logger.error(msg, ...args);
   }
}