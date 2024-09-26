//import 라이브러리
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

//css 전역에 적용되지만 #user
import '../../css/user.css';

const LoginForm = () => {

    /*---라우터 관련-------------------------------*/

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const navigate = useNavigate("");
    /*---일반 변수--------------------------------*/

    /*---일반 메소드 -----------------------------*/

    /*---훅(useEffect)+이벤트(handle)메소드-------*/

    const handleId = (e) => {
        console.log('id입력');
        setId(e.target.value);
    };
    const handlePw = (e) => {
        console.log('비밀번호입력');
        setPw(e.target.value);
    };

    //로그인버튼 클릭했을 때(전송)
    const handleLogin = (e) => {
        //이벤트잡고
        e.preventDefault();
        console.log('로그인버튼 클릭');

        //데이터모으고 묶고
        const userVo = {
            id: id,
            password: pw // 자바 Vo에 필드 변수 확인. ※vo에는 password로 선언.
        };
        console.log(userVo);

        //전송
        axios({
            method: 'post',
            url: 'http://localhost:9000/api/users/login',
            //요청시 header, data, responseType
            headers: { 'Content-Type': 'application/json; charset=utf-8' }, // post, put
            data: userVo,

            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이터
            console.log(response.data.apiData); //수신데이터

            //헤더에서 토큰 꺼내기
            /* const token = response.headers.authorization.split(' ')[1];
                console.log(token);*/
            const token = response.headers['authorization'].split(' ')[1];
            console.log(token);

            //로컬스토리지에 토큰 저장
            localStorage.setItem("token", token);

            //로컬스토리지에 authUser 저장
            localStorage.setItem("authUser", JSON.stringify(response.data.apiData));

            //로그인 성공시, 메인 화면으로 이동
            navigate('/');


        }).catch(error => {
            console.error(error);
        })
    };
    //요청보내고
    //응답받아서
    //서버

    return (
        <>
            <div id="wrap">

                <div id="header" class="clearfix">
                    <h1>
                        <Link to="/">MySite</Link>
                    </h1>

                    {/*
                            <ul>
                                <li>황일영 님 안녕하세요^^</li>
                                <li><button class="btn_s" onClick={handleLogout}>로그아웃</button></li>
                                <li><Link to="" class="btn_s">회원정보수정</Link></li>
                            </ul>
*/}        
                            <ul>
                                <li><Link to="/user/loginform" class="btn_s">로그인</Link></li>
                                <li><Link to="/user/joinform" class="btn_s">회원가입</Link></li>
                            </ul>
                        
                </div>
                {/* //header */}

                <div id="nav">
                    <ul class="clearfix">
                        <li><Link to="">입사지원서</Link></li>
                        <li><Link to="">게시판</Link></li>
                        <li><Link to="">갤러리</Link></li>
                        <li><Link to="">방명록</Link></li>
                    </ul>
                </div>
                {/* //nav */}

                <div id="container" class="clearfix">
                    <div id="aside">
                        <h2>회원</h2>
                        <ul>
                            <li>회원정보</li>
                            <li>로그인</li>
                            <li>회원가입</li>
                        </ul>
                    </div>
                    {/* //aside */}

                    <div id="content">

                        <div id="content-head">
                            <h3>로그인</h3>
                            <div id="location">
                                <ul>
                                    <li>홈</li>
                                    <li>회원</li>
                                    <li class="last">로그인</li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        {/* //content-head */}

                        <div id="user">
                            <div id="loginForm">
                                <form action="" method="" onSubmit={handleLogin}>
                                    {/* 아이디 */}
                                    <div class="form-group">
                                        <label class="form-text" htmlFor="input-uid">아이디</label>
                                        <input type="text" id="input-uid" name="" value={id} placeholder="아이디를 입력하세요" onChange={handleId} />
                                    </div>

                                    {/* 비밀번호 */}
                                    <div class="form-group">
                                        <label class="form-text" htmlFor="input-pass">비밀번호</label>
                                        <input type="text" id="input-pass" name="" value={pw} placeholder="비밀번호를 입력하세요" onChange={handlePw} />
                                    </div>

                                    {/* 버튼영역 */}
                                    <div class="button-area">
                                        <button type="submit" id="btn-submit">로그인</button>
                                    </div>
                                </form>
                            </div>
                            {/* //loginForm */}
                        </div>
                        {/* //user */}
                    </div>
                    {/* //content  */}

                </div>
                {/* //container  */}

                <div id="footer">
                    Copyright ⓒ 2020 황일영. All right reserved
                </div>
                {/* //footer */}

            </div>
            {/* //wrap */}

        </>

    );

}

export default LoginForm;