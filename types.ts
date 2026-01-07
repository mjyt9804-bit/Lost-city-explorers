
export enum CharacterId {
  AARAV = 'aarav',
  TARA = 'tara',
  ZOYA = 'zoya',
  NEIL = 'neil'
}

export interface Character {
  id: CharacterId;
  name: string;
  role: string;
  skill: string;
  color: string;
  icon: string;
  description: string;
}

export interface Puzzle {
  id: string;
  type: 'code' | 'pattern' | 'sequence';
  question: string;
  answer: string;
  options?: string[];
  hint: string;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  image: string;
  puzzles: Puzzle[];
}

export interface GameState {
  currentLevelIndex: number;
  selectedCharacter: Character | null;
  completedLevels: number[];
  inventory: string[];
  badges: string[];
}
