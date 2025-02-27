import { PartialType } from '@nestjs/mapped-types';
import { CreateSongDto } from './create-song-dto.dto';

export class UpdateSongDto extends PartialType(CreateSongDto) {}
