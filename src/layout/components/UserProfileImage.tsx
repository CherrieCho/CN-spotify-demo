import React, { SyntheticEvent, useState } from 'react'
import { Menu, MenuItem, styled, Tooltip } from '@mui/material';
import { User } from '../../models/user';
import { useLocation, useNavigate } from 'react-router';

interface Props {
  userProfile: User;
}

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

const UserProfileImage = ({userProfile}: Props) => {
  //드롭다운 메뉴
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //로그아웃(토큰 다삭제하고 새고)
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("code_verifier");
    if(location.pathname === '/'){
      window.location.reload();
    }else{
      window.location.reload();
      navigate('/');
    }
  }

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
      <ProfileContainer
        id="profile-pic"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Tooltip title="settings">
          <ProfilePic
            src={profileImageUrl}
            alt='user-img'
            onError={addDefaultImg}
          />
        </Tooltip>
      </ProfileContainer>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          list: {
            'aria-labelledby': 'profile-pic',
          },
          paper: {
            sx: {
              overflow: 'visible',
            },
          },
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default UserProfileImage