export type AnswerProps = {
  text: string,
  is_correct: boolean
  question_id: number
}

export type AnswersAddProps = {
  text: string,
  is_correct: boolean
  question_id: number,
}
export type GetAnswersProps = {
  text: string,
  is_correct: boolean
  question_id: number,
  id: number
}
