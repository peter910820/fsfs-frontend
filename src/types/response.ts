import type { UserInfo } from "@/types/user";

// 泛型，定義共通Response
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ResponseType<T = any> {
  statusCode: number;
  errMsg: string;
  infoMsg: string;
  userInfo: UserInfo;
  data: T;
}

export type LoginResponseType = ResponseType<UserInfo>;
