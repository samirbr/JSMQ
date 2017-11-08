type Nullable<T> = null | T;
type Thunk<T, U> = (t: T) => U;
type Callable<T, U> = Function | Thunk<T, U>;

declare class Endpoint {
  activated: Nullable<Callable<Endpoint, void>>;
  deactivated: Nullable<Callable<Endpoint, void>>;
  onMessage: Nullable<Callable<JSMQ.Message, void>>;

  constructor(address: string);

  getIsActive(): boolean;
  write(message: JSMQ.Message): void;
}

declare class LB {
  writeActivated: Nullable<Callable<any, void>>;

  attach(endpoint: Endpoint): void;
  terminated(endoiunt: Endpoint): void;
  send(message: JSMQ.Message): boolean;
  getHasOut(): boolean;
}

declare class SocketBase {
  onMessage: Nullable<Callable<JSMQ.Message, void>>;
  sendReady: Nullable<Callable<any, void>>;

  constructor(
    xattachEndpoint: Callable<Endpoint, void>,
    xendpointTerminated: Callable<Endpoint, void>,
    xhasOut: Callable<any, boolean>,
    xsend: Callable<JSMQ.Message, void>,
    xonMessage: Nullable<Callable<JSMQ.Message, void>>
  );

  connect(address: string): void;
  disconnect(address: string): void;
  send(message: JSMQ.Message): boolean;
  getHasOut(): boolean;
}

declare namespace JSMQ {
  class Dealer extends SocketBase { }

  class Subscriber extends SocketBase {
    subscribe(subscription: string): void;
    unsubscribe(subscription: string): void;
  }

  class Message {
    getSize(): number;
    prependString(str: string): void;
    addString(str: string): void;
    popString(): string;
    popBuffer(): Uint8Array;
    addBuffer(buffer: ArrayBuffer | Uint8Array): never;
    getBuffer(i: number): Uint8Array;
  }
}

declare namespace StringUtility {
  function StringToUint8Array(str: string, buffer?: Uint8Array): Uint8Array;
  function Uint8ArrayToString(buffer: Uint8Array): string;
}
