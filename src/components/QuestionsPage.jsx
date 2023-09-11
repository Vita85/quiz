import React, { useState } from "react";
import { decode } from "html-entities";

const QuestionsPage = ({ questions, setQuestions, getQuestionsHandle }) => {
  //9) створимо стейт де будуть зберігатися відповіді, які обрав юзер,спочатку це буде масив з ячейками заповненими null
  const [userAnswers, setUserAnswers] = useState(Array(5).fill({})); //перепишемо з null на пустий об'єкт прийде - console.log(userAnswers); //[{…}, {…}, {…}, {…}, {…}]

  //14) стейт який буде відповідати за обрані відповіді(які кнопки відображати). Чи просто обрані, чи коли юзер натисне на кнопку Check answers, стейт встановиться на тру і буде вже відображати правильні/неправильні і не можна було переобирати
  const [checkAnswers, setCheckAnswers] = useState(false);

  //19)далі створимо стейт де буде підраховуватис якількість правильних відповідей
  const [correctAnsw, setCorrectAnsw] = useState(0);

  //10) треба створити фун-ю, вибору питань. яка би розуміла куди записати, обрану відповідь, в який індекс масиву. тобто, до якого питання ця відповідь відноситься. якщо натиснув на якусь відповідь, в 2-му питання, то вона має [{…}, { отут записати}, {…}, {…}, {…}]. У питань індекси співпадають з індексами тут [{…}, {…}, {…}, {…}, {…}]
  const chooseAnswer = (index, answer) => {
    //17)В фун-ї, що відповідає за вибір питань ми робимо перевірку, щоб якщо вже checkAnswers - true,(тобто,якщо юзер вже обрав якісь відповіді і натиснув на Check answers) то просто зроби return. це для того, щоб вже не можна було перевибирати інші питання
    if (checkAnswers) return; //якщо етап вибору є вже, то просто return, а після return вже нічого не відбудеться;

    //тут ми отримали індекс питання і відповідь
    const newUserAnswers = [...userAnswers]; //cтворюємо новий масив на основі старого(копіюємо)
    newUserAnswers[index] = answer; //в певний індекс вбиваємо ту відповідь, що нам треба
    setUserAnswers(newUserAnswers); //і новий масив встановлюємо в стейт
  };
  //13) Тепер треба прописати логіку, щоб рахувати кіл-ть відповідей
  const checkAnsw = () => {
    if(userAnswers.every((answer) => answer.answer)) { //тут зробимо перевірку, щоб тільки коли всі натиснуті, то виконувалося оновлення
      setCheckAnswers(true); //ця фун-я встановить стейт який відповідає за стилі кнопок на true
      const correctAnsw = userAnswers.filter((answer) => answer.isTrue === true); //профільтруємо масив з відповідями юзера і залишимо тільки ті відповіді, у яких isTrue === true(isTrue прописано як ключ в самому масиві з відповідями в getQuestions) І на кнопку Check answers повісимо її
      setCorrectAnsw(correctAnsw.length);
    } else {
      alert("Choose all answers"); //а якщо хоча б одна не вибрана, то "Choose all answers"
    }
 
  };

  //21) Тепер пропишемо фун-ю до кнопки, яка робитиме New Quiz, тобто в масив питань встановити нові питання. (В App.jsx ми створили стейт де зберігаються всі питання з відповідями. У нас питання рендеряться з масиву questions, тут ми їх мапимо на 59 рядку (questions.map))
  const getNewQuiz = async () => {
    //питання нам приходять з фун-ї в App.jsx.  Тому в App.jsx фун-ю getQuestionsHandle на 18 рядку винесемо з useEffect вище нього, а в ньому її просто викличемо. там же в <QuestionsPage getQuestionsHandle={getQuestionsHandle} її і передаємо, а тут в const QuestionsPage її приймемо і так як там вона на setQuestions встановлює нове значення (response). то тут її просто викличемо;
    setUserAnswers(Array(5).fill({})); // стейт де зберігаються відповіді, які обрав юзер знову поставимо на пустий об'єкт 
    setCheckAnswers(false); //ця фун-я знову встановить стейт який відповідає за стилі кнопок на false, тобто тут буде не етап перевірки а етап виконання завдання
    await getQuestionsHandle();
  };

  //15) для стейту 14 пропишемо окрему фун-ю, яка буде відповідати за стилізацію кнопок(чи просто обрана/чи зелена/чи червона/чи заблокована).Відповідно до дії-повернеться клас кнопки
  const answerStyling = (answerItem, questionIndex) => {
    //приймає кожну кнопку-відповідь(answerItem) і індекс кожного питання  questionIndex
    if (checkAnswers) {
      //якщо кнопка обрана, натиснута
      if (answerItem.isTrue === true) {
        //якщо відповідь правильна
        return "answer-btn true"; //поверни стилі для правильної відповіді(зелена)
        //якщо цей  if відпрацює, тобто дасть true, то далі код не читатиметься
      } else if (answerItem.answer === userAnswers[questionIndex].answer) {
        //якщо якийсь елемент-відповідь з масиву відповідей === обраній юзером, але не пройшла перший if - не true
        return "answer-btn false"; //тоді вона обрана але не правильна і поверни для неї стилі червона
      } else {
        return "answer-btn locked"; //інакше стилі для заблокованої
      }
    } else {
      if (answerItem.answer === userAnswers[questionIndex].answer) {
        //якщо якийсь елемент-відповідь з масиву відповідей === обраній юзером
        return "answer-btn choosen"; //то поверни клас для обраної
      } else {
        return "answer-btn"; //якщо ні, просто поверни кнопку
      }
    }
  };
  return (
    <>
      <div className="questions">
        {questions.map((questionItem, questionIndex) => {
          //мапимося по всьому масиву questions беремо кожен елемент цього масиву (кожен блок питання-відповіді)І ще сюди передамо індекс кожного питання  questionIndex для 10=ї фун=ї
          return (
            //і повертаємо div в якому буде
            <div className="question" key={questionItem.question}>
              {/* саме питання від кожного елемента масиву questions*/}
              <h2>{decode(questionItem.question)}</h2>
              {/* дів answers з відповідями */}
              <div className="answers">
                {/* в якому беремо кожен елемент масиву питань(кожен блок питання-відповіді) кодну відповідь в ньому. мапимося по ним і повертаємо*/}
                {questionItem.answers.map((answerItem) => {
                  return (
                    // кнопку, з кожним об'єктом з масиву відповідей, з відповіддю
                    <button
                      className={answerStyling(answerItem, questionIndex)}
                      key={answerItem.answer}
                      onClick={() => chooseAnswer(questionIndex, answerItem)}
                    >
                      {decode(answerItem.answer)}
                    </button>
                    // 11) на кнопку навішаємо фун-ю і в неї передамо індекс питання і кожну відповідь(зі своїм окремим індексом). Тепер на першому питанні висить індекс 0, і на всіх відповідях цього питання теж висить індекс 0. Тепер на всіх кнопках певного питання висить і його індекс.
                    // 12) А на класнейм напишемо, що якщо вибрана відповідь[з індексом питання].з відповідей === одній з відповідей(тобто зрівнюємо строки, чи є обрана юзером відповідь взагалі в масиві відповідей) ? то поверни клас choosen : інакше просто клас answer-btn
                    //16) замість 12) передамо в класнейм кнопки фун-ю answerStyling
                  );
                })}
              </div>
            </div>
          );
        })}

        {/*22) тут для кнопки пропишемо що якщо checkAnswers - true, тобто перевірка відбулася(тобто була натиснута кнопка  Check answers) то виконай getNewQuiz, тобто відрендери нові питання. якщо ж ні, то  checkAnsw*/}
        <button
          className="primary-btn"
          onClick={checkAnswers ? getNewQuiz : checkAnsw}
        >
          {/* 18) тут пропишемо що якщо checkAnswers - true, тобто перевірка відбулася(тобто була натиснута кнопка  Check answers) то щоб писало "New Quiz"  а якщо ще йде вибір відповідей, то щоб писало  Check answers*/}
          {checkAnswers ? "New Quiz" : "Check answers"}
        </button>
        {/* 20) тут пропишемо для 19 стейту якщо відповіді обрані і перевірка пройшла, то віддобрази скільки правильних із всіх */}
        {checkAnswers && (
          <p className="correct">Correct answers: {correctAnsw}/5</p>
        )}
      </div>
    </>
  );
};
//

//для того, щоб позбутися спец символів шифрування, які приходят з текстом із сервера, треба встановити npm install html-entities і використовувати {decode(сюди те, що хочемо почистити)}

export default QuestionsPage;
