declare module "midtrans-client" {
  interface SnapTransactionResult {
    token: string;
    redirect_url: string;
  }
  export class Snap {
    constructor(options: {
      isProduction: boolean;
      serverKey: string;
      clientKey: string;
    });
    createTransaction(
      parameters: Record<string, unknown>,
    ): Promise<SnapTransactionResult>;
    createTransactionToken(
      parameters: Record<string, unknown>,
    ): Promise<string>;
  }
}
