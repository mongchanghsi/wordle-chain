declare module "@mtproto/core" {
  interface MTProtoConfig {
    api_id: string;
    api_hash: string;
    storageOptions: {
      path: string;
    };
  }

  class MTProto {
    constructor(config: MTProtoConfig);

    call(
      method: string,
      params: Record<string, any>,
      options: Record<string, any>
    ): Promise<any>;

    setDefaultDc(dataCenter: number): any;
  }

  export = MTProto;
}
