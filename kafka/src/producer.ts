import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

const producer = kafka.producer()

const run = async () => {
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'payment-done',
    messages: [
      { value: 'Hi this is from producer' }
    ],
  })
}

run().catch(console.error)
