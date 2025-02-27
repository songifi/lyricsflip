import { DataSource } from 'typeorm';
import { MusicLesson } from '../music-lessons/entities/music-theory-lesson.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Quiz } from '../quiz/entities/quiz.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'musicdb',
  entities: [MusicLesson, Artist, Quiz],
  synchronize: true,
});

const seed = async () => {
  await dataSource.initialize();

  const lessonRepo = dataSource.getRepository(MusicLesson);
  const artistRepo = dataSource.getRepository(Artist);
  const quizRepo = dataSource.getRepository(Quiz);

  await lessonRepo.insert([
    {
      title: 'Intro to Chords',
      content: 'Learn major and minor chords.',
      genre: 'General',
      difficulty: 'Beginner',
    },
    {
      title: 'Scales 101',
      content: 'Understanding major and minor scales.',
      genre: 'General',
      difficulty: 'Intermediate',
    },
  ]);

  await artistRepo.insert([
    {
      name: 'Ludwig van Beethoven',
      biography: 'German composer and pianist.',
      genre: 'Classical',
      birthYear: 1770,
    },
    {
      name: 'Freddie Mercury',
      biography: 'Lead singer of Queen.',
      genre: 'Rock',
      birthYear: 1946,
    },
  ]);

  await quizRepo.insert([
    {
      question: 'Which note is the root in C major?',
      options: ['C', 'D', 'E'],
      correctAnswer: 'C',
    },
  ]);

  console.log('Seed data inserted.');
  process.exit();
};

seed();
