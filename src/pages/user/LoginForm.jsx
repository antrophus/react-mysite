//import 라이브러리
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

import Header from '../include/Header';
import Footer from '../include/Footer';

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
            url: `${process.env.REACT_APP_API_URL}/api/users/login`,
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
                {/* header */}
                <Header />
                {/* //header */}
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
                {/* <!-- footer --> */}
                <Footer />
                {/* <!-- //footer --> */}
            </div>
            {/* //wrap */}
        </>
    );
}

export default LoginForm;