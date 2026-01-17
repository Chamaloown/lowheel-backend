import { Module } from "@nestjs/common";
import { RiotService } from "./riot.service";
import { HttpModule } from "@nestjs/axios"
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [HttpModule, ConfigModule],
    providers: [RiotService],
    exports: [RiotService]
})
export class RiotModule { }