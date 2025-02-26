"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const music_theory_lesson_entity_1 = require("./music-theory-lesson/music-lessons/entities/music-theory-lesson.entity");
const genre_history_entity_1 = require("./music-theory-lesson/genre-history/entities/genre-history.entity");
const artist_entity_1 = require("./music-theory-lesson/artists/entities/artist.entity");
const quiz_entity_1 = require("./music-theory-lesson/quiz/entities/quiz.entity");
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'your_username',
    password: 'your_password',
    database: 'your_database',
    entities: [music_theory_lesson_entity_1.MusicTheoryLesson, genre_history_entity_1.GenreHistory, artist_entity_1.Artist, quiz_entity_1.Quiz],
    synchronize: true,
});
const seedData = async () => {
    try {
        await AppDataSource.initialize();
        console.log('✅ Database connected!');
        const lessonRepo = AppDataSource.getRepository(music_theory_lesson_entity_1.MusicTheoryLesson);
        const genreRepo = AppDataSource.getRepository(genre_history_entity_1.GenreHistory);
        const artistRepo = AppDataSource.getRepository(artist_entity_1.Artist);
        const quizRepo = AppDataSource.getRepository(quiz_entity_1.Quiz);
        await lessonRepo.save([
            {
                title: 'Introduction to Music Theory',
                content: 'Basics of notes, rhythm, melody',
            },
            {
                title: 'Scales & Chords',
                content: 'Learn about major, minor scales, and chords',
            },
        ]);
        await genreRepo.save([
            {
                genre: 'Jazz',
                description: 'Jazz originated in the early 20th century...',
            },
            { genre: 'Rock', description: 'Rock & Roll emerged in the 1950s...' },
        ]);
        await artistRepo.save([
            {
                name: 'Beethoven',
                genre: 'Classical',
                biography: 'German composer and pianist...',
            },
            {
                name: 'Jimi Hendrix',
                genre: 'Rock',
                biography: 'Revolutionized guitar music in the 1960s',
            },
        ]);
        await quizRepo.save([
            {
                question: 'What is a quarter note?',
                options: ['Whole', 'Half', 'Quarter', 'Eighth'],
                correctAnswer: 'Quarter',
            },
            {
                question: 'Which instrument is most used in Jazz?',
                options: ['Violin', 'Saxophone', 'Tuba', 'Flute'],
                correctAnswer: 'Saxophone',
            },
        ]);
        console.log('✅ Seeding completed!');
    }
    catch (error) {
        console.error('❌ Error seeding data:', error);
    }
    finally {
        await AppDataSource.destroy();
        console.log('✅ Database connection closed.');
    }
};
seedData().catch(console.error);
//# sourceMappingURL=seed.js.map