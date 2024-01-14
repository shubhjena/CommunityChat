import { Kafka, Producer } from "kafkajs";
import fs from "fs";
import path from "path";
import prismaClient from "./prisma";

const kafka = new Kafka({
    brokers: ["kafka-1f216242-shubh-5050.a.aivencloud.com:27683"],
    ssl:{
        ca: [fs.readFileSync(path.resolve('./ca.pem'), "utf-8")],
    },
    sasl:{
        username: 'avnadmin',
        password: 'AVNS_5sdKYV5s0wq8DpwiBtq',
        mechanism: 'plain',
    }
  })

let producer: null | Producer = null;
export async function createProducer() {
    if(producer) return producer;
    const _producer = kafka.producer()
    await _producer.connect();
    producer = _producer;
    return producer;
  }
export async function produceMessage(message:string) {
    const producer = await createProducer();
    await producer.send({
        messages: [{key: `message-${Date.now()}`, value: message}],
        topic:"MESSAGES",
    });
    return true;
}

export async function startMessageConsumer() {  
    const consumer = kafka.consumer({groupId:  "default"});
    await consumer.connect();
    await consumer.subscribe({topic: "MESSAGES", fromBeginning: true});

    await consumer.run({
        autoCommit: true,
        eachMessage: async ({message, pause}) => {
            if (!message.value) return;
            try{
                const messageData = JSON.parse(message.value.toString());
                console.log('~~~~~~~~~~Displaying message data~~~~~~~~~~~~~~~\n: ',messageData.message.chatId,'\n~~~~~~~~~~~~~~~~END~~~~~~~~~~~~~~~~');
                await prismaClient.message.create({
                    data:{
                        text: messageData.message.text, 
                        sender: messageData.message.sender,
                        createdAt: new Date(messageData.message.sendTime),
                        chatId : messageData.message.chatId,
                    },
                })
            } catch(err){
                console.log('Something went wrong');
                pause()
                setTimeout(() => {
                    consumer.resume([{topic: "MESSAGES"}])
                }, 60*1000)

            }
        }
    });
}
export default kafka;