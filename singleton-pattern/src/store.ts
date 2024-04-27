interface Game {
    id: string;
    whitePlayerName: string;
    blackPlayerName: string;
    moves: string[];
}

export class GameManager {
    games: Game[] = [];
    
    constructor() {
        this.games = [];
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

export const gameManager = new GameManager();