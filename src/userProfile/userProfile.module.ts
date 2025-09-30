import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "./userProfile.entity";
import { UserModule } from "../user/user.module";
import { ProfileController } from "./userProfile.controller";
import { ProfileService } from "./userProfile.service";



@Module({
    imports: [TypeOrmModule.forFeature([Profile])],
    controllers: [ProfileController],
    providers: [ProfileService],
    exports: [ProfileService]
})
export class UserProfileModule {}