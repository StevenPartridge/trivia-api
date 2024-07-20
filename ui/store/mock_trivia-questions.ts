import type { TriviaQuestion } from '@/models/TriviaQuestion';

const exampleQuestions: Partial<TriviaQuestion>[] = [
  {
    id: 1,
    question: 'What is the capital of France?',
    correct_answer: 'Paris',
    wrong_answers: ['London', 'Berlin', 'Madrid'],
    category: 'Geography',
    difficulty: 'easy',
    tags: ['capital', 'city', 'Europe'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    question: 'What is the largest planet in our solar system?',
    correct_answer: 'Jupiter',
    wrong_answers: ['Saturn', 'Neptune', 'Earth'],
    category: 'Science',
    difficulty: 'medium',
    tags: ['planet', 'solar system', 'space'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    question: 'Who wrote "To Kill a Mockingbird"?',
    correct_answer: 'Harper Lee',
    wrong_answers: ['Mark Twain', 'F. Scott Fitzgerald', 'Ernest Hemingway'],
    category: 'Literature',
    difficulty: 'medium',
    tags: ['author', 'book', 'classic'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    question: 'What is the smallest unit of life?',
    correct_answer: 'Cell',
    wrong_answers: ['Atom', 'Molecule', 'Organ'],
    category: 'Biology',
    difficulty: 'easy',
    tags: ['life', 'biology', 'unit'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    question: 'Which element has the chemical symbol "O"?',
    correct_answer: 'Oxygen',
    wrong_answers: ['Osmium', 'Oganesson', 'Oxygenium'],
    category: 'Chemistry',
    difficulty: 'easy',
    tags: ['element', 'symbol', 'chemistry'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    question: 'In which year did the Titanic sink?',
    correct_answer: '1912',
    wrong_answers: ['1905', '1915', '1920'],
    category: 'History',
    difficulty: 'medium',
    tags: ['ship', 'disaster', 'year'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 7,
    question: 'What is the powerhouse of the cell?',
    correct_answer: 'Mitochondria',
    wrong_answers: ['Nucleus', 'Ribosome', 'Endoplasmic Reticulum'],
    category: 'Biology',
    difficulty: 'easy',
    tags: ['cell', 'biology', 'organelle'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 8,
    question: 'Who painted the Mona Lisa?',
    correct_answer: 'Leonardo da Vinci',
    wrong_answers: ['Vincent van Gogh', 'Pablo Picasso', 'Michelangelo'],
    category: 'Art',
    difficulty: 'medium',
    tags: ['painting', 'artist', 'Renaissance'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 9,
    question: 'Which planet is known as the Red Planet?',
    correct_answer: 'Mars',
    wrong_answers: ['Venus', 'Jupiter', 'Saturn'],
    category: 'Science',
    difficulty: 'easy',
    tags: ['planet', 'Mars', 'space'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 10,
    question: 'Which language is the most spoken worldwide?',
    correct_answer: 'Mandarin Chinese',
    wrong_answers: ['English', 'Spanish', 'Hindi'],
    category: 'Language',
    difficulty: 'hard',
    tags: ['language', 'spoken', 'worldwide'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default exampleQuestions;
