import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AttachForm from './pages/attach/Form';
import AttachForm2 from './pages/attach/Form2';
import Result from './pages/attach/Result';
import List from './pages/board/List';
import Main from './pages/main/Main';
import EditForm from './pages/user/EditForm';
import JoinForm from './pages/user/JoinForm';
import JoinOk from './pages/user/JoinOk';
import LoginForm from './pages/user/LoginForm';
import Gallery from './pages/gallery/Gallery';
import Upload from './pages/gallery/Upload';
import WriteForm from './pages/board/WriteForm';
import Read from './pages/board/Read';
import EditBoard from './pages/board/EditBoard';

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
          <Route path='/user/joinok' element={<JoinOk />} />
          <Route path='/user/editform' element={<EditForm />} />
          <Route path='/board/list' element={<List />} />
          <Route path='/board/read/:no' element={<Read />} />
          <Route path='/board/write' element={<WriteForm />} />
          <Route path='/board/edit/:no' element={<EditBoard />} />
          <Route path='/attach/form' element={<AttachForm />} />
          <Route path='/attach/form2' element={<AttachForm2 />} />
          <Route path='/attach/result' element={<Result />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/gallery/upload' element={<Upload />} />

        </Routes>

      </BrowserRouter>

    </div>

  );

}

export default App;