//import 라이브러리
import React, {useState} from 'react';
import { Link } from 'react-router-dom';

//css 전역에 적용되지만 #main 아래만 적용되도록  css를 코딩했음
import '../../css/main.css';

const Main = () => {

    /*---라우터 관련-------------------------------*/
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));

    // const userName = JSON.parse(authUser).name;
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/

    /*---일반 변수--------------------------------*/
    // const token = localStorage.getItem('token');

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
        
    };

    return (

        <>

            <div id="wrap">

                <div id="header" className="clearfix">
                    <h1>
                        <Link to="/" rel="noreferrer noopener">MySite</Link>
                    </h1>

                    {
                        (token != null) ? (
                            <ul>
                                <li> {authUser.name}님 안녕하세요^^</li>
                                <li><button className="btn_s" onClick={handleLogout}>로그아웃</button></li>
                                <li><Link to="/user/editform" className="btn_s">회원정보수정</Link></li>
                            </ul>
                        ) : (
                            <ul>
                                <li><Link to="/user/loginform" className="btn_s">로그인</Link></li>
                                <li><Link to="/user/joinform" className="btn_s">회원가입</Link></li>
                            </ul>
                        )}
                </div>
                {/* //header */}

                <div id="nav">
                    <ul className="clearfix">
                        <li><Link to="">입사지원서</Link></li>
                        <li><Link to="">게시판</Link></li>
                        <li><Link to="">갤러리</Link></li>
                        <li><Link to="">방명록</Link></li>
                    </ul>
                </div>
                {/* //nav */}


                <div id="container" className="clearfix">
                    {/* aside 없음 */}
                    <div id="full-content">

                        {/* content-head 없음 */}
                        <div id="main">

                            <img id="profile-img" src="/images/profile.jpg" alt="프로필 사진" />

                            <div id="greetings">
                                <p className="text-xlarge">
                                    <span className="bold">안녕하세요!!<br />
                                        황일영의 MySite에 오신 것을 환영합니다.<br />
                                        <br />
                                        이 사이트는 웹 프로그램밍 실습과제 예제 사이트입니다.<br />
                                    </span>
                                    <br />
                                    사이트 소개, 회원가입, 방명록, 게시판으로 구성되어 있으며<br />
                                    jsp&serlvet(모델2) 방식으로 제작되었습니다.<br />
                                    <br />
                                    자바 수업 + 데이터베이스 수업 + 웹프로그래밍 수업<br />
                                    배운 거 있는거 없는 거 다 합쳐서 만들어 놓은 사이트 입니다.<br />
                                    <br />
                                    (자유롭게 꾸며보세요!!)<br />
                                    <br /><br />
                                    <Link to="" className="" >[방명록에 글 남기기]</Link>
                                </p>
                            </div>
                            {/* //greetings */}

                            <div className="clear"></div>

                        </div>
                        {/* //index */}<br />

                    </div>
                    {/* //full-content */}<br />


                </div>
                {/* <!-- //container --> */}


                <div id="footer">
                    Copyright ⓒ 2020 황일영. All right reserved
                </div>
                {/* <!-- //footer --> */}

            </div >

        </>

    );

}

export default Main;