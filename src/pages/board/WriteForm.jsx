//import 라이브러리
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../include/Header';
import Footer from '../include/Footer';


const WriteForm = () => {
    /*---라우터관련-----*/
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )--*/
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const authUser = JSON.parse(localStorage.getItem('authUser')); // 로그인한 유저 정보
    const navigate = useNavigate();
    /*---일반변수--------------------------------*/
    /*---일반메소드 -----------------------------*/
    /*---훅(useEffect)+이벤트(handle)메소드------*/

    // 폼 제출 처리
    const handleSubmit = (e) => {
        e.preventDefault();

        const boardVo = {
            title: title,
            content: content,
            userNo: authUser.no, // 로그인한 유저의 번호
        };

        // POST 요청으로 글을 서버에 등록
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}/api/boards`,
            headers: { "Content-Type": "application/json; charset=utf-8" },
            data: boardVo,
            responseType: 'json'
        }).then(response => {
            console.log(response);

            if (response.data.result === 'success') {
                // 성공시 글 작성 창 닫기
                navigate('/board/list');
            }
        }).catch(error => {
            console.error(error);

        });
    };

    return (
        <>
            <div id="wrap">
                {/* header */}
                <Header />
                {/* //header */}
                <div id="container" className="clearfix">
                    <div id="aside">
                        <h2>게시판</h2>
                        <ul>
                            <li><a href="/boards">일반게시판</a></li>
                            <li><a href="#">댓글게시판</a></li>
                        </ul>
                    </div>
                    {/* //aside */}

                    <div id="content">
                        <div id="content-head">
                            <h3>일반게시판</h3>
                            <div id="location">
                                <ul>
                                    <li>홈</li>
                                    <li>게시판</li>
                                    <li className="last">일반게시판</li>
                                </ul>
                            </div>
                            <div className="clear"></div>
                        </div>
                        {/* //content-head */}

                        <div id="board">
                            <div id="writeForm">
                                <form action="" method="" onSubmit={handleSubmit}>
                                    {/* 제목 */}
                                    <div className="form-group">
                                        <label className="form-text" htmlFor="txt-title">제목</label>
                                        <input
                                            type="text"
                                            id="txt-title"
                                            name="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="제목을 입력해 주세요"
                                            required
                                        />
                                    </div>

                                    {/* 내용 */}
                                    <div className="form-group">
                                        <textarea
                                            id="txt-content"
                                            name="content"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            placeholder="내용을 입력해 주세요"
                                            required
                                        />
                                    </div>

                                    <button id="btn_add" type="submit">등록</button>
                                    <button id="btn_cancel" type="button" onClick={() => navigate('/board/list')}>취소</button>
                                </form>
                            </div>
                            {/* //writeForm */}
                        </div>
                        {/* //board */}
                    </div>
                    {/* //content */}
                </div>
                {/* //container */}

                {/*  footer  */}
                <Footer />
                {/*  //footer  */}
            </div>
        </>
    );
};
    export default WriteForm;