"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const music_theory_lesson_entity_1 = require("../music-lessons/entities/music-theory-lesson.entity");
const artist_entity_1 = require("../artists/entities/artist.entity");
const quiz_entity_1 = require("../quiz/entities/quiz.entity");
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'musicdb',
    entities: [music_theory_lesson_entity_1.MusicLesson, artist_entity_1.Artist, quiz_entity_1.Quiz],
    synchronize: true,
});
const seed = async () => {
    await dataSource.initialize();
    const lessonRepo = dataSource.getRepository(music_theory_lesson_entity_1.MusicLesson);
    const artistRepo = dataSource.getRepository(artist_entity_1.Artist);
    const quizRepo = dataSource.getRepository(quiz_entity_1.Quiz);
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
//# sourceMappingURL=seed.js.map