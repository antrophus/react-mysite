//import 라이브러리
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../include/Header';
import Footer from '../include/Footer';

const Read = () => {
    /*---라우터관련-----*/
    const { no } = useParams();  // URL에서 게시글 번호 받아옴
    const navigate = useNavigate();
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )--*/
    const [board, setBoard] = useState([]);
    const authUser = JSON.parse(localStorage.getItem('authUser'));  // 로그인한 유저 정보
    
    /*---일반변수--------------------------------*/
    /*---일반메소드 -----------------------------*/
    /*---훅(useEffect)+이벤트(handle)메소드------*/

    useEffect(() => {
        // 게시글 데이터 가져오기
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/api/boards/${no}`,
            responseType: 'json'
        }).then(response => {
            if (response.data.result === 'success') {
                setBoard(response.data.apiData);  // 게시글 데이터 저장
                console.log(response.data.apiData);
            }
        }).catch(error => {
            console.error('게시글 불러오기 실패', error);
        });
    }, [no]);

    if (!board) {
        return <div>Loading...</div>;
    }

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
                            <div id="read">
                                <div className="form-group">
                                    <span className="form-text">작성자</span>
                                    <span className="form-value">{board.name}</span>
                                </div>

                                <div className="form-group">
                                    <span className="form-text">조회수</span>
                                    <span className="form-value">{board.hit}</span>
                                </div>

                                <div className="form-group">
                                    <span className="form-text">작성일</span>
                                    <span className="form-value">{board.regDate}</span>
                                </div>

                                <div className="form-group">
                                    <span className="form-text">제 목</span>
                                    <span className="form-value">{board.title}</span>
                                </div>

                                <div id="txt-content">
                                    <span className="form-value">
                                        {board.content}
                                    </span>
                                </div>

                                {/* 작성자 본인만 수정 버튼을 볼 수 있음 */}
                                {authUser && authUser.no === board.userNo && (
                                    <button
                                        id="btn_modify"
                                        onClick={() => navigate(`/board/edit/${board.no}`)}
                                    >
                                        수정
                                    </button>
                                )}
                                
                                <Link id="btn_list" to="/board/list">목록</Link>
                            </div>
                            {/* //read */}
                        </div>
                        {/* //board */}
                    </div>
                    {/* //content  */}
                </div>
                {/* //container  */}

                {/* footer */}
                <Footer />
                {/* //footer */}
            </div>
        </>
    );
}
export default Read;