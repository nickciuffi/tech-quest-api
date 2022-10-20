import { QuestsWithAns, QuestsWithAnsOrganized } from '../types/QuestionProps';

export default function organizeQuestsWithAns(data: QuestsWithAns[]): QuestsWithAnsOrganized[] {
  const finalData: QuestsWithAnsOrganized[] = [];
  let added;
  data.forEach((dado) => {
    added = false;
    if (!dado.ans_id || !dado.ans_text || typeof dado.is_correct !== 'number') {
      return finalData.push({
        answers: [],
        id: dado.quest_id,
        text: dado.quest_text,
      });
    }

    finalData.forEach((final) => {
      if (!dado.ans_id || !dado.ans_text || typeof dado.is_correct !== 'number') return;
      if (final.id === dado.quest_id) {
        added = true;
        final.answers.push({
          id: dado.ans_id,
          is_correct: dado.is_correct,
          question_id: dado.quest_id,
          text: dado.ans_text,
        });
      }
    });
    if (added) return 0;
    finalData.push({
      id: dado.quest_id,
      text: dado.quest_text,
      answers: [{
        id: dado.ans_id,
        is_correct: dado.is_correct,
        question_id: dado.quest_id,
        text: dado.ans_text,
      }],
    });
    console.log(finalData);
    return 0;
  });
  return finalData;
}
