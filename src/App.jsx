//1) Створимо папку арі, де буде файл getQuestions, в яком зберігатимуться отримані по запиту з серверу питання у вигляді масиву з об'єктами

import { useState, useEffect } from "react";
import getQuestions from "./api/getQuestions";
import TitlePage from "./components/TitlePage";
import QuestionsPage from "./components/QuestionsPage";

function App() {
  //2)в App.jsx створюємо стейт де будуть зберігатися всі ті питання з відповідями
  const [questions, setQuestions] = useState([]); //стейт для всіх питань з відповідями
  
  //8) створимо стейт який буде зберігати початок гри, то для кнопки в TitlePage, типу якщо кнопку натиснули, то відкрий 2-гу сторінку з питаннями для початку гри. Він на початку буде на false, бо ж при завантаженні сторінки відображається тільки перша сторінка
  const [isGame, setIsGame] = useState(false);

 
  const [categories, setCategories] = useState([]);
  //3)створюємо в окремому модулі фун-ю getQuestions, яка буде отримувати відповідь і викликаємо її тут в useEffect

  //4) викликаємо useEffect, щоб постійно не перезаписувало
  const getQuestionsHandle = async () => {
    const response = await getQuestions(); //response буде чекати відповіді від фун-ї з модуля
    setQuestions(response); //стейт змінюємо на нове значення
  }; //але цю фун-ю після 21) винесемо вище useEffect, а в ньому її просто викличемо 
  useEffect(() => {
    getQuestionsHandle(); ///тут же і викликаємо створену в useEffect фун-ю
  }, []); //в залежності ставимо пустий масив
  //в  console.log(questions) - нам прийде масив з 5-ма об'єктами(питання, відповіді-правильна окремим ключем і неправильні- окремими ключем з масивом) І виникає питання як нам їх промапити в маисві, в різній послідовності щоб вони були

  //5) Для цього в функ-ї getQuestions з модуля будемо мапитися по  data і  повертати масив тільки  з питаннями

  return (
    //6) створюємо компонент TitlePage і переносимо туди верстку стартової сторінки. Нам стейт const [questions, setQuestions] потрібен тільки в QuestionsPage, бо тільки там ми будемо працювати з питаннями і відповідями, тому ми в QuestionsPage цей стейт і передамо і в QuestionsPage в самому компоненті їх і пиймемоїх приймемо
    <>
      {isGame ? (
        <QuestionsPage questions={questions} setQuestions={setQuestions} getQuestionsHandle={getQuestionsHandle}/>
      ) : (
        <TitlePage setIsGame={setIsGame} categories={categories} setCategories={setCategories}/>
      )}
      {/* і створивши стейт для розкриття гри(8) ми прописуємо, що якщо isGame true ? то розкрий сторінку з питаннями <QuestionsPage/> : інакше покажи початкову сорінку TitlePage. setIsGame передаємо в компонент TitlePage, в самому компоненті його приймаємо і там же при натисканні на кнопку Start quiz ми встановимо setIsGame на true. Тобто при натисканні на кнопку гру розкрити, бо стейт стане true*/}
    
    </>

    //7) І створимо компонент QuestionsPage де буде сторінка з питаннями і відповідями(2-га сторінка)
  );
}

export default App;
