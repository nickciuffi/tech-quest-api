"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _QuestionariesModel = require('../models/QuestionariesModel'); var _QuestionariesModel2 = _interopRequireDefault(_QuestionariesModel);




function getQuestionsFromInitialData(data) {
  const questions = [];
  data.forEach((dado) => {
    if (questions.length === 0) {
      questions.push({
        id: dado.q2_id,
        text: dado.question,
      });
    }
    const exists = questions.some((question) => question.id === dado.q2_id);
    if (exists) return;
    questions.push({
      id: dado.q2_id,
      text: dado.question,
    });
  });
  return questions;
}

function getAnswersForQuestion(questId, data) {
  const answers = [];
  data.forEach((dado) => {
    if (dado.q2_id === questId) {
      answers.push({
        id: dado.ans_id,
        text: dado.answer,
        isCorrect: dado.is_correct !== 0,
      });
    }
  });
  return answers;
}

function formatData(data) {
  const questions = getQuestionsFromInitialData(data);
  const questsWithAns = questions.map((quest) => {
    const answers = getAnswersForQuestion(quest.id , data);
    return {
      id: quest.id,
      text: quest.text,
      answers,
    };
  });

  return {
    id: data[0].q1_id,
    title: data[0].q1_title,
    desc: data[0].q1_desc,
    questions: questsWithAns,
  };
}

async function getFirstQuestionId(quests, q1Id) {
  const q2Data = quests.map((quest) => ({
    text: quest.text,
    q1Id,
  }));
  const q2Id = await _QuestionariesModel2.default.storeQ2(q2Data);
  return q2Id[0];
}

class QuestionariesController {
   async index(req, res) {
    const data = await _QuestionariesModel2.default.getAllQuestionaries();
    res.json(data);
  }

   async get(req, res) {
    const initialData = await _QuestionariesModel2.default.getQuestionaryById(Number(req.params.id)) ;
    if (initialData.length === 0) return res.json('There is no info for this Questionary');
    const questionaryData = formatData(initialData);
    return res.json(questionaryData);
  }

   async store(req, res) {
    const data = req.body ;
    const q1Id = await _QuestionariesModel2.default.storeQ1(data.title, data.desc);
    console.log(data.questions);
    const firstQ2Id = await getFirstQuestionId(data.questions, q1Id[0]);
    const ans = data.questions.map((quest, index) => quest.answers.map((answer) => ({
      text: answer.text,
      isCorrect: answer.isCorrect,
      questionId: firstQ2Id + index,

    })));

    ans.forEach(async (an) => {
      await _QuestionariesModel2.default.storeAnswers(an);
    });

    return res.json(data);
  }

   async delete(req, res) {
    const data = await _QuestionariesModel2.default.delete(Number(req.params.id));
    return res.json(data);
  }

   async update(req, res) {
    const id = Number(req.params.id);
    const data = req.body;
    const result = await _QuestionariesModel2.default.update(id, data);
    res.json(result);
  }
}

exports. default = new QuestionariesController();
