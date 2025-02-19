import {Module} from "@nestjs/common";
import { GameGateway, } from "./providers/gamegateway.gateway";


@Module({
    providers: [GameGateway],
    exports:[GameGateway]
})

export class GameModule {}