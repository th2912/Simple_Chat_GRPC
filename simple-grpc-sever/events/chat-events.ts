import { ChatEvent } from "../proto/chatPackage/ChatEvent";
import { ChatMessage } from "../proto/chatPackage/ChatMessage";
import { JoinNotification } from "../proto/chatPackage/JoinNotification";
import { v4 as uuidv4 } from "uuid";
import { LikeMessage } from "../proto/chatPackage/LikeMessage";

export class MessageEvent implements ChatEvent {
  uuid: string;
  chatMessage: ChatMessage;
  event: "chatMessage" = "chatMessage";
  constructor(chatMessage: ChatMessage) {
    this.uuid = uuidv4();
    this.chatMessage = chatMessage;
  }
}

export class JoinEvent implements ChatEvent {
  joinNotification: JoinNotification;
  event: "joinNotification" = "joinNotification";
  constructor(joinNotification: JoinNotification) {
    this.joinNotification = joinNotification;
  }
}

export class LikeMsgEvent implements ChatEvent {
  likeMessage: LikeMessage;
  event: "likeMessage" = "likeMessage";
  constructor(likeMessage: LikeMessage) {
    this.likeMessage = likeMessage;
  }
}
