//import 라이브러리
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

    /*---라우터 관련-------------------------------*/
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));

    const navigate = useNavigate();

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/

    /*---일반 변수--------------------------------*/

    /*---일반 메소드 -----------------------------*/

    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    const handleLogout = () => {
        console.log('로그아웃');
        // 로그아웃 로직
        // 로컬스토리지에 토큰 삭제
        localStorage.removeItem('token');
        // 로컬스토리지에 authUser 삭제
        localStorage.removeItem('authUser');
        //화면 반영을 위한 상태값 변경
        setToken(null);
        setAuthUser(null);
        navigate('/');
    };

    return (
        <>
            <div id="header" class="clearfix">
                <h1>
                    <Link to="/" rel="noreferrer noopener">High-Media-Academy Practice-Site</Link>
                </h1>
                {
                    (token != null) ? (
                        <ul>
                            <li> {authUser.name}님 안녕하세요^^</li>
                            <li><button class="btn_s" onClick={handleLogout}>로그아웃</button></li>
                            <li><Link to="/user/editform" class="btn_s">회원정보수정</Link></li>
                        </ul>
                    ) : (
                        <ul>
                            <li><Link to="/user/loginform" class="btn_s">로그인</Link></li>
                            <li><Link to="/user/joinform" class="btn_s">회원가입</Link></li>
                        </ul>
                    )}
            </div>
            {/* //header */}
            <div id="nav">
                <ul class="clearfix">
                    <li><Link to="">입사지원서</Link></li>
                    <li><Link to="/board/list">게시판</Link></li>
                    <li><Link to="/gallery">갤러리</Link></li>
                    <li><Link to="">방명록</Link></li>
                </ul>
            </div>
            {/* //nav */}
        </>
    );
}

export default Header;