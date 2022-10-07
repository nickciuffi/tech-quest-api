export type InitialData = {
  q1_id: number,
  q1_title: string,
  q1_desc: string,
  q2_id: number,
  question: string,
  ans_id: number,
  answer: string,
  is_correct: number
}

export type Questions = {
  id?: number,
  text: string,
};

export type Answers = {
  id?:number,
  text: string,
  isCorrect: boolean,
}

export type QuestionsWithAns = {
  id?: number,
  text: string,
  answers: Answers[]
}

export type QuestionaryData = {
  id?: number,
  title: string,
  desc: string,

}

export type AnswerToStore = {
  text: string,
  isCorrect: boolean,
  questionId: number
}

export type QuestionToStore = {
  text: string,
  q1Id: number
}
