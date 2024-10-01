//import 라이브러리
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../include/Header';
import Footer from '../include/Footer';

//css
import '../../css/user.css';

const EditForm = () => {
    /*---라우터관련-----*/
    const navigate = useNavigate();

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )--*/
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [pw, setPw] = useState('');
    const [gender, setGender] = useState('');

    /*---일반변수--------------------------------*/
    const token = localStorage.getItem('token');

    /*---일반메소드 -----------------------------*/
    /*---훅(useEffect)+이벤트(handle)메소드------*/
    //패스워드창에 값이 변할 때
    const handlePw = (e) => {
        console.log('비밀번호입력');
        setPw(e.target.value);
    };
    //이름 창에 값이 변할 때
    const handleName = (e) => {
        console.log('이름입력');
        setName(e.target.value);
    };
    //성별 선택 값이 변할 때
    const handleGender = (e) => {
        console.log('성별선택');
        setGender(e.target.value);
        console.log(e.target.value);
    };

    //회원정보 폼 들어왔을 때
    useEffect(() => {
        console.log('마운트 되었을 때');

        axios({
            method: 'get',  // put, post, delete
            url: `${process.env.REACT_APP_API_URL}/api/users/me`,
            headers: { "Authorization": `Bearer ${token}` },

            responseType: 'json' //수신타입

        }).then(response => {
            console.log(response); //수신데이타
            console.log(response.data); //수신데이타

            const userVo = response.data.apiData;

            if (response.data.result === 'success') {
                // 가져온 데이타 화면에 반영
                setId(userVo.id);
                setName(userVo.name);
                setPw(userVo.password);
                setGender(userVo.gender);

            } else {
                alert('확인하세요');
            }

        }).catch(error => {
            console.log(error);
        });
    }, []);

    //수정버튼 클릭 이벤트
    const handlUpdate = (e) => {
        e.preventDefault();
        console.log('수정버튼 클릭');

        const userVo = {
            name: name,
            password: pw,
            gender: gender
        }
        console.log(userVo);

        axios({
            method: 'put',
            // put, post, delete

            url: `${process.env.REACT_APP_API_URL}/api/users/me`,

            //get delete

            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`  // Bearer token
            }, // post put

            data: userVo, // put, post, JSON(자동변환됨)

            responseType: 'json' //수신타입

        }).then(response => {
            console.log(response); //수신데이타
            if (response.data.result === 'success') {
                //성공로직 {
                console.log(response.data.apiData); //
                const authUser = response.data.apiData;
                console.log(authUser);
                //로컬스토리지의 authUser의 이름을 수정한 이름으로 변경 - 서버어서 받아온 userVo를 로컬스토리지에 넣음
                localStorage.setItem('authUser', JSON.stringify(authUser));

                //메인 리다이렉트
                navigate('/');

            } else {
                alert('수정 실패');
            }

        }).catch(error => {
            console.log(error);

        });
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
                                <form action="" method="" onSubmit={handlUpdate}>

                                    {/* 아이디 */}
                                    <div class="form-group">
                                        <label class="form-text" for="input-uid">아이디</label>
                                        <span class="text-large bold">{id}</span>
                                    </div>

                                    {/* 비밀번호 */}
                                    <div class="form-group">
                                        <label class="form-text" for="input-pass">패스워드</label>
                                        <input type="password" id="input-pass" name="" value={pw} placeholder="비밀번호를 입력하세요" onChange={handlePw} />
                                    </div>

                                    {/* 이메일 */}
                                    <div class="form-group">
                                        <label class="form-text" for="input-name">이름</label>
                                        <input type="text" id="input-name" name="" value={name} placeholder="이름을 입력하세요" onChange={handleName} />
                                    </div>

                                    {/* //나이 */}
                                    <div class="form-group">
                                        <span class="form-text">성별</span>

                                        <label for="rdo-male">남</label>
                                        <input type="radio" id="rdo-male" name="gender" value="남" onChange={handleGender} checked={gender.includes('남')} />

                                        <label for="rdo-female">여</label>
                                        <input type="radio" id="rdo-female" name="gender" value="여" onChange={handleGender} checked={gender.includes('여')} />

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

                {/* <!-- footer --> */}
                <Footer />
                {/* <!-- //footer --> */}

            </div>
            {/* //wrap */}
        </>
    );
}
export default EditForm;