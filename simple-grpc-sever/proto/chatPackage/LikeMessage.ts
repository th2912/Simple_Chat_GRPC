// Original file: proto/chat.proto

import type { ChatMessage as _chatPackage_ChatMessage, ChatMessage__Output as _chatPackage_ChatMessage__Output } from '../chatPackage/ChatMessage';

export interface LikeMessage {
  'userSend'?: (string);
  'message'?: (_chatPackage_ChatMessage | null);
}

export interface LikeMessage__Output {
  'userSend': (string);
  'message': (_chatPackage_ChatMessage__Output | null);
}
