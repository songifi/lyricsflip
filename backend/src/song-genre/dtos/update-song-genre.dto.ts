import { PartialType } from '@nestjs/swagger';
import { CreateSongGenreDto } from './create-song.dto';

export class UpdateSongGenreDto extends PartialType(CreateSongGenreDto) {}
