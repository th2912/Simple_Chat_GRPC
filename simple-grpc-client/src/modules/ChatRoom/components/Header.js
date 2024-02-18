import React, { useContext, useState } from 'react';
import { Flex, Box, IconButton } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import AvatarGroup from './AvatarGroup';
import { Context } from '../../../common/context/Context';

export const Header = props => {
  const { userList } = props;
  const [user, setUser] = useContext(Context);
  const handleOutRoom = () => {
    localStorage.removeItem('user');
    setUser('');
  };
  return (
    <Flex
      height={'68px'}
      color={'black'}
      justifyContent="space-between"
      alignItems="center"
      boxShadow={'inset 0px -1px 0px #E5E5EA'}
      p={13}
    >
      <AvatarGroup userList={userList} />
      <Box>Distributed System</Box>
      <Box>
        <IconButton icon={<ArrowForwardIcon />} onClick={handleOutRoom} />
      </Box>
    </Flex>
  );
};
