import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenModel, RefreshTokenSchema } from './refresh-token.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forFeature([
    { name: RefreshTokenModel.name, schema: RefreshTokenSchema }
  ]) ],
  providers: [
    RefreshTokenService,
    RefreshTokenRepository
  ],
  exports: [
    RefreshTokenService
  ]
})
export class RefreshTokenModule {
}
