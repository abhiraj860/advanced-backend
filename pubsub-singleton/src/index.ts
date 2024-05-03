import { PubSubManger } from "./PubSubManager";

setInterval(()=>{
    PubSubManger.getInstance().addUserToStock(Math.random().toString(), "APPL");
}, 5000);