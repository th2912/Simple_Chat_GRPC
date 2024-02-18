import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Input, Textarea } from '@chakra-ui/react';
import React, { useEffect } from 'react';

const ChatBox = props => {
  const { message, onMessaging, onSendMsg, error } = props;

  const handleKeyDown = e => {
    const { key } = e;
    if (key === 'Enter' && !e.shiftKey) {
      onSendMsg && onSendMsg();
      e.preventDefault();
    }
  };

  return (
    <Flex
      position={'absolute'}
      gap={1}
      bottom={0}
      align="center"
      justifyContent={'center'}
      width={'100%'}
      boxShadow={'inset 0px 1px 0px #E5E5EA'}
      p={13}
      color={'black'}
    >
      <Textarea
        resize={'none'}
        placeholder="Here is a sample placeholder"
        value={message}
        onChange={onMessaging}
        onKeyDown={handleKeyDown}
        isInvalid={error}
      />
      <IconButton icon={<ArrowForwardIcon />} onClick={onSendMsg} />
    </Flex>
  );
};

export default ChatBox;
