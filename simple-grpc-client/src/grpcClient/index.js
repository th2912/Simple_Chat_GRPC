import { useEffect, useState } from 'react';
import { ChatServiceClient } from '../chat_grpc_web_pb';
import { Empty, MessagePayload } from '../chat_pb';

export const client = new ChatServiceClient(
  'http://localhost:8080',
  null,
  null
);

export default function useChatStreamManager(grpcClient) {
  const [chatManager, setChatManager] = useState(null);
  const [event, setEvent] = useState({
    eventType: null,
    data: null,
  });

  useEffect(() => {
    const empty = new Empty();

    const chatStream = grpcClient.receiveEvent(empty, {});

    setChatManager(chatStream);

    chatStream.on('data', response => {
      const eventType = response.getEventCase();
      console.log('response', response);
      if (eventType === 1) {
        const messageModel = response.getChatmessage();
        const message = {
          uuid: messageModel.getUuid(),
          username: messageModel.getUsername(),
          msg: messageModel.getMsg(),
          timestamp: messageModel.getTimestamp(),
          like: messageModel.getLike(),
        };
        setEvent({
          eventType,
          data: message,
        });
      } else if (eventType === 2) {
        const joinNoti = response.getJoinnotification();
        setEvent({
          eventType,
          data: {
            uuid: joinNoti.getUuid(),
            username: joinNoti.getUsername(),
            timestamp: joinNoti.getTimestamp(),
          },
        });
      } else if (eventType === 3) {
        const likedMsg = response.getLikemessage();
        const messageModel = likedMsg.getMessage();
        // const messageModel = msgData.getChatmessage();
        const message = {
          uuid: messageModel.getUuid(),
          username: messageModel.getUsername(),
          msg: messageModel.getMsg(),
          timestamp: messageModel.getTimestamp(),
          like: messageModel.getLike(),
        };
        console.log('message', message);
        setEvent({
          eventType,
          data: message,
        });
      }
    });
    chatStream.on('status', function (status) {
      console.log(status.code, status.details, status.metadata);
    });
    chatStream.on('end', () => {
      console.log('Stream ended.');
    });

    return () => {};
  }, []);

  return [event];
}
