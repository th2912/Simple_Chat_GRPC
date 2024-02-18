"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var grpc = __importStar(require("@grpc/grpc-js"));
var protoLoader = __importStar(require("@grpc/proto-loader"));
var chat_grpc_service_1 = require("./services/chat-grpc.service");
var PORT = 8082;
var PROTO_FILE = "./proto/chat.proto";
var packageDef = protoLoader.loadSync(path_1.default.resolve(__dirname, PROTO_FILE));
var grpcObj = grpc.loadPackageDefinition(packageDef);
var chatPackage = grpcObj.chatPackage;
function main() {
    var server = getServer();
    server.bindAsync("0.0.0.0:".concat(PORT), grpc.ServerCredentials.createInsecure(), function (err, port) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Server as started on port ".concat(port));
        server.start();
    });
}
function getServer() {
    var server = new grpc.Server();
    server.addService(chatPackage.ChatService.service, chat_grpc_service_1.ChatServices);
    return server;
}
main();
