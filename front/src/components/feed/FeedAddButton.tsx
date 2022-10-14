import styled from 'styled-components';
import AddIcon from '../../assets/images/icons/icon_plus.png';

function FeedAddButton() {
  return (
    <AddButton>
      <AddButtonIcon src={AddIcon} />
    </AddButton>
  );
}

const AddButton = styled.button`
  overflow: hidden;
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const AddButtonIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default FeedAddButton;
