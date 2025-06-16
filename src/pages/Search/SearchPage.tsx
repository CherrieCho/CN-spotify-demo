import { Box, Grid, Typography } from '@mui/material'
import { styled } from '@mui/system';
import React from 'react'
import useGetBrowseCategories from '../../hooks/useGetBrowseCategories';
import Loading from '../../common/components/Loading';

//색상 배열
const colourPalette = [
  "#E91429", // 강렬한 레드
  "#27856A", // 어두운 청록
  "#1E3264", // 진한 네이비
  "#E8115B", // 핫핑크
  "#8D67AB", // 연보라
  "#477D95", // 스틸블루
  "#D84000", // 오렌지
  "#7358FF", // 밝은 퍼플
  "#BA5D07", // 브라운
  "#B49BC8", // 라벤더 그레이
  "#B2B2B2", // 회색
  "#7A5CFA", // 보라색 계열
  "#148A08", // 진한 그린
  "#D8D8D8", // 연회색
  "#B02897", // 핑크 퍼플
  "#FF4632", // 진한 레드오렌지
  "#F59B23", // 밝은 오렌지
  "#777777", // 중간 회색
  "#0D73EC", // 밝은 파랑
  "#1D8954", // 초록
];

const SearchPageContainer = styled(Box)({
  overflowY: "auto",
  height: "calc(100% - 70px)",
    '&::-webkit-scrollbar': {
    scrollbarWidth: "none"
  },
});

const CardItem = styled(Box)({
  cursor: "pointer",
  position: "relative",
  height: "100%",
  paddingBottom: "56.25%",  //카드 비율 16:9로 유지
  width: "100%",
  overflow: "hidden", 
  borderRadius: "8px",
});

const MusicCardImage = styled("img")({
  position: "absolute",
  right: "0px",
  bottom: "0px",
  width: "45%",
  transform: "rotate(25deg) translate(18%, -2%)",
  borderRadius: "4px",
  boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 4px 0px",
});

const SearchPage = () => {
  //카테고리 데이터 불러오기
  const {data: categoryData, isLoading, error} = useGetBrowseCategories({
  locale: "ko_KR",
  limit: 40,
  offset: 0,
  });
  console.log("카테고리", categoryData?.categories.items)

  if(isLoading){
    return <Loading />
  }

  return (
    <SearchPageContainer>
      <Typography variant='h1' margin="16px 0">Browse all</Typography>

      <Grid container spacing={2} sx={{overflow: "hidden"}}>
        {categoryData?.categories.items.map((item) => {
          //랜덤 색상
          const randomColour = colourPalette[Math.floor(Math.random() * colourPalette.length)];

          return (
          <Grid size={{xs: 12, sm: 6, md: 4}} key={item.id} sx={{paddingLeft: "16px", paddingTop: "16px"}}>
            <CardItem sx={{backgroundColor: randomColour}}>
              <Typography variant='h1' sx={{fontSize: "1rem", padding: "16px", position: "absolute"}}>{item.name}</Typography>
              <MusicCardImage src={item.icons[0].url}/>
            </CardItem>
          </Grid>
          )
        })}
      </Grid>
    </SearchPageContainer>
  )
}

export default SearchPage