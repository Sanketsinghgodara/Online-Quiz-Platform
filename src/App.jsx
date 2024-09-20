 
 
import './App.css'
import { jsQuizz } from  './constants.js'
import Quiz from './Quiz'

function App() {
   

  return (
    <> 
    <div>
       
      <Quiz questions={jsQuizz.questions}/>
    </div>
    </>
  )
}

export default App
