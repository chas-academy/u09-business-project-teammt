import { Request, Response } from 'express';
interface AuthenticatedRequest extends Request {
    user?: any;
}
export declare const getCookBooks: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const createCookBook: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const updateCookBook: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteCookBook: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getOneCookBook: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=cookBookController.d.ts.map