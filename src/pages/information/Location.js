import React, { useEffect } from "react";
import {
  LocationWrap,
  MapInfoList,
  MapWrap,
} from "../../styles/information/info";
import { PageTitle } from "../../styles/basic";
const { kakao } = window;
const Location = () => {
  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도 표시 div
      mapOption = {
        center: new kakao.maps.LatLng(35.868308904058466, 128.59396835957114), // 지도 좌표
        level: 3, // 지도 확대 레벨
        mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
      };

    // 지도생성
    var map = new kakao.maps.Map(mapContainer, mapOption);
    // 마커 이미지의 주소
    var markerImageUrl = "/images/information/marker_p.png",
      markerImageSize = new kakao.maps.Size(40, 42), // 마커 이미지의 크기
      markerImageOptions = {
        offset: new kakao.maps.Point(17, 13), // 마커 좌표에 일치시킬 이미지 안의 좌표
      };

    // 마커 이미지를 생성한다
    var markerImage = new kakao.maps.MarkerImage(
      markerImageUrl,
      markerImageSize,
      markerImageOptions,
    );

    // 지도에 마커를 생성하고 표시한다
    var marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(35.868308904058466, 128.59396835957114), // 마커의 좌표
      image: markerImage, // 마커의 이미지
      map: map, // 마커를 표시할 지도 객체
    });

    // 마커클릭시 카카오맵 이동
    kakao.maps.event.addListener(marker, "click", function () {
      window.open("https://kko.to/oEvShdHKrr", "_blank");
    });
  }, []);
  return (
    <LocationWrap>
      <PageTitle>오시는길</PageTitle>
      <MapWrap>
        <div id="map"></div>
      </MapWrap>
      <MapInfoList>
        <li>
          <img src="/images/information/location.svg" alt="주소아이콘" />
          <h4>주소</h4>
          <p>서울특별시 어쩌구 저쩌동 무슨길 12</p>
        </li>
        <li>
          <img src="/images/information/call.svg" alt="전화아이콘" />
          <h4>전화</h4>
          <p>02-1234-5678</p>
        </li>
        <li>
          <img src="/images/information/email.svg" alt="이메일아이콘" />
          <h4>이메일</h4>
          <p>green@naver.com</p>
        </li>
        <li>
          <img src="/images/information/schoolBus.svg" alt="스쿨버스아이콘" />
          <h4>스쿨버스 운행</h4>
          <p>9:00부터~ 14:00까지</p>
        </li>
      </MapInfoList>
    </LocationWrap>
  );
};

export default Location;
