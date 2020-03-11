import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
//import { RelationsResolversModule} from '../../prisma/dal';
import { ProjectResolver, OrganizationResolver, UserResolver } from './';
import {ProjectService, OrganizationService} from '../core'
import { PrismaService } from '../services/prisma.service';
import {PasswordService } from '../services/password.service';

@Module({
    providers:[
        PrismaService,
        PasswordService,
        ProjectService,
        ProjectResolver,
        OrganizationService,
        OrganizationResolver,
        UserResolver


    ],
    imports: [
        AuthModule,
        //RelationsResolversModule,
    ],
    exports:[
        AuthModule,
        //RelationsResolversModule,
        ProjectResolver
    ]
})
export class ResovlerMapModule {}