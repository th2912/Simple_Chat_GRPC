"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatServices = void 0;
var chat_room_service_1 = require("./chat-room.service");
var constant_1 = require("../constant");
var chat_events_1 = require("../events/chat-events");
exports.ChatServices = {
    joinRequest: function (call, callback) {
        try {
            var newUser_1 = call.request;
            console.log("newUser", newUser_1);
            if (!newUser_1.name) {
                return callback(null, {
                    subcode: constant_1.CODE.USERNAME_INVALID,
                    message: "Username invalid.",
                });
            }
            var chatRoom = chat_room_service_1.ChatRoom.getInstance();
            var usersInChatRoom = chatRoom.getUsers();
            var isUserExist = usersInChatRoom.find(function (_user) { return _user.name === newUser_1.name; });
            if (isUserExist) {
                return callback(null, {
                    subcode: constant_1.CODE.USER_EXIST,
                    message: "User already exist.",
                });
            }
            var createdUser = new chat_room_service_1.User(newUser_1.name);
            chatRoom.addUser(createdUser);
            var joinNotification = new chat_room_service_1.JoinNoti(newUser_1.name);
            var joinEvent_1 = new chat_events_1.JoinEvent(joinNotification);
            console.log("joinEvent", joinEvent_1);
            chatRoom.observers.forEach(function (_observer) {
                _observer.write(joinEvent_1);
            });
            callback(null, { subcode: constant_1.CODE.SUCCESS, message: "Join success" });
        }
        catch (error) {
            callback(error);
        }
    },
    likeMessage: function (call, callback) {
        try {
            var messageLike = call.request;
            console.log("messageLike", messageLike);
            var message_1 = messageLike.message, userSend = messageLike.userSend;
            if (!(message_1 === null || message_1 === void 0 ? void 0 : message_1.username) || !userSend) {
                return callback(null, {
                    subcode: constant_1.CODE.INVALID_MSG,
                    message: "Invalid",
                });
            }
            if (userSend === message_1.username) {
                return callback(null, {
                    subcode: constant_1.CODE.INVALID_LIKE,
                    message: "Invalid",
                });
            }
            var chatRoom = chat_room_service_1.ChatRoom.getInstance();
            var listMsgOfUser = chatRoom.getMsgListByUser(message_1.username);
            var targetMsg = listMsgOfUser.find(function (item) { return item.uuid === message_1.uuid; });
            console.log("listMsgOfUser", listMsgOfUser);
            console.log("message", message_1);
            if (!targetMsg) {
                return callback(null, {
                    subcode: constant_1.CODE.MESSAGE_NOT_FOUND,
                    message: "message not found",
                });
            }
            console.log("targetMsg", targetMsg);
            if (targetMsg.username && targetMsg.uuid) {
                var likedMsg = chatRoom.likeMsg(targetMsg.username, userSend, targetMsg.uuid);
                console.log("likedMsg", likedMsg);
                if (likedMsg) {
                    console.log("likedMsg", likedMsg);
                    messageLike.message = likedMsg;
                    console.log("messageLike", messageLike);
                    var likeEvent_1 = new chat_events_1.LikeMsgEvent(messageLike);
                    chatRoom.observers.forEach(function (_observer) {
                        _observer.write(likeEvent_1);
                    });
                }
            }
            callback(null, { subcode: constant_1.CODE.SUCCESS, message: "like msg success" });
        }
        catch (error) {
            callback(error);
        }
    },
    sendMsg: function (call, callback) {
        try {
            var chatObj_1 = call.request;
            var chatRoom = chat_room_service_1.ChatRoom.getInstance();
            // console.log("chatObj", chatObj);
            if (!chatObj_1.msg || !chatObj_1.username) {
                return callback(null, {
                    subcode: constant_1.CODE.INVALID_MSG,
                    message: "Invalid message",
                });
            }
            var usersInChatRoom = chatRoom.getUsers();
            var isUserExist = usersInChatRoom.find(function (_user) { return _user.name === chatObj_1.username; });
            if (!isUserExist) {
                return callback(null, {
                    subcode: constant_1.CODE.USER_NOT_EXIST_IN_CHAT_ROOM,
                    message: "Invalid user",
                });
            }
            var listMsgOfUser = chatRoom.getMsgListByUser(chatObj_1.username);
            if (listMsgOfUser.length &&
                listMsgOfUser[listMsgOfUser.length - 1].like < 2) {
                return callback(null, {
                    subcode: constant_1.CODE.NOT_ENOUGH_LIKE,
                    message: "Not enough like to send message",
                });
            }
            var message = new chat_room_service_1.Message(chatObj_1);
            var messageEvent_1 = new chat_events_1.MessageEvent(message);
            chatRoom.observers.forEach(function (_observer) {
                _observer.write(messageEvent_1);
            });
            chatRoom.addMsg(message);
            callback(null, { subcode: constant_1.CODE.SUCCESS, message: "Sent msg success" });
        }
        catch (error) {
            console.log("error", error);
            callback(error);
        }
    },
    receiveEvent: function (call) {
        // console.log("call", call);
        var chatRoom = chat_room_service_1.ChatRoom.getInstance();
        chatRoom.addObserver(call);
    },
    getAllUsers: function (call, callback) {
        var currentUsersInRoom = chat_room_service_1.ChatRoom.getInstance().getUsers();
        callback(null, { users: currentUsersInRoom });
    },
    getAllMessages: function (call, callback) {
        var user = call.request;
        var chatRoom = chat_room_service_1.ChatRoom.getInstance();
        var usersInChatRoom = chatRoom.getUsers();
        var currentUser = usersInChatRoom.find(function (_user) { return user.name === _user.name; });
        if (!currentUser) {
            return callback(null);
        }
        var msgListByUsers = chatRoom.getMsgListAllUsers();
        var allMsg = [];
        for (var key in msgListByUsers) {
            allMsg.push.apply(allMsg, msgListByUsers[key]);
        }
        allMsg.sort(function (_msgA, _msgB) {
            if (_msgA.timestamp && _msgB.timestamp) {
                return Number(_msgA.timestamp) - Number(_msgB.timestamp);
            }
            return 0;
        });
        var result = allMsg.filter(function (_msg) { return _msg.timestamp && _msg.timestamp >= currentUser.timeJoin; });
        callback(null, { msg: result });
    },
};
