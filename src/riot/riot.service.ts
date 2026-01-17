import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { PlayerInfo } from "./interfaces/playerInfo";
import { FullMatchDetails } from "./interfaces/fullMatchDetails";
import { ConfigService } from "@nestjs/config";



@Injectable()
export class RiotService {
    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) { }

    async getPlayerInfo(name: string, tagLine: string): Promise<PlayerInfo> {
        const { data } = await firstValueFrom(
            this.httpService.get<PlayerInfo>(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tagLine}`, {
                headers: {
                    "X-Riot-Token": this.configService.get<string>("RIOT_TOKEN"),
                }
            }
            ).pipe(
                catchError((error: AxiosError) => {
                    console.log(error)
                    throw 'An error happened!';
                }),
            ),
        );
        return data;
    }

    async getLatestMatchId(puuid: string): Promise<string> {
        const { data } = await firstValueFrom(
            this.httpService.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1`, {
                headers: {
                    "X-Riot-Token": this.configService.get<string>("RIOT_TOKEN"),
                }
            }
            ).pipe(
                catchError((error: AxiosError) => {
                    console.log(error)
                    throw Error(`message: ${error}`)
                }),
            ),
        );
        return data[0];
    }

    async getFullMatchDetails(matchId: string): Promise<FullMatchDetails> {
        const { data } = await firstValueFrom(
            this.httpService.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`, {
                headers: {
                    "X-Riot-Token": this.configService.get<string>("RIOT_TOKEN"),
                }
            }
            ).pipe(
                catchError((error: AxiosError) => {
                    console.log(error)
                    throw Error(`message: ${error}`)
                }),
            ),
        );
        return data;
    }
}