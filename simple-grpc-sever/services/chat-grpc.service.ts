import {
  ServerWritableStream,
  ServerUnaryCall,
  sendUnaryData,
  StatusObject,
} from "@grpc/grpc-js";
import { ChatServiceHandlers } from "../proto/chatPackage/ChatService";

import {
  ChatRoom,
  Message,
  JoinNoti,
  User as RoomUser,
} from "./chat-room.service";
import { CODE } from "../constant";
import { User } from "../proto/chatPackage/User";
import { ChatMessage } from "../proto/chatPackage/ChatMessage";
import { Empty } from "../proto/chatPackage/Empty";
import { ChatEvent } from "../proto/chatPackage/ChatEvent";
import { UserList } from "../proto/chatPackage/UserList";
import { JoinNotification } from "../proto/chatPackage/JoinNotification";
import { JoinEvent, LikeMsgEvent, MessageEvent } from "../events/chat-events";
import { ResponseEvent } from "../proto/chatPackage/ResponseEvent";
import { LikeMessage } from "../proto/chatPackage/LikeMessage";
import { MessageList } from "../proto/chatPackage/MessageList";
import { MessagePayload } from "../proto/chatPackage/MessagePayload";

export const ChatServices: ChatServiceHandlers = {
  joinRequest(
    call: ServerUnaryCall<User, ResponseEvent>,
    callback: sendUnaryData<ResponseEvent>
  ) {
    try {
      const newUser = call.request;
      console.log("newUser", newUser);
      if (!newUser.name) {
        return callback(null, {
          subcode: CODE.USERNAME_INVALID,
          message: "Username invalid.",
        });
      }

      const chatRoom = ChatRoom.getInstance();
      const usersInChatRoom = chatRoom.getUsers();
      const isUserExist = usersInChatRoom.find(
        (_user) => _user.name === newUser.name
      );
      if (isUserExist) {
        return callback(null, {
          subcode: CODE.USER_EXIST,
          message: "User already exist.",
        });
      }
      const createdUser = new RoomUser(newUser.name);

      chatRoom.addUser(createdUser);

      const joinNotification = new JoinNoti(newUser.name);
      const joinEvent = new JoinEvent(joinNotification);
      console.log("joinEvent", joinEvent);

      chatRoom.observers.forEach((_observer) => {
        _observer.write(joinEvent);
      });
      callback(null, { subcode: CODE.SUCCESS, message: "Join success" });
    } catch (error) {
      callback(error as Partial<StatusObject>);
    }
  },

  likeMessage(
    call: ServerUnaryCall<LikeMessage, ResponseEvent>,
    callback: sendUnaryData<ResponseEvent>
  ) {
    try {
      const messageLike = call.request;
      console.log("messageLike", messageLike);
      const { message, userSend } = messageLike;
      if (!message?.username || !userSend) {
        return callback(null, {
          subcode: CODE.INVALID_MSG,
          message: "Invalid",
        });
      }
      if (userSend === message.username) {
        return callback(null, {
          subcode: CODE.INVALID_LIKE,
          message: "Invalid",
        });
      }
      const chatRoom = ChatRoom.getInstance();
      const listMsgOfUser = chatRoom.getMsgListByUser(message.username);
      const targetMsg = listMsgOfUser.find(
        (item) => item.uuid === message.uuid
      );
      console.log("listMsgOfUser", listMsgOfUser);
      console.log("message", message);
      if (!targetMsg) {
        return callback(null, {
          subcode: CODE.MESSAGE_NOT_FOUND,
          message: "message not found",
        });
      }
      console.log("targetMsg", targetMsg);
      if (targetMsg.username && targetMsg.uuid) {
        const likedMsg = chatRoom.likeMsg(
          targetMsg.username,
          userSend,
          targetMsg.uuid
        );
        console.log("likedMsg", likedMsg);

        if (likedMsg) {
          console.log("likedMsg", likedMsg);
          messageLike.message = likedMsg;
          console.log("messageLike", messageLike);
          const likeEvent = new LikeMsgEvent(messageLike);

          chatRoom.observers.forEach((_observer) => {
            _observer.write(likeEvent);
          });
        }
      }

      callback(null, { subcode: CODE.SUCCESS, message: "like msg success" });
    } catch (error) {
      callback(error as Partial<StatusObject>);
    }
  },

  sendMsg(
    call: ServerUnaryCall<MessagePayload, ResponseEvent>,
    callback: sendUnaryData<ResponseEvent>
  ) {
    try {
      const chatObj = call.request;
      const chatRoom = ChatRoom.getInstance();
      // console.log("chatObj", chatObj);

      if (!chatObj.msg || !chatObj.username) {
        return callback(null, {
          subcode: CODE.INVALID_MSG,
          message: "Invalid message",
        });
      }

      const usersInChatRoom = chatRoom.getUsers();
      const isUserExist = usersInChatRoom.find(
        (_user) => _user.name === chatObj.username
      );

      if (!isUserExist) {
        return callback(null, {
          subcode: CODE.USER_NOT_EXIST_IN_CHAT_ROOM,
          message: "Invalid user",
        });
      }

      const listMsgOfUser = chatRoom.getMsgListByUser(chatObj.username);

      if (
        listMsgOfUser.length &&
        listMsgOfUser[listMsgOfUser.length - 1].like < 2
      ) {
        return callback(null, {
          subcode: CODE.NOT_ENOUGH_LIKE,
          message: "Not enough like to send message",
        });
      }

      const message = new Message(chatObj);

      const messageEvent = new MessageEvent(message);

      chatRoom.observers.forEach((_observer) => {
        _observer.write(messageEvent);
      });

      chatRoom.addMsg(message);

      callback(null, { subcode: CODE.SUCCESS, message: "Sent msg success" });
    } catch (error) {
      console.log("error", error);
      callback(error as Partial<StatusObject>);
    }
  },

  receiveEvent(call: ServerWritableStream<Empty, ChatEvent>) {
    // console.log("call", call);
    const chatRoom = ChatRoom.getInstance();
    chatRoom.addObserver(call);
  },

  getAllUsers(
    call: ServerUnaryCall<Empty, UserList>,
    callback: sendUnaryData<UserList>
  ) {
    const currentUsersInRoom = ChatRoom.getInstance().getUsers();
    callback(null, { users: currentUsersInRoom });
  },

  getAllMessages(
    call: ServerUnaryCall<User, MessageList>,
    callback: sendUnaryData<MessageList>
  ) {
    const user = call.request;
    const chatRoom = ChatRoom.getInstance();

    const usersInChatRoom = chatRoom.getUsers();

    const currentUser = usersInChatRoom.find(
      (_user) => user.name === _user.name
    );
    if (!currentUser) {
      return callback(null);
    }

    const msgListByUsers = chatRoom.getMsgListAllUsers();

    const allMsg: ChatMessage[] = [];

    for (const key in msgListByUsers) {
      allMsg.push(...msgListByUsers[key]);
    }

    allMsg.sort((_msgA, _msgB) => {
      if (_msgA.timestamp && _msgB.timestamp) {
        return Number(_msgA.timestamp) - Number(_msgB.timestamp);
      }
      return 0;
    });

    const result = allMsg.filter(
      (_msg) => _msg.timestamp && _msg.timestamp >= currentUser.timeJoin
    );
    callback(null, { msg: result });
  },
};
