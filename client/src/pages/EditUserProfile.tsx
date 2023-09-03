import styled from 'styled-components';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';

import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionGroup from '@mui/joy/AccordionGroup';
import AccordionSummary from '@mui/joy/AccordionSummary';

// 보호자 or 펫시터 ?  (API)

const EditTitile = styled.div`
  ${(props) => props.theme.fontSize.s20h30};
`;

const EditUserProfile = () => {
  return (
    <>
      <EditTitile>회원정보 수정</EditTitile>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
      <AccordionGroup>
        <Accordion>
          <AccordionSummary>Title</AccordionSummary>
          <AccordionDetails>Content</AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </>
  );
};

export default EditUserProfile;
