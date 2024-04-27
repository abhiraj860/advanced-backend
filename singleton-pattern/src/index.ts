import { games } from "./store";
import { startLogger } from "./logger";

startLogger();

setInterval(()=>{
    games.push({
        id: Math.random.toString(),
        whitePlayerName: 'Alice',
        blackPlayerName: 'Denzel',
        moves: []
    });
}, 5000);