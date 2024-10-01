//import 라이브러리
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../include/Header';
import Footer from '../include/Footer';

const EditBoard = () => {
    /*---라우터관련-----*/
    const navigate = useNavigate();
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )--*/
    const { no } = useParams(); // URL에서 게시글 번호를 받아옴
    const authUser = JSON.parse(localStorage.getItem('authUser')); // 로그인한 유저 정보
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [hit, setHit] = useState('');
    const [regDate, setRegDate] = useState('');
    /*---일반변수--------------------------------*/
    /*---일반메소드 -----------------------------*/
    /*---훅(useEffect)+이벤트(handle)메소드------*/
    const handleTitle = (e) =>{
        console.log('제목변경');
        setTitle(e.target.value);
    }
    const handleContent = (e) => {
        console.log('내용변경');
        setContent(e.target.value);
    }

    useEffect(() => {
        console.log('마운트 되었을 때');
        // 게시글 데이터 가져오기
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/api/boards/${no}`,
            responseType: 'json'
        }).then(response => {
            console.log(response); //수신데이타
            console.log(response.data); //수신데이타

            const boardVo = response.data.apiData;

            if (response.data.result === 'success') {
                //가져온 데이터 화면에 반영
                setTitle(boardVo.title);
                setContent(boardVo.content);
                setHit(boardVo.hit);
                setRegDate(boardVo.regDate);
            }
        }).catch(error => {
            console.error('게시글 불러오기 실패', error);
        });
    }, []);

    // 폼 제출 처리
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("수정버튼 클릭");

        const boardVo = {
            no: no,
            title: title,
            content: content,
            userNo: authUser.no // 로그인한 유저의 번호
        };

        // PUT 요청으로 수정한 데이터를 서버로 전송
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API_URL}/api/boards/${no}`,
            headers: { "Content-Type": "application/json; charset=utf-8" },
            data: boardVo,
            responseType: 'json'
        }).then(response => {
            if (response.data.result === 'success') {
                alert('게시글 수정 성공!');
                navigate('/board/list'); // 성공 시 목록 페이지로 이동
            }
        }).catch(error => {
            console.error('게시글 수정 실패', error);
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
                            <li><Link to="/board/list">일반게시판</Link></li>
                            <li><Link to="#">댓글게시판</Link></li>
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
                            <div id="modifyForm">
                                <form onSubmit={handleSubmit}>
                                    {/* 작성자 */}
                                    <div className="form-group">
                                        <span className="form-text">작성자</span>
                                        <span className="form-value">{authUser.name}</span>
                                    </div>

                                    {/* 조회수 */}
                                    <div className="form-group">
                                        <span className="form-text">조회수</span>
                                        <span className="form-value">{hit}</span>
                                    </div>

                                    {/* 작성일 */}
                                    <div className="form-group">
                                        <span className="form-text">작성일</span>
                                        <span className="form-value">{regDate}</span>
                                    </div>

                                    {/* 제목 */}
                                    <div className="form-group">
                                        <label className="form-text" htmlFor="txt-title">제목</label>
                                        <input
                                            type="text"
                                            id="txt-title"
                                            name="title"
                                            value={title}
                                            onChange={handleTitle}
                                            required
                                        />
                                    </div>

                                    {/* 내용 */}
                                    <div className="form-group">
                                        <textarea
                                            id="txt-content"
                                            name="content"
                                            value={content}
                                            onChange={handleContent}
                                            required
                                        />
                                    </div>

                                    <button id="btn_modify" type="submit">수정</button>
                                    <Link id="btn_cancel" to="/board/list">취소</Link>
                                </form>
                            </div>
                            {/* //modifyForm */}
                        </div>
                        {/* //board */}
                    </div>
                    {/* //content */}
                </div>
                {/* //container */}

                {/* footer */}
                <Footer />
                {/* //footer */}
            </div>
        </>
    );
}
export default EditBoard;