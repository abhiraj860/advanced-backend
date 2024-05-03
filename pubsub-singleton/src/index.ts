import { PubSubManger } from "./PubSubManager";

// Providing data to the subscribers
setInterval(()=>{
    PubSubManger.getInstance().addUserToStock(Math.random().toString(), "APPL");
}, 5000);