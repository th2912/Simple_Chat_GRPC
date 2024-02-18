import {
  Flex,
  Box,
  useColorMode,
  Avatar,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import ChatBox from '../components/ChatBox';
import MessagesList from '../components/MessagesList';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {
  LikeMessage,
  Empty,
  MessagePayload,
  ChatMessage,
  User,
} from '../../../chat_pb';
import useChatStreamManager, {
  ChatStreamManager,
  client,
} from '../../../grpcClient';
import { Context } from '../../../common/context/Context';
import { CODE } from '../../../common/constant';
import { isEmpty } from 'lodash';

export const ChatRoom = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messagesList, setMessagesList] = useState([]);
  const [user, setUser] = useContext(Context);
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(null);
  const toast = useToast();

  const [event] = useChatStreamManager(client);

  useEffect(() => {
    const empty = new Empty();
    client.getAllUsers(empty, null, (err, res) => {
      if (!err) {
        const usersList = res.getUsersList();
        setUserList(usersList.map(_user => _user.getName()));
      }
    });
    if (user) {
      const currentUser = new User();
      currentUser.setName(user);
      client.getAllMessages(currentUser, null, (err, res) => {
        if (!err) {
          const msgList = res.getMsgList();
          const msgRawList = msgList.map(_msg => {
            return {
              eventType: 1,
              uuid: _msg.getUuid(),
              username: _msg.getUsername(),
              msg: _msg.getMsg(),
              timestamp: _msg.getTimestamp(),
              like: _msg.getLike(),
            };
          });
          setMessagesList(msgRawList);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(event)) {
      const { eventType, data: msg } = event;
      if (eventType === 3) {
        const updatedMsgList = messagesList.map(_msg => {
          if (_msg.uuid === msg.uuid) {
            return { ..._msg, ...msg };
          }
          return _msg;
        });

        setMessagesList(updatedMsgList);
        return;
      }
      if (event && msg) {
        if (eventType === 2) {
          const empty = new Empty();
          client.getAllUsers(empty, null, (err, res) => {
            if (!err) {
              const usersList = res.getUsersList();
              setUserList(usersList.map(_user => _user.getName()));
            }
          });
        }
        setMessagesList(prev => [...prev, { ...msg, eventType }]);
      }
    }
  }, [event]);

  const onMessaging = e => {
    if (error) {
      setError(null);
    }
    setInputMessage(e.target.value);
  };
  const onSendMsg = () => {
    const msg = new MessagePayload();
    msg.setUsername(user);
    msg.setMsg(inputMessage);
    client.sendMsg(msg, null, (err, res) => {
      const message = res.getMessage();
      const subcode = res.getSubcode();
      if (subcode && subcode !== CODE.SUCCESS) {
        setError(message);
        toast({
          status: 'error',
          title: message || 'error',
        });
        return;
      }
      setError(null);
      setInputMessage('');
    });
  };
  const onHandleLike = ({ uuid, msg, timestamp, username, like }) => {
    if (!user) return;
    const targetMsg = new ChatMessage();
    targetMsg.setUuid(uuid);
    targetMsg.setMsg(msg);
    targetMsg.setTimestamp(timestamp);
    targetMsg.setUsername(username);
    targetMsg.setLike(like);

    const likedMsg = new LikeMessage();
    likedMsg.setMessage(targetMsg);
    likedMsg.setUsersend(user);

    client.likeMessage(likedMsg, null, (err, res) => {
      const message = res.getMessage();
      const subcode = res.getSubcode();
      if (subcode && subcode !== CODE.SUCCESS) {
        setError(message);
        toast({
          status: 'error',
          title: message || 'error',
        });
        return;
      }
      setError(null);
    });

    // console.log('uuid', uuid);
  };
  return (
    <Flex justifyContent="center" alignItems="center" h={'90vh'}>
      <Flex
        w={'90%'}
        h={'90%'}
        borderWidth={2}
        flexDirection="column"
        backgroundColor={'white'}
        borderRadius={8}
        position={'relative'}
      >
        <Header userList={userList} />
        <PerfectScrollbar
          style={{
            height: 'calc(100% - 174px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <MessagesList
            messagesList={messagesList}
            currentUser={user}
            onHandleLike={onHandleLike}
          />
        </PerfectScrollbar>
        <ChatBox
          error={error}
          onMessaging={onMessaging}
          message={inputMessage}
          onSendMsg={onSendMsg}
        />
      </Flex>
    </Flex>
  );
};
