import { createClient } from "redis";

const client = createClient();

async function main() {
    client.connect();
    while(1) {
        const resp = await client.brPop("submissions", 0);
        console.log(resp);
        // actually run the users code
        await new Promise(r=>setTimeout(r, 1000));
        // send it to the pubsub
        console.log('Processed user submission');
    }
    
}

main();