import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import dayjs from 'dayjs';
import TaskUserEntity from '../tasks-user/task-user.entity';
import LoginUserDto from './dto/login-user.dto';
import { TaskUserRepository } from '../tasks-user/task-user.repository';

@Injectable()
export class AuthenticationService {
  constructor (
    private readonly userRepository: TaskUserRepository
  ) {}

  public async register(dto: CreateUserDto) {
    const {name, email, city, password, role, avatar, birthDay, aboutMe, specialization} = dto;

    const existUser = await this.userRepository.findByEmail(email)

    if (existUser) {
      throw new ConflictException(`User with email ${email} already exist`);
    }

    const taskUser = {
      name, email, city, role, avatar, birthDay: dayjs(birthDay).toDate(), aboutMe: aboutMe ?? '', passwordHash: '',
      ageInYears: 0, completedTasksCount: 0, failedTasksCount: 0, rating: 0, ratingPosition: 0, regDate: dayjs().toISOString(),
      specialization: specialization ?? ''
    };

    const userEntity = await new TaskUserEntity(taskUser).setPassword(password)

    return this.userRepository.create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;

    const existUser = await this.userRepository.findByEmail(email)

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found`)
    }

    const taskUserEntity = new TaskUserEntity(existUser)
    if (!await taskUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(`Incorrect password`)
    }

    return taskUserEntity.toObject();
  }

  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }
}
