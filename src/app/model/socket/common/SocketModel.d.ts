export interface SocketModel {
  send(request: SocketRequest): void;
  onReceived(callback: SocketCallback): void;
  connect(): void;
  disconnect(): void;
}

export type SocketRequest =
  | SocketLoginRequest
  | SocketChatRequest
  | SocketModifyProfileRequest;

type SocketLoginRequest = {
  commandType: 'user-login';
  resource: {
    channel: 'chat';
    privateKey: string;
  };
};

type SocketChatRequest = {
  commandType: 'chat';
  resource: {
    userKey: string;
    msg: string;
    type: string;
  };
};

type SocketModifyProfileRequest = {
  commandType: 'modify-profile';
  resource: {
    privateKey: string;
    userInfo: {
      icon: string;
      nickname: string;
      statusMessage: string;
    };
  };
};

export type SocketCallback = (response: SocketCommand) => void;

export type SocketCommand =
  | SocketChatCommand
  | SocketApplyMyStatusCommand
  | SocketCurrentChatsCommand
  | SocketCurrentUsersCommand;

type BaseSocketCommand<T, Request, Response> = {
  hash: string;
  commandType: T;
  request: Request;
  response: Response;
};

type SocketChatCommand = BaseSocketCommand<'chat', null, SocketCurrentChat>;

type SocketMyStatus = {
  coin: number;
  exp: number;
  icon: string;
  iconBorderColor: string;
  level: number;
  need: number;
  nickname: string;
  statusMessage: string;
};
type SocketApplyMyStatusCommand = BaseSocketCommand<
  'applyMyStatus',
  null,
  SocketMyStatus
>;

type SocketCurrentChat = {
  hash: string;
  icon: string;
  iconBorderColor: string;
  isMobile: boolean;
  isSystemChat: boolean;
  level: number;
  msg: {
    request: any; // TODO: remove any
    response: any; // TODO: remove any
  };
  nickname: string;
  reactions: any[]; // TODO: remove any
  timestamp: string;
  type: string; // TODO: make type
};

type SocketCurrentChatsCommand = BaseSocketCommand<
  'applyCurrentChatList',
  null,
  SocketCurrentChat[]
>;

type SocketCurrentUser = {
  computer: boolean;
  hash: string;
  icon: string;
  level: number;
  mobile: boolean;
  nickname: string;
};

type SocketCurrentUsersCommand = BaseSocketCommand<
  'applyCurrentUserList',
  null,
  SocketCurrentUser[]
>;
