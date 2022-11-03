export type QuestionProps = {
   text: string,
}

export type QuestionCompleteProps = {
  text: string,
  questionary_id: number,
  id: number,
  isComplete: boolean
}

export type QuestionsAddProps = {
  text: string
  questionary_id: number
}

export type QuestsWithAns = {
  quest_id: number,
  quest_text: string,
  ans_id: number | null,
  ans_text: string | null,
  is_correct: number | null
}

export type QuestsWithAnsOrganized = {
  text: string,
  id: number,
  answers: {
    id: number,
    text: string,
    is_correct: number,
    question_id: number
  }[]
}

export type GetQuestionProps = {
  text: string,
  questionary_id: number,
  id: number
}
