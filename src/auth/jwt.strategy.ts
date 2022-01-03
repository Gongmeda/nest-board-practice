import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
