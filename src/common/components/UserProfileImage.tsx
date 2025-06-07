import React, { SyntheticEvent } from 'react'
import { styled } from '@mui/material';
import { User } from '../../models/user';

interface Props {
  userProfile: User;
}

const UserProfileImage = ({userProfile}: Props) => {

  const ProfileContainer = styled("div")({
    width: "45px",
    height: "45px",
    borderRadius: "70%",
    overflow: "hidden"
});

  const ProfilePic = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover"
});

  const defaultImg = "https://i.pinimg.com/1200x/9f/16/72/9f1672710cba6bcb0dfd93201c6d4c00.jpg";

  //images가 빈 배열일 경우
  const profileImageUrl = userProfile.images && userProfile.images.length > 0
    ? userProfile.images[0].url
    : defaultImg;

  //onError처리
  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
      e.currentTarget.src = defaultImg;
    };

  return (
    <div>
      <ProfileContainer>
        <ProfilePic src={profileImageUrl} alt='user-img' onError={addDefaultImg} />
      </ProfileContainer>
    </div>
  )
}

export default UserProfileImage