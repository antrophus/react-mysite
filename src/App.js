import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import LoginForm from './pages/user/LoginForm';
import JoinForm from './pages/user/JoinForm';
import EditForm from './pages/user/EditForm';

//css 전체 공통 적용
import './css/mysite.css';
function App() {

  return (

    <div>

      <BrowserRouter>

        <Routes>

          <Route path='' element={<Main />} />
          <Route path='/user/loginform' element={<LoginForm />} />
          <Route path='/user/joinform' element={<JoinForm />} />
          <Route path='/user/editform' element={<EditForm />} />

        </Routes>

      </BrowserRouter>

    </div>

  );

}

export default App;