import { InjectModel } from '@nestjs/mongoose';
import { RefreshTokenEntity } from './refresh-token.entity';
import { Model } from 'mongoose';
import { TokenInterface } from '@project/shared/app-types';
import { RefreshTokenModel } from './refresh-token.model';

export class RefreshTokenRepository {
  constructor(
    @InjectModel(RefreshTokenModel.name) private readonly refreshTokenModel: Model<RefreshTokenModel>) {
  }

  public async create(item: RefreshTokenEntity): Promise<TokenInterface> {
    return new this.refreshTokenModel(item).save();
  }

  public async deleteByTokenId(tokenId: string) {
    return this.refreshTokenModel
      .deleteOne({ tokenId })
      .exec();
  }

  public async findByTokenId(tokenId: string): Promise<TokenInterface | null> {
    return this.refreshTokenModel
      .findOne({ tokenId })
      .exec();
  }

  public async deleteExpiredTokens() {
    return this.refreshTokenModel
      .deleteMany({ expiresIn: { $lt: new Date() } });
  }
}
