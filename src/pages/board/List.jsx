//import 라이브러리
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../include/Header';
import Footer from '../include/Footer';

//css
import '../../css/board.css';

const List = () => {

    /*---라우터 관련-------------------------------*/
    const [boardList, setBoardList] = useState([]);
    const authUser = JSON.parse(localStorage.getItem('authUser'));

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/

    /*---일반 변수--------------------------------*/

    /*---일반 메소드 -----------------------------*/
    const getBoardList = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/api/boards`,

            responseType: 'json', // 수신타입
        }).then(response => {
            console.log(response.data); // 수신데이터

            if (response.data.result === 'success') {
                setBoardList(response.data.apiData.boardList); // state변경
            }

        }).catch(error => {
            console.error(error); // 에러
        });
    };

    // 게시글 삭제
    const handleDelete = (boardNo) => {
        axios({
            method: 'DELETE',
            url: `${process.env.REACT_APP_API_URL}/api/boards/${boardNo}`,

        }).then(response => {
            if (response.data.result === 'success') {
                console.log("게시글 삭제 성공");
                getBoardList(); // 삭제 성공시, 다시 게시글 목록 가져오기
            }
        }).catch(error => {
            console.error("삭제 실패", error); // 에러
        });
    };

    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    useEffect(() => {
        console.log("마운트 됐어요");

        //서버에서데이터 가져오기 그리기
        getBoardList();
    }, []);

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
                            <li><Link to="">일반게시판</Link></li>
                            <li><Link to="">댓글게시판</Link></li>
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
                            <div id="list">
                                <form action="" method="">
                                    <div className="form-group text-right">
                                        <input type="text" />
                                        <button type="submit" id="btn_search">검색</button>
                                    </div>
                                </form>
                                <table >
                                    <thead>
                                        <tr>
                                            <th>번호</th>
                                            <th>제목</th>
                                            <th>글쓴이</th>
                                            <th>조회수</th>
                                            <th>작성일</th>
                                            <th>관리</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {boardList.map((boardVo) => (
                                            <tr key={boardVo.no}>
                                                <td>{boardVo.no}</td>
                                                <td className="text-left">
                                                    <Link to={`/board/read/${boardVo.no}`}>{boardVo.title}</Link>
                                                </td>
                                                <td>{boardVo.name}</td>
                                                <td>{boardVo.hit}</td>
                                                <td>{boardVo.regDate}</td>
                                                {authUser && authUser.no === boardVo.userNo ? (
                                                    <td><button onClick={() => handleDelete(boardVo.no)}>삭제</button></td>
                                                ) : (
                                                    <td>{""}</td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div id="paging">
                                    <ul>
                                        <li><Link to="">◀</Link></li>
                                        <li><Link to="">1</Link></li>
                                        <li><Link to="">2</Link></li>
                                        <li><Link to="">3</Link></li>
                                        <li><Link to="">4</Link></li>
                                        <li className="active"><Link to="">5</Link></li>
                                        <li><Link to="">6</Link></li>
                                        <li><Link to="">7</Link></li>
                                        <li><Link to="">8</Link></li>
                                        <li><Link to="">9</Link></li>
                                        <li><Link to="">10</Link></li>
                                        <li><Link to="">▶</Link></li>
                                    </ul>


                                    <div className="clear"></div>
                                </div>
                                <Link to="/board/write" id="btn_write">글쓰기</Link>

                            </div>
                            {/* //list */}
                        </div>
                        {/* //board */}
                    </div>
                    {/* //content  */}

                </div>
                {/* //container  */}


                {/*  footer  */}
                <Footer />
                {/*  //footer  */}
            </div>
            {/* //wrap */}

        </>

    );

}

export default List;