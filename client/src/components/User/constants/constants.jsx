import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const iconColor = "#2874f0";
export const myaccountMenu = [
    {
        title: "My Profile",
        link: "/",
        icon: <AccountCircleIcon color={iconColor} />,
    },
    {
        title: "Hashoppe Plus Zone",
        link: "/",
        icon: <BlurOnIcon color={iconColor} />,
    },
    {
        title: "Orders",
        link: "/",
        icon: <MoreHorizIcon color={iconColor} />,
    },
    {
        title: "Wishlist",
        link: "/",
        icon: <BookmarkBorderIcon color={iconColor} />,
    },
    {
        title: "Rewards",
        link: "/",
        icon: <EmojiEventsIcon color={iconColor} />,
    },
    {
        title: "Giftcards",
        link: "/",
        icon: <AccountBalanceWalletIcon color={iconColor} />,
    },
];


const constants = () => {
  return (
    <div>constants</div>
  )
}

export default constants