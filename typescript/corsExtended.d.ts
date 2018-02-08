import { Callback, Context, Handler, ProxyResult } from 'aws-lambda';

declare var corsExtended: {
    (options?: corsExtended.Options, handler: corsExtended.IHandlerLambda, next: corsExtended.INextFunction): void
}

declare namespace corsExtended {

    interface Options {
        origin?: string;
        headers?: string;
        credentials?: boolean,
    }

    type INextFunction = (error?: any) => void;

    interface IHandlerLambda {
        event: any;
        context: Context;
        response: ProxyResult | object;
        error: Error;
        callback: Callback;
      }
}

export  = corsExtended;