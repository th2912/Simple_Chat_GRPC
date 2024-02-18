import { StarIcon } from '@chakra-ui/icons';
import { Avatar, Box, Divider, Flex, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { format } from 'date-fns';
const MessageBubble = props => {
  const { currentUser, messageModel, onHandleLike } = props;
  const { uuid, msg, timestamp, username, like, eventType } = messageModel;
  const isMine = currentUser === username;
  // console.log('messageModel', messageModel);

  return (
    <Flex
      color={'black'}
      maxWidth="80%"
      my={2}
      py={2}
      px={3}
      gap={2}
      alignSelf={isMine ? 'flex-end' : 'flex-start'}
      flexDirection={isMine ? 'row-reverse' : 'row'}
    >
      {!isMine && <Avatar size="sm" name={username} />}
      <Flex
        flexDirection={'column'}
        maxW={'60%'}
        minW={'80px'}
        pos={'relative'}
      >
        <Flex
          alignItems={isMine ? 'flex-end' : 'flex-start'}
          flexDirection={'column'}
          mb={1}
          backgroundColor={'#F2F2F7'}
          p={'4px 8px 4px 8px'}
          borderRadius={6}
        >
          {!isMine && (
            <Text fontSize="sm" fontWeight="bold">
              {username}
            </Text>
          )}

          <Text
            fontSize="sm"
            color={'##2C2C2E'}
            textAlign={'start'}
            noOfLines={1}
            maxW={'100%'} // add this line
            overflow={'none'}
            display={''}
          >
            {msg.replace(/\\n/g, '\n')}
          </Text>
          <Text
            fontSize="sm"
            alignSelf="flex-end"
            color={'#666668'}
            wordBreak={'break-all'}
          >
            {format(Number(timestamp), 'HH:mm:ss')}
          </Text>
        </Flex>
        <Flex pos={'absolute'} bottom={'-10px'}>
          {like > 3 ? (
            <Flex gap={1} justifyContent={'center'} alignItems={'center'}>
              {Array.from({ length: 3 }).map(() => (
                <StarIcon
                  fillOpacity={'20%'}
                  boxSize={3}
                  color={'yellow.700'}
                />
              ))}
              <Text fontSize={'12px'} color={'gray.500'}>{`+${like - 3}`}</Text>
            </Flex>
          ) : (
            Array.from({ length: like }).map(() => (
              <StarIcon fillOpacity={'20%'} boxSize={3} color={'yellow.700'} />
            ))
          )}
        </Flex>
      </Flex>

      {!isMine && (
        <IconButton
          mt={'15px'}
          variant="outline"
          colorScheme="telegram"
          onClick={() => onHandleLike({ uuid, msg, timestamp, username, like })}
          icon={<StarIcon />}
        />
      )}
    </Flex>
  );
};

export default MessageBubble;
