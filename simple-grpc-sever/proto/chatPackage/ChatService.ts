// Original file: proto/chat.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ChatEvent as _chatPackage_ChatEvent, ChatEvent__Output as _chatPackage_ChatEvent__Output } from '../chatPackage/ChatEvent';
import type { Empty as _chatPackage_Empty, Empty__Output as _chatPackage_Empty__Output } from '../chatPackage/Empty';
import type { LikeMessage as _chatPackage_LikeMessage, LikeMessage__Output as _chatPackage_LikeMessage__Output } from '../chatPackage/LikeMessage';
import type { MessageList as _chatPackage_MessageList, MessageList__Output as _chatPackage_MessageList__Output } from '../chatPackage/MessageList';
import type { MessagePayload as _chatPackage_MessagePayload, MessagePayload__Output as _chatPackage_MessagePayload__Output } from '../chatPackage/MessagePayload';
import type { ResponseEvent as _chatPackage_ResponseEvent, ResponseEvent__Output as _chatPackage_ResponseEvent__Output } from '../chatPackage/ResponseEvent';
import type { User as _chatPackage_User, User__Output as _chatPackage_User__Output } from '../chatPackage/User';
import type { UserList as _chatPackage_UserList, UserList__Output as _chatPackage_UserList__Output } from '../chatPackage/UserList';

export interface ChatServiceClient extends grpc.Client {
  getAllMessages(argument: _chatPackage_User, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_MessageList__Output>): grpc.ClientUnaryCall;
  getAllMessages(argument: _chatPackage_User, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_MessageList__Output>): grpc.ClientUnaryCall;
  getAllMessages(argument: _chatPackage_User, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_MessageList__Output>): grpc.ClientUnaryCall;
  getAllMessages(argument: _chatPackage_User, callback: grpc.requestCallback<_chatPackage_MessageList__Output>): grpc.ClientUnaryCall;
  getAllMessages(argument: _chatPackage_User, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_MessageList__Output>): grpc.ClientUnaryCall;
  getAllMessages(argument: _chatPackage_User, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_MessageList__Output>): grpc.ClientUnaryCall;
  getAllMessages(argument: _chatPackage_User, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_MessageList__Output>): grpc.ClientUnaryCall;
  getAllMessages(argument: _chatPackage_User, callback: grpc.requestCallback<_chatPackage_MessageList__Output>): grpc.ClientUnaryCall;
  
  getAllUsers(argument: _chatPackage_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_UserList__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _chatPackage_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_UserList__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _chatPackage_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_UserList__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _chatPackage_Empty, callback: grpc.requestCallback<_chatPackage_UserList__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _chatPackage_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_UserList__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _chatPackage_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_UserList__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _chatPackage_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_UserList__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _chatPackage_Empty, callback: grpc.requestCallback<_chatPackage_UserList__Output>): grpc.ClientUnaryCall;
  
  joinRequest(argument: _chatPackage_User, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  joinRequest(argument: _chatPackage_User, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  joinRequest(argument: _chatPackage_User, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  joinRequest(argument: _chatPackage_User, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  joinRequest(argument: _chatPackage_User, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  joinRequest(argument: _chatPackage_User, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  joinRequest(argument: _chatPackage_User, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  joinRequest(argument: _chatPackage_User, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  
  likeMessage(argument: _chatPackage_LikeMessage, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  likeMessage(argument: _chatPackage_LikeMessage, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  likeMessage(argument: _chatPackage_LikeMessage, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  likeMessage(argument: _chatPackage_LikeMessage, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  likeMessage(argument: _chatPackage_LikeMessage, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  likeMessage(argument: _chatPackage_LikeMessage, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  likeMessage(argument: _chatPackage_LikeMessage, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  likeMessage(argument: _chatPackage_LikeMessage, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  
  receiveEvent(argument: _chatPackage_Empty, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_ChatEvent__Output>;
  receiveEvent(argument: _chatPackage_Empty, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_ChatEvent__Output>;
  receiveEvent(argument: _chatPackage_Empty, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_ChatEvent__Output>;
  receiveEvent(argument: _chatPackage_Empty, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_ChatEvent__Output>;
  
  sendMsg(argument: _chatPackage_MessagePayload, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  sendMsg(argument: _chatPackage_MessagePayload, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  sendMsg(argument: _chatPackage_MessagePayload, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  sendMsg(argument: _chatPackage_MessagePayload, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  sendMsg(argument: _chatPackage_MessagePayload, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  sendMsg(argument: _chatPackage_MessagePayload, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  sendMsg(argument: _chatPackage_MessagePayload, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  sendMsg(argument: _chatPackage_MessagePayload, callback: grpc.requestCallback<_chatPackage_ResponseEvent__Output>): grpc.ClientUnaryCall;
  
}

export interface ChatServiceHandlers extends grpc.UntypedServiceImplementation {
  getAllMessages: grpc.handleUnaryCall<_chatPackage_User__Output, _chatPackage_MessageList>;
  
  getAllUsers: grpc.handleUnaryCall<_chatPackage_Empty__Output, _chatPackage_UserList>;
  
  joinRequest: grpc.handleUnaryCall<_chatPackage_User__Output, _chatPackage_ResponseEvent>;
  
  likeMessage: grpc.handleUnaryCall<_chatPackage_LikeMessage__Output, _chatPackage_ResponseEvent>;
  
  receiveEvent: grpc.handleServerStreamingCall<_chatPackage_Empty__Output, _chatPackage_ChatEvent>;
  
  sendMsg: grpc.handleUnaryCall<_chatPackage_MessagePayload__Output, _chatPackage_ResponseEvent>;
  
}

export interface ChatServiceDefinition extends grpc.ServiceDefinition {
  getAllMessages: MethodDefinition<_chatPackage_User, _chatPackage_MessageList, _chatPackage_User__Output, _chatPackage_MessageList__Output>
  getAllUsers: MethodDefinition<_chatPackage_Empty, _chatPackage_UserList, _chatPackage_Empty__Output, _chatPackage_UserList__Output>
  joinRequest: MethodDefinition<_chatPackage_User, _chatPackage_ResponseEvent, _chatPackage_User__Output, _chatPackage_ResponseEvent__Output>
  likeMessage: MethodDefinition<_chatPackage_LikeMessage, _chatPackage_ResponseEvent, _chatPackage_LikeMessage__Output, _chatPackage_ResponseEvent__Output>
  receiveEvent: MethodDefinition<_chatPackage_Empty, _chatPackage_ChatEvent, _chatPackage_Empty__Output, _chatPackage_ChatEvent__Output>
  sendMsg: MethodDefinition<_chatPackage_MessagePayload, _chatPackage_ResponseEvent, _chatPackage_MessagePayload__Output, _chatPackage_ResponseEvent__Output>
}
