import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class MyLogger extends ConsoleLogger {
    error(message: any, stack?: string, context?: string) {
        const args = {...arguments}
        super.error(args);
      }
        
    }


