import { ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { WsException } from '../exceptions/ws.exception';
export declare class WsExceptionFilter extends BaseWsExceptionFilter {
    catch(exception: WsException, host: ArgumentsHost): void;
}
