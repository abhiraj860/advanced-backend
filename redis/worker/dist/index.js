"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        client.connect();
        while (1) {
            const resp = yield client.brPop("submissions", 0);
            console.log(resp);
            // actually run the users code
            yield new Promise(r => setTimeout(r, 1000));
            // send it to the pubsub
            console.log('Processed user submission');
        }
    });
}
main();
