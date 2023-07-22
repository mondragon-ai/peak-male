interface CollectJS {
  configure(options: any): void;
  startPaymentRequest(): void;
}

declare global {
  interface Window {
    CollectJS: CollectJS;
  }
}
