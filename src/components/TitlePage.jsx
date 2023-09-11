//-----------!!!------------

const TitlePage = ({ setIsGame }) => {
  //сюди передали стейт зміни стану кнопки


  return (
    <div className="wrapper">
      <div className="title">
        <h1>Quizzical</h1>
        <p>Some description if needed</p>
        <button className="primary-btn">Сhoose a category?</button>

        <button className="primary-btn" onClick={() => setIsGame(true)}>
          Start quiz
        </button>
        {/* //при  натисканні на кнопку стейт з false стане true і розкриється сторінка з самими питаннями */}
      </div>
    </div>
  );
};

export default TitlePage;
