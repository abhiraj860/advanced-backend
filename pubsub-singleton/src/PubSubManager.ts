export class PubSubManger {
    private static instance: PubSubManger;

    private constructor() {

    }

    public static getInstance() : PubSubManger {
        if(!PubSubManger.instance) {
            PubSubManger.instance = new PubSubManger();
        } 
        return PubSubManger.instance;
    }

    addUserToStock(userId: string, stockTicker: string) {

    }

    removeUserFromStock(userId:string, stockTicker: string) {

    }

    forwardMessageToUser(userId: string, stockTicker: string, price: string) {

    }
}