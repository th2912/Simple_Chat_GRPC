"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoom = exports.User = exports.JoinNoti = exports.Message = void 0;
var uuid_1 = require("uuid");
var Message = /** @class */ (function () {
    function Message(msgPayload) {
        this.uuid = (0, uuid_1.v4)();
        this.timestamp = Date.now();
        this.like = 0;
        this.userLike = [];
        this.username = msgPayload.username;
        this.msg = msgPayload.msg;
    }
    return Message;
}());
exports.Message = Message;
var JoinNoti = /** @class */ (function () {
    function JoinNoti(userName) {
        this.uuid = (0, uuid_1.v4)();
        this.timestamp = Date.now();
        this.username = userName;
    }
    return JoinNoti;
}());
exports.JoinNoti = JoinNoti;
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
        this.timeJoin = Date.now();
    }
    return User;
}());
exports.User = User;
var ChatRoom = /** @class */ (function () {
    function ChatRoom() {
        this.users = [];
        this.observers = [];
        this.usersMsg = {};
    }
    ChatRoom.getInstance = function () {
        if (!ChatRoom.instance) {
            ChatRoom.instance = new ChatRoom();
        }
        return ChatRoom.instance;
    };
    ChatRoom.prototype.addUser = function (user) {
        this.usersMsg[user.name] = [];
        console.log("this.usersMsg", this.usersMsg);
        this.users.push(user);
    };
    ChatRoom.prototype.addMsg = function (msg) {
        if (msg.username) {
            console.log("msg", msg);
            console.log("this.usersMsg[msg.username]", this.usersMsg[msg.username]);
            if (this.usersMsg[msg.username].length) {
                this.usersMsg[msg.username].push(msg);
            }
            else {
                this.usersMsg[msg.username] = [msg];
            }
        }
        console.log("this.usersMsg", this.usersMsg);
    };
    ChatRoom.prototype.addObserver = function (observer) {
        this.observers.push(observer);
    };
    ChatRoom.prototype.likeMsg = function (user, userSend, messageId) {
        var likeMsg;
        for (var _i = 0, _a = this.usersMsg[user]; _i < _a.length; _i++) {
            var _msg = _a[_i];
            if (_msg.uuid === messageId) {
                if (_msg.userLike.length) {
                    var isExist = _msg.userLike.findIndex(function (_uname) { return _uname === userSend; });
                    if (isExist !== -1) {
                        _msg.userLike.splice(isExist, 1);
                    }
                    else {
                        _msg.userLike.push(userSend);
                    }
                }
                else {
                    _msg.userLike = [userSend];
                }
                _msg.like = _msg.userLike.length;
                likeMsg = _msg;
            }
        }
        return likeMsg;
    };
    ChatRoom.prototype.getMsgListAllUsers = function () {
        return this.usersMsg;
    };
    ChatRoom.prototype.getMsgListByUser = function (userName) {
        console.log("userName", userName);
        console.log("this.usersMsg[userName]", this.usersMsg);
        return this.usersMsg[userName];
    };
    ChatRoom.prototype.getUsers = function () {
        return this.users;
    };
    return ChatRoom;
}());
exports.ChatRoom = ChatRoom;
