import AnswersModel from '../models/AnswersModel';
import { QuestionCompleteProps } from '../types/QuestionProps';

const areQuestionsComplete = async (data: QuestionCompleteProps[]): Promise<boolean> => {
  const answersData = data.map(async (question) => {
    const ansData = await AnswersModel.getAnswersByQuestionId(question.id);
    return ansData;
  });
  let isComplete = true;
  const finalData = await Promise.all(answersData);
  finalData.forEach((ans) => {
    if (ans.length !== 4) {
      isComplete = false;
    }
  });
  return isComplete;
};

export default areQuestionsComplete;
