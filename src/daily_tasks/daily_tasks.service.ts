import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyTask } from './entity/daily_tasks.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DailyTasksService {
  constructor(
    @InjectRepository(DailyTask)
    private readonly dailyTaskRepository: Repository<DailyTask>,
    private readonly userService: UsersService,
  ) {}

  private getTodayDate(): string {
    const now = new Date();
    return (
      now.getFullYear().toString() +
      ('0' + (now.getMonth() + 1)).slice(-2) +
      ('0' + now.getDate()).slice(-2)
    );
  }

  async createIfNotExists(user_id: number): Promise<DailyTask> {
    const date = this.getTodayDate();
    let dailyTask = await this.findByUserIdAndDate(user_id, date);

    if (!dailyTask) {
      const user = await this.userService.findUser(user_id);
      dailyTask = this.dailyTaskRepository.create({
        user,
        user_id,
        date,
      });
      await this.dailyTaskRepository.save(dailyTask);
    }

    return dailyTask;
  }

  async findAll(user_id: number): Promise<DailyTask[]> {
    return await this.dailyTaskRepository.find({ where: { user_id } });
  }

  async findByUserIdAndDate(
    user_id: number,
    date: string,
  ): Promise<DailyTask | null> {
    return await this.dailyTaskRepository.findOneBy({ user_id, date });
  }

  async incrementCount(user_id: number): Promise<void> {
    const dailyTask = await this.createIfNotExists(user_id);
    await this.dailyTaskRepository.increment(
      { user_id, date: dailyTask.date },
      'task_count',
      1,
    );
  }

  async decrementCount(user_id: number): Promise<void> {
    const dailyTask = await this.findByUserIdAndDate(
      user_id,
      this.getTodayDate(),
    );

    if (!dailyTask || dailyTask.task_count <= 0) {
      throw new BadRequestException('Decrement not allowed');
    }

    await this.dailyTaskRepository.decrement(
      { user_id, date: dailyTask.date },
      'task_count',
      1,
    );
  }

  async findByMonth(user_id: number, date: string): Promise<DailyTask[]> {
    const dailyTasks = await this.findAll(user_id);
    return dailyTasks.filter((task) => task.date.startsWith(date));
  }
}
