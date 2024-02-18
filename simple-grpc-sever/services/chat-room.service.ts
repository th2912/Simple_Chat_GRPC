import { ServerWritableStream } from "@grpc/grpc-js";
import { Empty } from "../proto/chatPackage/Empty";
import { ChatEvent } from "../proto/chatPackage/ChatEvent";
import { ChatMessage } from "../proto/chatPackage/ChatMessage";
import { MessagePayload } from "../proto/chatPackage/MessagePayload";
import { v4 as uuidv4 } from "uuid";
import { JoinNotification } from "../proto/chatPackage/JoinNotification";

export class Message implements ChatMessage {
  public readonly uuid: string;
  public readonly username: string;
  public readonly msg: string;
  public readonly timestamp: number | string | Long;
  public like: number;
  public userLike: string[];

  constructor(msgPayload: MessagePayload) {
    this.uuid = uuidv4();
    this.timestamp = Date.now();
    this.like = 0;
    this.userLike = [];
    this.username = msgPayload.username;
    this.msg = msgPayload.msg;
  }
}

export class JoinNoti implements JoinNotification {
  public readonly uuid: string;
  public readonly username: string;
  public readonly timestamp: number | string | Long;

  constructor(userName: string) {
    this.uuid = uuidv4();
    this.timestamp = Date.now();
    this.username = userName;
  }
}
export interface UserMessages {
  [username: string]: Message[];
}
export class User {
  public readonly timeJoin: number | string | Long;
  constructor(public readonly name: string) {
    this.timeJoin = Date.now();
  }
}

export class ChatRoom {
  private static instance: ChatRoom;
  private users: User[];
  private usersMsg: UserMessages;

  public observers: ServerWritableStream<Empty, ChatEvent>[];

  private constructor() {
    this.users = [];
    this.observers = [];
    this.usersMsg = {};
  }

  public static getInstance(): ChatRoom {
    if (!ChatRoom.instance) {
      ChatRoom.instance = new ChatRoom();
    }
    return ChatRoom.instance;
  }

  public addUser(user: User) {
    this.usersMsg[user.name] = [];
    console.log("this.usersMsg", this.usersMsg);
    this.users.push(user);
  }

  public addMsg(msg: Message) {
    if (msg.username) {
      console.log("msg", msg);
      console.log("this.usersMsg[msg.username]", this.usersMsg[msg.username]);
      if (this.usersMsg[msg.username].length) {
        this.usersMsg[msg.username].push(msg);
      } else {
        this.usersMsg[msg.username] = [msg];
      }
    }
    console.log("this.usersMsg", this.usersMsg);
  }

  public addObserver(observer: ServerWritableStream<Empty, ChatEvent>) {
    this.observers.push(observer);
  }

  public likeMsg(
    user: string,
    userSend: string,
    messageId: string
  ): Message | any {
    let likeMsg: Message | any;

    for (const _msg of this.usersMsg[user]) {
      if (_msg.uuid === messageId) {
        if (_msg.userLike.length) {
          const isExist = _msg.userLike.findIndex(
            (_uname) => _uname === userSend
          );
          if (isExist !== -1) {
            _msg.userLike.splice(isExist, 1);
          } else {
            _msg.userLike.push(userSend);
          }
        } else {
          _msg.userLike = [userSend];
        }
        _msg.like = _msg.userLike.length;
        likeMsg = _msg;
      }
    }
    return likeMsg;
  }

  public getMsgListAllUsers() {
    return this.usersMsg;
  }

  public getMsgListByUser(userName: string) {
    console.log("userName", userName);
    console.log("this.usersMsg[userName]", this.usersMsg);
    return this.usersMsg[userName];
  }

  public getUsers() {
    return this.users;
  }
}
