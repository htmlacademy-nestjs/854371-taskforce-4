import { ConflictException, Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { TasksUserModule } from '../tasks-user/tasks-user.module';
import TaskUserMemoryRepository from '../tasks-user/task-user-memory.repository';
import CreateUserDto from './dto/create-user.dto';
import dayjs from 'dayjs';
import TaskUserEntity from '../tasks-user/task-user.entity';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  imports: [TasksUserModule]
})
export class AuthenticationModule {
  constructor (
    private readonly userRepository: TaskUserMemoryRepository
  ) {}

  public async register(dto: CreateUserDto) {
    const {name, email, city, password, role, avatar, birthDay} = dto;

    const existUser = await this.userRepository.findByEmail(email)

    if (existUser) {
      throw new ConflictException(`User with email ${email} already exist`)
    }

    const taskUser = {
      name, email, city, role, avatar, birthDay: dayjs(birthDay).toDate(), aboutMe: '', passwordHash: '',
      ageInYears: 0, completedTasksCount: 0, failedTasksCount: 0, rating: 0, ratingPosition: 0, regDate: dayjs().toISOString(),
      specialization: ''
    };

    const userEntity = await new TaskUserEntity(taskUser).setPassword(password)

    return this.userRepository.create(userEntity);
  }
}
