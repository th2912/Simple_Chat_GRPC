import { Avatar, Box, Flex } from '@chakra-ui/react';
import React from 'react';

const AvatarGroup = ({ userList }) => {
  console.log('userList', userList);
  return (
    <Flex>
      {(userList || []).map((_user, index) => {
        const props =
          index !== 0
            ? {
                pos: 'relative',
                border: '1px solid white',
                left: `${index * -10}px`,
              }
            : { border: '1px solid white' };
        if (index === 3) {
          return (
            <Avatar
              size="xs"
              name={`+${
                userList.length ? userList.length - index + 1 : 'More'
              }`}
              {...props}
            />
          );
        } else if (index > 3) {
          return null;
        }
        return <Avatar size="xs" name={_user} {...props} />;
      })}
    </Flex>
  );
};

export default AvatarGroup;
