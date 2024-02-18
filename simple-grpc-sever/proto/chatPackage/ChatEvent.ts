// Original file: proto/chat.proto

import type { ChatMessage as _chatPackage_ChatMessage, ChatMessage__Output as _chatPackage_ChatMessage__Output } from '../chatPackage/ChatMessage';
import type { JoinNotification as _chatPackage_JoinNotification, JoinNotification__Output as _chatPackage_JoinNotification__Output } from '../chatPackage/JoinNotification';
import type { LikeMessage as _chatPackage_LikeMessage, LikeMessage__Output as _chatPackage_LikeMessage__Output } from '../chatPackage/LikeMessage';

export interface ChatEvent {
  'chatMessage'?: (_chatPackage_ChatMessage | null);
  'joinNotification'?: (_chatPackage_JoinNotification | null);
  'likeMessage'?: (_chatPackage_LikeMessage | null);
  'event'?: "chatMessage"|"joinNotification"|"likeMessage";
}

export interface ChatEvent__Output {
  'chatMessage'?: (_chatPackage_ChatMessage__Output | null);
  'joinNotification'?: (_chatPackage_JoinNotification__Output | null);
  'likeMessage'?: (_chatPackage_LikeMessage__Output | null);
}
