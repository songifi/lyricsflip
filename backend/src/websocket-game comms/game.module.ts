import {Module} from "@nestjs/common";
import { GameGateway, } from "./providers/gamegateway";


@Module({
    providers: [GameGateway],
    exports:[GameGateway]
})

export class GameModule {}