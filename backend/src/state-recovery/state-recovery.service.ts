import { Injectable } from '@nestjs/common';
import { CreateStateRecoveryDto } from './dto/create-state-recovery.dto';
import { UpdateStateRecoveryDto } from './dto/update-state-recovery.dto';

@Injectable()
export class StateRecoveryService {
  create(createStateRecoveryDto: CreateStateRecoveryDto) {
    return 'This action adds a new stateRecovery';
  }

  findAll() {
    return `This action returns all stateRecovery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stateRecovery`;
  }

  update(id: number, updateStateRecoveryDto: UpdateStateRecoveryDto) {
    return `This action updates a #${id} stateRecovery`;
  }

  remove(id: number) {
    return `This action removes a #${id} stateRecovery`;
  }
}
