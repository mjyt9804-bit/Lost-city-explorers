
import { Character, CharacterId, Level } from './types';

export const CHARACTERS: Character[] = [
  {
    id: CharacterId.AARAV,
    name: 'आरव (Aarav)',
    role: 'लीडर (Leader)',
    skill: 'Strategic Thinking',
    color: 'bg-blue-500',
    icon: '🧭',
    description: 'शांत, दिमाग से सोचने वाला लीडर।'
  },
  {
    id: CharacterId.TARA,
    name: 'तारा (Tara)',
    role: 'गैजेट एक्सपर्ट (Gadget Expert)',
    skill: 'Tech Hacking',
    color: 'bg-purple-500',
    icon: '⚡',
    description: 'टेक्नोलॉजी और गैजेट्स में एक्सपर्ट।'
  },
  {
    id: CharacterId.ZOYA,
    name: 'ज़ोया (Zoya)',
    role: 'पहेली एक्सपर्ट (Puzzle Expert)',
    skill: 'Pattern Recognition',
    color: 'bg-yellow-500',
    icon: '🧩',
    description: 'मैप्स और पहेलियाँ पढ़ने में माहिर।'
  },
  {
    id: CharacterId.NEIL,
    name: 'नील (Neil)',
    role: 'नेचर एक्सपर्ट (Nature Expert)',
    skill: 'Environment Wisdom',
    color: 'bg-green-500',
    icon: '🌿',
    description: 'नेचर और एनवायरनमेंट जानता है।'
  }
];

export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'जंगल का रास्ता (Forest Path)',
    description: 'The entrance is hidden behind the ancient vines. Solve the basic sequence to clear the path.',
    image: 'https://picsum.photos/seed/forest/800/400',
    puzzles: [
      {
        id: 'p1',
        type: 'sequence',
        question: 'Complete the pattern: 🌿 🌸 🌿 🌸 ?',
        answer: '🌿',
        options: ['🌿', '🌸', '🌳', '🍂'],
        hint: 'It alternates between a leaf and a flower.'
      }
    ]
  },
  {
    id: 2,
    title: 'पुराना खंडहर (Ancient Ruins)',
    description: 'The pillars hold the weight of history. Align the numbers to unlock the stone door.',
    image: 'https://picsum.photos/seed/ruins/800/400',
    puzzles: [
      {
        id: 'p2',
        type: 'code',
        question: 'If A=1, B=2, C=3... What is the sum of "CITY"? (C=3, I=9, T=20, Y=25)',
        answer: '57',
        hint: 'Add 3 + 9 + 20 + 25'
      }
    ]
  },
  {
    id: 3,
    title: 'अंडरग्राउंड सिटी एंट्री (Underground Entry)',
    description: 'The air is cool and the symbols glow. Match the colors to the elements.',
    image: 'https://picsum.photos/seed/cave/800/400',
    puzzles: [
      {
        id: 'p3',
        type: 'pattern',
        question: 'Which color represents Fire in the ancient scripts?',
        answer: 'Red',
        options: ['Blue', 'Green', 'Red', 'Yellow'],
        hint: 'Fire is hot and bright like the sunset.'
      }
    ]
  },
  {
    id: 4,
    title: 'सिटी सेंटर (City Center)',
    description: 'The heart of the Lost City. The final lock requires the Master Code.',
    image: 'https://picsum.photos/seed/city/800/400',
    puzzles: [
      {
        id: 'p4',
        type: 'code',
        question: 'The final code is the year the city was lost: 1000 + 200 + 30 + 4',
        answer: '1234',
        hint: 'Combine the numbers in order.'
      }
    ]
  }
];
