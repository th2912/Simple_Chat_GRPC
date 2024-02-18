"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeMsgEvent = exports.JoinEvent = exports.MessageEvent = void 0;
var uuid_1 = require("uuid");
var MessageEvent = /** @class */ (function () {
    function MessageEvent(chatMessage) {
        this.event = "chatMessage";
        this.uuid = (0, uuid_1.v4)();
        this.chatMessage = chatMessage;
    }
    return MessageEvent;
}());
exports.MessageEvent = MessageEvent;
var JoinEvent = /** @class */ (function () {
    function JoinEvent(joinNotification) {
        this.event = "joinNotification";
        this.joinNotification = joinNotification;
    }
    return JoinEvent;
}());
exports.JoinEvent = JoinEvent;
var LikeMsgEvent = /** @class */ (function () {
    function LikeMsgEvent(likeMessage) {
        this.event = "likeMessage";
        this.likeMessage = likeMessage;
    }
    return LikeMsgEvent;
}());
exports.LikeMsgEvent = LikeMsgEvent;
