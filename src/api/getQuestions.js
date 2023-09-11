import axios from "axios";

const url = "https://opentdb.com/api.php?amount=5&type=multiple"; //сюди передали url по яком убуде запит
const getQuestions = async () => {
  //фун-я асинхронна
  const response = await axios.get(url); //чекає відповіді від запиту по url
  const data = response.data.results; // data  прописуємо ту відповідь, що прийшла з назвою масиву.results;
  return data.map((quiz) => {
    return {
      question: quiz.question, //повертаємо замість всього масиву, масив з питаннями тільки
      //а також маcив з відповідями, в якому буде і правильна і неправильні в кожного буде свій індекс із трьох, бо непраивильних питань 3
      answers: [
        {
          answer: quiz.correct_answer,
          isTrue: true,
        },
        //але пропишемо по іншому, так як нам буде приходити масив  з неправильними відповідями, ми можемо по ньому мапитися
        ...quiz.incorrect_answers.map((incAnsw) => { //брати кожну неправильну
          return { //і повертати
            answer: incAnsw, //як відповідь неправильну
            isTrue: false, //і як стан false
          };
          //розіб'ємо масив який прийшов на окремі об'єкти, поставивши на початку мапу ...
          //але тепер у нас правильна відповідь завжди йде першою і щоб перемішати маисв, ми примінимо до нього метод .sort
        }),
      ].sort(() => Math.random() - 0.5),
    };
  });
};

export default getQuestions;
// {
//   answer: quiz.incorrect_answers[0],
//   isTrue: false,
// },
// {
//   answer: quiz.incorrect_answers[1],
//   isTrue: false,
// },
// {
//   answer: quiz.incorrect_answers[2],
//   isTrue: false,
// },
//можна було б прописати таким чином, як вище, але якщо відповідей прийде < ч >, то неспрацює
