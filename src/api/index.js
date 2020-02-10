const BASE_URL = 'http://localhost:3001';

export const getQuestions = async () => {
  try {
    const response = await fetch(`${BASE_URL}/questions`);
    const questions = await response.json();
    return questions;
  } catch (error) {
    console.log(error);
  }
};

export const getAnswers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/answers`);
    const answers = await response.json();
    return answers;
  } catch (error) {
    console.log(error);
  }
};
