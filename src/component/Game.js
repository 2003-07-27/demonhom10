import React, { useState, useEffect } from 'react'; 
import data from './data'; 
import "./Game.css";
const Game = () => {
  //Các biến trạng thái (state) được khai báo sử dụng useState hook
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState([]);

  //Sử dụng useEffect hook để tạo câu hỏi ngẫu nhiên khi thành phần hiển thị lần đầu
  /**hàm callback được truyền vào useEffect sẽ được gọi. Mảng rỗng [] được cung cấp 
   * làm tham số thứ hai, để chỉ định rằng useEffect chỉ cần được gọi một lần 
   * sau khi component được render lần đầu tiên. */
  useEffect(() => {
    const randomQuestions = getRandomQuestions(data, 5);
    setQuestions(randomQuestions);
  }, []);

  //hàm getRandomQuestions để lấy ngẫu nhiên một số lượng câu hỏi từ dữ liệu
  const getRandomQuestions = (data, count) => {
    const shuffledData = data.sort(() => Math.random() - 0.5);
    return shuffledData.slice(0, count);
  };
  //các Hàm xử lý sự kiện
  const handleInputChange = (e) => {
    setInputValue(e.target.value.toUpperCase());
  };
  /**Xóa ký tự cuối cùng trong selectedLetters và inputValue nếu selectedLetters ko rỗng */
  const handleDelete = () => {
    const lastSelectedLetter = selectedLetters[selectedLetters.length - 1];
    if (lastSelectedLetter) {
      setSelectedLetters(selectedLetters.slice(0, -1));
      setInputValue(inputValue.slice(0, -1));
    }
  };
  /**hiển thị câu trả lời và cập nhật inputValue với câu trả lời của câu hỏi hiện tại */
  const handleGiveUp = () => {
    setShowAnswer(true);
    setInputValue(questions[currentQuestionIndex].answer);
  };
  /**chuyển sang câu hỏi tiếp theo bằng cách cập nhật currentQuestionIndex và đặt lại
   * inputValue, showAnswer và selectedLetters về giá trị mặc định
   */
  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setInputValue('');
    setShowAnswer(false);
    setSelectedLetters([]);
  };
  /**Kiểm tra câu trả lời nhập vào với câu hỏi hiện tại
   * Nếu câu trả lời đúng cập nhật score bằng cách tăng giá trị hiện tạo lên 1
   * sau đó, hiển thị câu trả lời và đặt lại selectedLetter về giá trị mặc định
   */
  const handleCheckAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const { answer } = currentQuestion;
    /**destructuring assignment để lấy giá trị của thuộc tính answer từ đối tượng currentQuestion và gán nó cho biến answer */
    if (inputValue === answer) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };
  //kiểm tra trạng thái và hiển thị nội dung phù hợp
  if (currentQuestionIndex >= questions.length) {
    return (
      <div>
        <h1>Game Over</h1>
        <p>Final Score: {score}</p>
      </div>
    );
  }
  //lấy thông tin câu hỏi hiện tại từ mảng câu hỏi
  const currentQuestion = questions[currentQuestionIndex];
  const { image, description } = currentQuestion;
  
  //Lấy danh sách chữ cái còn lại
  const remainingLetters = description.split('')
                        .filter((letter) => !selectedLetters.includes(letter) && letter !== ' ');
  /**Hàm callback này kiểm tra từng ký tự trong mảng*/

  //hàm xử lý khi người dùng nhấp vào 1 chữ cái
  const handleLetterClick = (letter) => {
    setSelectedLetters([...selectedLetters, letter]);
    setInputValue(inputValue + letter);
  };
  return (
    <div>
      <h1>Spelling Word Scramble Game</h1>
      <h3>Use the letters to spell the word</h3>
      {/**Hiển thị icon và điểm số */}
      <div id="champion-score">
        <div id="champion">
          <img
            src="https://cdn-icons-png.flaticon.com/128/5406/5406793.png"
            alt="icon_champion"
          />
        </div>
        <div id="score">{score}</div>
      </div>
      {/**Hiển thị câu hỏi, hình ảnh và nút chọn chữ cái */}
      <div id='question'>
        <img src={image} alt="" id='picture' />
        <div>
          {remainingLetters.map((letter, index) => (
            <button key={index} onClick={() => handleLetterClick(letter)} id='descriptionButton'>
              {letter}
            </button>
            /**Mỗi phần tử trong mảng remainingLetters được truyền vào một hàm callback với hai tham số là letter (ký tự hiện tại)
             *  và index (vị trí của ký tự trong mảng). */
          ))}
        </div>
        {/**Hiển thị ô nhập câu trả lời và các nút điều khiển */}
        <div id='answerQuestion'>
          <input
          type="text"
          id='answer'
          placeholder="Enter your answer"
          value={inputValue}
          onChange={handleInputChange}
          />
          <button onClick={handleDelete} id='delete'>Delete</button>
          <button onClick={handleGiveUp} id='giveUp'>Give Up</button>
        </div>
        {/**Hiển thị nút kiểm tra câu trả lời hoặc nút chuyển câu hỏi */}
        <div>
          {showAnswer ? (
            <div>
              <button onClick={handleNextQuestion} id='nextQuestion'>Next Question</button>
            </div>
          ) : (
            <button onClick={handleCheckAnswer} id='checkAnswer'>Check Answer</button>
          )}
        </div>
        
      </div>
      
      
    </div>
  );
};

export default Game;