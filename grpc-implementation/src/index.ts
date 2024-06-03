import path from 'path';
import * as grpc from '@grpc/grpc-js';
import  { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js"
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './generated/a';

const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../src/a.proto'));


const personProto = (grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;

const PERSONS = [
    {
        name: "Abhiraj",
        age: 45
    },
    {
      name: "raman",
      age: 45
    },
];

// @ts-ignore
function addPerson(call, callback) {
  console.log(call)
    let person = {
      name: call.request.name,
      age: call.request.age
    }
    PERSONS.push(person);
    callback(null, person)
}

// @ts-ignore
function getPersonByName(call, callback) {
    const personName = call.request.name;
    const p = PERSONS.find(x=> x.name === personName);
    callback(null, p);
}


const server = new grpc.Server();

server.addService((personProto.AddressBookService).service, { addPerson: addPerson, getPersonByName: getPersonByName });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
     server.start();
});