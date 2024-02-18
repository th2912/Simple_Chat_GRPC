import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import MessageBubble from './MessageBubble';
import { format } from 'date-fns';

const JoinNoti = ({ username, timestamp }) => {
  return (
    <Flex
      p={4}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Text color={'gray.400'} fontSize={'14px'}>
        {`${username} has joint the chat room`}
      </Text>
      <Text color={'gray.400'} fontSize={'14px'}>
        {format(Number(timestamp), 'HH:mm:ss')}
      </Text>
    </Flex>
  );
};

const MessagesList = props => {
  const { messagesList, currentUser, onHandleLike } = props;
  console.log('messagesList', messagesList);
  return (messagesList || []).map((messageModel, index) => {
    switch (messageModel.eventType) {
      case 1:
        return (
          <MessageBubble
            key={messageModel.uuid}
            messageModel={messageModel}
            onHandleLike={onHandleLike}
            currentUser={currentUser}
          />
        );
      case 2:
        return (
          currentUser !== messageModel.username && (
            <JoinNoti
              key={messageModel.uuid}
              username={messageModel.username}
              timestamp={messageModel.timestamp}
            />
          )
        );
      default:
        return null;
    }
  });
};

export default MessagesList;
