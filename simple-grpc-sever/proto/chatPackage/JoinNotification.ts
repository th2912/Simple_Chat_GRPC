// Original file: proto/chat.proto

import type { Long } from '@grpc/proto-loader';

export interface JoinNotification {
  'uuid'?: (string);
  'username'?: (string);
  'timestamp'?: (number | string | Long);
}

export interface JoinNotification__Output {
  'uuid': (string);
  'username': (string);
  'timestamp': (Long);
}
