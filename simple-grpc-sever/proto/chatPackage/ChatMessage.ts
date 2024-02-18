// Original file: proto/chat.proto

import type { Long } from '@grpc/proto-loader';

export interface ChatMessage {
  'uuid'?: (string);
  'username'?: (string);
  'msg'?: (string);
  'timestamp'?: (number | string | Long);
  'like'?: (number);
}

export interface ChatMessage__Output {
  'uuid': (string);
  'username': (string);
  'msg': (string);
  'timestamp': (Long);
  'like': (number);
}
