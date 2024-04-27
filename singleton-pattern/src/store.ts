interface Game {
    id: string;
    whitePlayerName: string;
    blackPlayerName: string;
    moves: string[];
}


// static variables and methods
// Singleton Pattern
export class GameManager {
    games: Game[] = [];
    private static instance: GameManager;
    
    private constructor() {
        this.games = [];
    }

    static getInstance() {
        // Create a single instance of GameManager and return it
        if(GameManager.instance) {
            return GameManager.instance;
        }
        GameManager.instance = new GameManager();
        return GameManager.instance;
    }

    addMove(gameId: string, move: string) {
        console.log(`Adding move ${move} to game ${gameId}`);
        const game = this.games.find(game=>gameId === gameId);
        game?.moves.push(move);
    }

    addGame(gameId: string) {
        const game = {
            id: gameId,
            whitePlayerName: 'Alice',
            blackPlayerName: 'Denzel',
            moves: []
        };
        this.games.push(game);
    }

    log() {
        console.log(this.games);
    }
}

