/**
 * @name SQLite
 */
export declare class SQLite {
    private _objectInstance;
    databaseFeatures: any;
    constructor(config: any);
    addTransaction(transaction: any): void;
    transaction(fn: any): Promise<any>;
    readTransaction(fn: any): Promise<any>;
    startNextTransaction(): void;
    close(): Promise<any>;
    start(): void;
    executeSql(statement: string, params: any): Promise<any>;
    addSatement(sql: any, values: any): Promise<any>;
    sqlBatch(sqlStatements: any): Promise<any>;
    abortallPendingTransactions(): void;
    handleStatementSuccess(handler: any, response: any): void;
    handleStatementFailure(handler: any, response: any): void;
    run(): void;
    abort(txFailure: any): void;
    finish(): void;
    abortFromQ(sqlerror: any): void;
    static echoTest(): Promise<any>;
    static deleteDatabase(first: any): Promise<any>;
}
