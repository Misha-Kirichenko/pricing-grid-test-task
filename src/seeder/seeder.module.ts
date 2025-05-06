import { Module, OnModuleInit } from '@nestjs/common';
import { RoomCategorySeeder } from './roomCategory-seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomCategory } from 'src/db/entities/room-category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RoomCategory])],
    providers: [RoomCategorySeeder],
})
export class SeederModule implements OnModuleInit {
    constructor(private readonly roomCategorySeeder: RoomCategorySeeder) { }

    public async onModuleInit() {
        try {
            await this.roomCategorySeeder.seed();
        } catch (error) {
            console.error('Error seeding database:', error);
        }

    }
}
