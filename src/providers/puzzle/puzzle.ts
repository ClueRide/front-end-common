/**
 * Created by jett on 10/24/17.
 */
/**
 * Defines properties of a Puzzle.
 * Many-to-one per Location
 */
export class Puzzle {
  id: number;
  name: string;
  locationName: string;
  locationId: number;
  question: string;
  answers: Array<Answer>;
  correctAnswer: AnswerKey;
  points: number;
}

export class Answer {
  id: number;
  // puzzleId: number;
  answerKey: AnswerKey;
  answer: string;
}

/**
 * Possible answer keys.
 */
export enum AnswerKey {
  A, B, C, D, E
}
