//import 라이브러리
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../include/Header';
import Footer from '../include/Footer';



const Upload = () => {

    /*---라우터 관련-------------------------------*/

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [profileImg, setProfileImg] = useState([]);
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [userNo, setUserNo] = useState(0);
    /*---일반 변수--------------------------------*/
    const token = localStorage.getItem('token');
    const authUser = JSON.parse(localStorage.getItem('authUser')); // authUser를 JSON 형식으로 변환

    /*---일반 메소드 -----------------------------*/
    const navigate = useNavigate();
    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    const handleImg = (e) => {
        console.log('파일');
        setProfileImg(e.target.files[0]); //파일은 배열로 담긴다. value가 아니라 files에 담긴다.
    };

    const handleContent = (e) => {
        console.log('내용');
        setContent(e.target.value);
    };

    const handleSubmit = (e) => {
        //이벤트 잡기
        e.preventDefault();
        console.log('전송');

        //데이터 모으기(묶기)
        const formData = new FormData();
        formData.append('author', author); //  로그인한 유저의 name을 추가
        formData.append('userNo', userNo); //  로그인한 유저의 no를 추가
        formData.append('content', content); //  input
        formData.append('img', profileImg);
        // formData.append('추가정보', title); // 추가로 넣을 데이터가 있을경우 append로 추가해준다.

        //서버로 전송
        axios({
            method: 'post',
            // put, post, delete

            url: `${process.env.REACT_APP_API_URL}/api/gallery`,

            headers: { "Content-Type": "multipart/form-data", 'Authorization': `Bearer ${token}` }, //첨부파일
            data: formData, // 첨부파일 multipart방식

            responseType: 'json' //수신타입
        }).then(response => {

            console.log(response); //수신데이타
            const saveName = response.data.apiData;
            console.log(saveName); //저장된 이미지 파일이름
            //결과페이지로 이동
            navigate('/gallery/');

        }).catch(error => {

            console.log(error);

        });
    };

    useEffect(() => {
        console.log('업로드 폼 들어왔을 때: 로그인 유저의 아이디가 있어야 함');

        if (authUser) {
            setAuthor(authUser.name); // localStorage의 authUser에서 name을 가져와 설정
            setUserNo(authUser.no); // localStorage의 authUser에서 no를 가져와 설정
        } else {
            // 로그인 하지 않은 유저는 업로드를 할 수 없음
            alert('로그인하세요');
            navigate('/');  
        }
    }, [authUser, navigate]);

    return (
        <>
            <div id="wrap">
                {/* header */}
                <Header />
                {/* //header */}
                <div id='gallery'>
                    <div id="container" className="clearfix">
                        <div id="aside">
                            <h2>갤러리</h2>
                            <ul>
                                <li><Link to="/gallery">일반갤러리</Link></li>
                                <li><Link to="/attach/result">파일첨부연습</Link></li>
                            </ul>
                        </div>
                        {/* //aside */}
                        <div id="content">
                            <div id="content-head">
                                <h3>첨부파일연습</h3>
                                <div id="location">
                                    <ul>
                                        <li>홈</li>
                                        <li>갤러리</li>
                                        <li className="last">첨부파일연습</li>
                                    </ul>
                                </div>
                                <div className="clear"></div>
                            </div>
                            {/* //content-head */}
                            <div id="file">
                                <form action="" method="post" onSubmit={handleSubmit}>
                                    <table>
                                        <colgroup>
                                            <col style={{ width: '600px' }} />
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <td className="text-left" ><input type="text" name="author" placeholder='작성자이름(로그인유저)' value={author} onChange={handleContent} /></td>
                                            </tr>
                                            <tr>
                                                <td className="text-left" ><input type="text" name="content" placeholder='content' value={content} onChange={handleContent} /></td>
                                            </tr>
                                            <tr>
                                                <td className="text-left"><input type="file" name="file" onChange={handleImg} /></td>
                                            </tr>
                                            <tr>
                                                <td className="text-center"><button type="submit">파일업로드</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            {/* //file */}
                        </div>
                        {/* //content  */}
                    </div>
                    {/* //container  */}
                </div>
                {/* <!-- footer --> */}
                <Footer />
                {/* <!-- //footer --> */}
            </div>
            {/* //wrap */}
        </>
    );
}

export default Upload;