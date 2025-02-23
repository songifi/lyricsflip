// src/room/room.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new room' })
  @ApiBody({ type: CreateRoomDto })
  @ApiResponse({
    status: 201,
    description: 'Room created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all room' })
  @ApiResponse({
    status: 200,
    description: 'List of all room successfully retrieved',
  })
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a room by id' })
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a room',
    description: 'Update an existing room by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the room to be updated',
    type: 'string',
  })
  @ApiBody({ type: UpdateRoomDto })
  @ApiResponse({
    status: 200,
    description: 'Room successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Room not found',
  })
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a room',
    description: 'Delete a room from the collection by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the room to be deleted',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Room successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Room not found',
  })
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }
}
