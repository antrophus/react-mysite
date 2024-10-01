//import 라이브러리
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../include/Header';
import Footer from '../include/Footer';

//css
import '../../css/user.css';

const JoinForm = () => {

    /*---라우터 관련-------------------------------*/

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");

    const navigate = useNavigate();

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
    const handleName = (e) => {
        console.log('이름입력');
        setName(e.target.value);
    };
    const handleGender = (e) => {
        console.log('성별선택');
        setGender(e.target.value);
        console.log(e.target.value);
    };

    //회원가입버튼 클릭
    const handleJoin = (e) => {
        e.preventDefault();
        const userVo = {
            id: id,
            password: pw,
            name: name,
            gender: gender
        };
        console.log("회원가입요청");
        console.log(userVo);

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}/api/users`,

            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            data: userVo,

            responseType: 'json'
        }).then(response => {
            console.log(response);
            console.log(response.data);

            if (response.data.result === 'success') {
                console.log("조인성공");
                //리다이렉트
                navigate('/user/joinok');

            } else {
                alert(response.data.message);
            }
        }).catch(error => {
            console.error(error);
        })
    };

    //중복체크 버튼 클릭
    const handleCheckId = () => {
        console.log("중복체크");

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/users/checkid?id=${id}`
            //headers: { 'Content-Type': 'application/json; charset=utf-8' },
            
        }).then(response => {
            console.log(response);
            console.log(response.data);
            console.log(response.data.result);

            if (response.data.result === 'success') {
                alert('사용할 수 있는 ID입니다.');
            } else {
                alert(response.data.message);
                setId('');

            }

        }).catch(error => {
            console.error(error);
        })
    };
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
                            <h3>회원가입</h3>
                            <div id="location">
                                <ul>
                                    <li>홈</li>
                                    <li>회원</li>
                                    <li class="last">회원가입</li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        {/* //content-head */}

                        <div id="user">
                            <div id="joinForm">
                                <form action="" method="" onSubmit={handleJoin}>

                                    {/* 아이디 */}
                                    <div class="form-group">
                                        <label class="form-text" htmlFor="input-uid">아이디</label>
                                        <input type="text" id="input-uid" name="" value={id} placeholder="아이디를 입력하세요" onChange={handleId} />
                                        <button type="button" id="" onClick={handleCheckId}>중복체크</button>
                                    </div>

                                    {/* 비밀번호 */}
                                    <div class="form-group">
                                        <label class="form-text" htmlFor="input-pass">패스워드</label>
                                        <input type="text" id="input-pass" name="" value={pw} placeholder="비밀번호를 입력하세요" onChange={handlePw} />
                                    </div>

                                    {/* 이메일 */}
                                    <div class="form-group">
                                        <label class="form-text" htmlFor="input-name">이름</label>
                                        <input type="text" id="input-name" name="" value={name} placeholder="이름을 입력하세요" onChange={handleName} />
                                    </div>

                                    {/* //나이 */}
                                    <div class="form-group">
                                        <span class="form-text">성별</span>

                                        <label htmlFor="rdo-male">남</label>
                                        <input type="radio" id="rdo-male" name="gender" value="남" onChange={handleGender} />

                                        <label htmlFor="rdo-female">여</label>
                                        <input type="radio" id="rdo-female" name="gender" value="여" onChange={handleGender} />

                                    </div>

                                    {/* 약관동의 */}
                                    <div class="form-group">
                                        <span class="form-text">약관동의</span>

                                        <input type="checkbox" id="chk-agree" value="" name="" required />
                                        <label htmlFor="chk-agree">서비스 약관에 동의합니다.</label>
                                    </div>

                                    {/* 버튼영역 */}
                                    <div class="button-area">
                                        <button type="submit" id="btn-submit">회원가입</button>
                                    </div>

                                </form>
                            </div>
                            {/* //joinForm */}
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

export default JoinForm;