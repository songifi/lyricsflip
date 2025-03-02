import { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

export const Accordion = () => {
    return (
        <div className="max-w-[90%] sm:max-w-[75%] mx-auto border border-gray-300 rounded">
            {items.map((item, index) => (
                <AccordionItem key={index} title={item.title} content={item.content} />
            ))}
        </div>
    );
};

const AccordionItem = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-300 border-[2px]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 border-b border-gray-300 border-[0.5px]"
            >
                <span className="text-lg font-medium text-white">{title}</span>
                <span className='transiticon-transform duraction-200'>{isOpen ? <FaMinus /> : <FaPlus />}</span>
            </button>
            {isOpen && (
                <div className="p-4">
                    <p className="text-base text-white">{content}</p>
                </div>
            )}
        </div>
    );
};

const items = [
    {
        title: 'What is LyricFlip?',
        content: `- LyricFlip is an on-chain card game where players guess song titles or artists based on given lyrics within a 15-second window.`
    },
    {
        title: 'How do I play LyricFlip?',
        content: `- To play LyricFlip, a portion of a song's lyrics appears on a card, and you must guess the song title or the artist within 15 seconds. Correct guesses are celebrated with confetti effects.`
    },
    {
        title: 'What song categories are available in LyricFlip?',
        content: '- Players can wager tokens to add excitement and competition to the game, making each guess more thrilling.'
    },
    {
        title: 'How can I wager tokens in LyricFlip?',
        content: '- Players can wager tokens to add excitement and competition to the game, making each guess more thrilling.'
    },
    {
        title: 'What technology is LyricFlip built on?',
        content: `- LyricFlip is built on the Starknet ecosystem, integrating blockchain technology to ensure transparency, fairness, and immutability. The game utilizes smart contracts and NFTs written in Cairo, with Express.js and MongoDB powering the backend and Next.js for the frontend.`
    },
    {
        title: 'Is LyricFlip an open-source project?',
        content: '- Yes, LyricFlip is an open-source project, encouraging contributions from developers, designers, and music enthusiasts worldwide.'
    },
    {
        title: 'Can I contribute to LyricFlip?',
        content: `- Absolutely! Contributions from the community are welcome. Whether you're a developer, designer, or music enthusiast, there's a place for you to help enhance LyricFlip.`
    },
    {
        title: 'How does LyricFlip leverage blockchain technology?',
        content: '- LyricFlip uses blockchain technology to ensure transparent, fair, and immutable gameplay by integrating smart contracts and NFTs.'
    },
    {
        title: 'What makes LyricFlip unique?',
        content: `- LyricFlip combines music knowledge with blockchain innovation, providing a nostalgic and entertaining experience for music fans and blockchain enthusiasts alike.`
    },
    {
        title: 'Who can play LyricFlip?',
        content: '- LyricFlip combines music knowledge with blockchain innovation, providing a nostalgic and entertaining experience for music fans and blockchain enthusiasts alike.'
    },
    {
        title: 'Who can play LyricFlip?',
        content: '- LyricFlip is designed for both casual music lovers and blockchain enthusiasts, offering something special for everyone.'
    },
];
