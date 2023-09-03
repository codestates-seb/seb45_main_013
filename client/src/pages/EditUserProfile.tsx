import { styled } from 'styled-components';

// 보호자 or 펫시터 ?  (API)

const EditTitile = styled.div`
  ${(props) => props.theme.fontSize.s20h30};
`;

const EditUserProfile = () => {
  return (
    <>
      <EditTitile>회원정보 수정</EditTitile>
    </>
  );
};

export default EditUserProfile;
