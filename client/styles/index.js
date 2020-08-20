import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core';

export const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 20,
  padding: '0 20px',
});

export const Background = styled(Toolbar)({
  background: 'linear-gradient(45deg, #FE6242 30%, #FF2445 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
});

export const ImageBG = styled(Box)({
  borderRadius: 7,
  boxShadow: '0 1px 30px 0px gray',
  color: 'black',
});

export const ReviewBG = styled(Box)({
  borderRadius: 3,
  height: 200,
  boxShadow: '0 3px 5px 2px #b81a06',
  backgroundColor: '#FAEBD7',
  color: 'black',
});

export const logoTitle = {
  display: 'inline-block',
  color: 'white',
  position: 'absolute',
  marginLeft: '60px',
};

export const userPictureStyle = {
  width: '50px',
  height: '50px',
  display: 'inline-block',
  marginLeft: '800px',
  borderRadius: '50%',
  verticalAlign: 'middle',
};

export const userNameStyle = {
  display: 'inline-block',
  color: 'white',
  textAlign: 'right',
};

export const profileImageStyle = {
  position: 'absolute',
  marginBottom: '20px',
  width: '150px',
  height: '150px',
};

export const profileBioStyle = {
  maxWidth: '700px',
  marginLeft: '300px',
  marginBottom: '10px',
  positon: 'absolute',
  padding: '42px',
};
