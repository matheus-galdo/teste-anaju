export type ApplicationError = {
    name: string;
    message: string;
};

export type RequestError = {
    status: number;
    data: object | null;
    statusText: string;
    name: string;
    message: string;
};

export type BetCreationParams = {
    homeTeamScore: number;
    awayTeamScore: number;
    amountBet: number;
    gameId: number;
    participantId: number;
    status: 'PENDING';
}

export type GameFinishParams = {
    gameId: number;
    homeTeamScore: number;
    awayTeamScore: number;
    isFinished: boolean;
}

export type GameFactory = {
    homeTeamName: string;
    awayTeamName: string;
}