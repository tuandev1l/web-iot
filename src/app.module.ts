import { Module, NestMiddleware } from '@nestjs/common';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigValidationSchema } from '../config.schema';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './auth/jwt-middleware.middleware';
import { Task } from './tasks/entities/task.entity';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env',
        `.env.${process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'}`,
      ],
      isGlobal: true,
      validationSchema: ConfigValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          synchronize: configService.get('DB_SYNCHRONIZE'),
          autoLoadEntities: process.env.NODE_ENV === 'dev' ? true : false,
          entities: [Task, User],
        };
      },
    }),
    TasksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
