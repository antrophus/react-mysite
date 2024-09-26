//import 라이브러리
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//css
import '../../css/user.css';

const EditForm = () => {
    /*---라우터관련-----*/
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )--*/
    /*---일반변수--------------------------------*/
    const token = localStorage.getItem('token');
    console.log(token);
    /*---일반메소드 -----------------------------*/
    /*---훅(useEffect)+이벤트(handle)메소드------*/
    useEffect(() => {
        console.log('마운트 되었을 때');

        axios({

            method: 'get',
            // put, post, delete

            url: 'http://localhost:9000/api/users/me',
            headers: { "Authorization": `Bearer ${token}` },

            responseType: 'json' //수신타입

        }).then(response => {

            console.log(response); //수신데이타
            console.log(response.data); //수신데이타
            console.log(response.data.apiData); //수신데이타
            console.log(response.data.result); //수신데이타

        }).catch(error => {

            console.log(error);

        });

    }, []);

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
                        <li><Link to="" class="btn_s">로그아웃</Link></li>
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
                            <h3>회원정보</h3>
                            <div id="location">
                                <ul>
                                    <li>홈</li>
                                    <li>회원</li>
                                    <li class="last">회원정보</li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        {/* //content-head */}

                        <div id="user">
                            <div id="modifyForm">
                                <form action="" method="">

                                    {/* 아이디 */}
                                    <div class="form-group">
                                        <label class="form-text" for="input-uid">아이디</label>
                                        <span class="text-large bold">userid</span>
                                    </div>

                                    {/* 비밀번호 */}
                                    <div class="form-group">
                                        <label class="form-text" for="input-pass">패스워드</label>
                                        <input type="text" id="input-pass" name="" value="" placeholder="비밀번호를 입력하세요" />
                                    </div>

                                    {/* 이메일 */}
                                    <div class="form-group">
                                        <label class="form-text" for="input-name">이름</label>
                                        <input type="text" id="input-name" name="" value="" placeholder="이름을 입력하세요" />
                                    </div>

                                    {/* //나이 */}
                                    <div class="form-group">
                                        <span class="form-text">성별</span>

                                        <label for="rdo-male">남</label>
                                        <input type="radio" id="rdo-male" name="" value="" />

                                        <label for="rdo-female">여</label>
                                        <input type="radio" id="rdo-female" name="" value="" />

                                    </div>

                                    {/* 버튼영역 */}
                                    <div class="button-area">
                                        <button type="submit" id="btn-submit">회원정보수정</button>
                                    </div>

                                </form>


                            </div>
                            {/* //modifyForm */}
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
export default EditForm;