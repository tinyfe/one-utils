export interface AnyObject {
    [key: string]: unknown;
}

export interface OptionTypes extends AnyObject {
    plugins?: (...args: any[]) => [Repository, string];
}

export type Fn = (...args: any[]) => any;
export type Options = AnyObject;

export declare function clone(repo: string, targetPath: string): Promise<any>;
export declare function clone(
    repo: string,
    targetPath: string,
    options?: Options
): Promise<any>;

export declare function clone(
    repo: string,
    targetPath: string,
    options?: Options,
    cb?: Fn | undefined
): Promise<any>;

export declare function processAsync(process: NodeJS.Process, cb: Fn): Promise<any>;
export declare function processAsync(
    process: NodeJS.Process,
    cmd: string,
    cb?: Fn
): Promise<any>;

export interface Repository {
    type?: string;
    owner?: string;
    name?: string;
    checkout?: string;
}
