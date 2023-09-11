import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';

const labels: { [index: string]: string } = {
  0.5: '0.5점',
  1: '1점',
  1.5: '1.5점',
  2: '2점',
  2.5: '2.5점',
  3: '3점',
  3.5: '3.5점',
  4: '4점',
  4.5: '4.5점',
  5: '5점',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#279EFF',
  },
  '& .MuiRating-iconHover': {
    color: '#1D8CE7',
  },
});

export default function CustomizedRating({ value, setValue }: any) {
  const [hover, setHover] = useState(-1);

  return (
    <Box
      sx={{
        width: 300,
        display: 'flex',
        alignItems: 'center',
        mt: 1,
      }}
    >
      <StyledRating
        name="customized-color"
        value={value}
        precision={1}
        getLabelText={getLabelText}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(_, newHover) => {
          setHover(newHover);
        }}
        size="large"
        icon={<StarIcon fontSize="inherit" />}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
    </Box>
  );
}
