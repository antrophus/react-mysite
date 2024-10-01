import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../include/Header';
import Footer from '../include/Footer';

const Gallery = () => {
    /*---라우터 관련-------------------------------*/

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [galleryList, setGalleryList] = useState([]);
    /*---일반 변수--------------------------------*/

    /*---일반 메소드 -----------------------------*/

    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    useEffect(() => {

        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/gallery`,
            headers: { "Content-Type": "application/json" },
            responseType: 'json'
        }).then(response => {
            console.log(response);
            console.log(response.data);
            console.log(response.data.apiData);
            console.log(response.data.apiData[0].filePath);

            if (response.data.result === 'success') {
                setGalleryList(response.data.apiData);
            } else {
                console.error('갤러리 목록 조회 실패');
                setGalleryList([]);
            }
        }).catch(error => {
            console.error('갤러리 목록 조회 실패:', error);
            setGalleryList([]);
        });
    }, []);

    return (
        <>
            <div id="wrap">
                {/* header */}
                <Header />
                {/* //header */}
                <div id="container" className="clearfix">
                    <div id="aside">
                        <h2>갤러리</h2>
                        <ul>
                            <li><Link to="/gallery/general">일반갤러리</Link></li> {/* a 태그를 Link로 변경 */}
                            <li><Link to="/gallery/upload">파일첨부연습</Link></li> {/* a 태그를 Link로 변경 */}
                        </ul>
                    </div>
                    {/* //aside */}

                    <div id="content">
                        <div id="content-head">
                            <h3>일반갤러리</h3>
                            <div id="location">
                                <ul>
                                    <li><Link to="/">홈</Link></li> {/* a 태그를 Link로 변경 */}
                                    <li><Link to="/gallery">갤러리</Link></li> {/* a 태그를 Link로 변경 */}
                                    <li className="last">일반갤러리</li>
                                </ul>
                            </div>
                            <div className="clear"></div>
                        </div>
                        {/* //content-head */}

                        <div id="gallery">
                            <div id="list">
                                <Link to="/gallery/upload" id="btnImgUpload" >이미지올리기</Link>
                                <div className="clear"></div>

                                <ul id="viewArea">
                                    {/* 이미지반복영역 */}

                                    {galleryList.map(galleryItem => (
                                        <li key={galleryItem.no}>
                                            <div className="view" >
                                                <div className="imgTitle">제목: <strong>{galleryItem.content}</strong></div>
                                                <img className="imgItem" src={`${process.env.REACT_APP_API_URL}/upload/${galleryItem.saveName}`} alt={galleryItem.orgName} />
                                                <div className="imgWriter">작성자: <strong>{galleryItem.author}</strong></div>
                                            </div>
                                        </li>
                                    ))}
                                    {/* 이미지반복영역 */}
                                </ul>
                            </div>
                            {/* //list */}
                        </div>
                        {/* //gallery */}
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

export default Gallery;
