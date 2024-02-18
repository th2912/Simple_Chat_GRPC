import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { ChatRoom } from '../../ChatRoom/containers';
import { useHistory } from 'react-router-dom';
import { Context } from '../../../common/context/Context';
// import { ChatServiceClient } from '../../../chat_grpc_web_pb';
import { User } from '../../../chat_pb';
import { CODE } from '../../../common/constant';
import { client } from '../../../grpcClient';

const AccessForm = () => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);

  const toast = useToast();
  const [user, setUser] = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    console.log('user', user);
    if (user) {
      history.push('/');
    }
  }, []);

  const handleChange = e => {
    if (error) {
      setError(null);
    }
    setUserName(e.target.value);
  };
  const handleSubmit = () => {
    // client.join({name:userName}, null, (err, response) => {
    //   console.log('err', err);
    //   console.log('response', response);
    // });
    const userReq = new User();
    // userReq.name = userName;
    // console.log('user', userReq);
    userReq.setName(userName);

    client.joinRequest(userReq, null, (err, response) => {
      console.log('response', response);
      const message = response.getMessage();
      const subcode = response.getSubcode();
      console.log('response', subcode, message);
      if (err || (subcode && subcode !== CODE.SUCCESS)) {
        setError(message || 'error');
        toast({
          title: message || 'Something went wrong',
          status: 'error',
        });
        return;
      }
      setError(null);

      localStorage.setItem('user', userName);
      setUser(userName);
      history.push('/');
    });
  };

  return (
    <Flex justifyContent="center" alignItems="center" height="90vh">
      <Flex>
        <FormControl
          display={'flex'}
          flexDirection={'column'}
          isInvalid={error}
        >
          <FormLabel>Username</FormLabel>
          <Flex gap={2} justifyContent={'center'} alignItems={'center'}>
            <Input type="text" onChange={handleChange} value={userName} />
            <IconButton icon={<ArrowForwardIcon />} onClick={handleSubmit} />
          </Flex>

          <FormHelperText alignSelf={'flex-start'}>
            Enter your username
          </FormHelperText>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default AccessForm;
