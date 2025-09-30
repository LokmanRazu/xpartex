import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserProfileModule } from "../userProfile/userProfile.module";

@Module({
    imports:[TypeOrmModule.forFeature([User]),UserProfileModule],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService]

})
export class UserModule {}
