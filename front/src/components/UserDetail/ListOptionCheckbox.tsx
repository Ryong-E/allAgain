import styled from "styled-components";

interface OptionType {
  participated: boolean;
  hold: boolean;
}

interface ListOptionCheckboxProps {
  options: OptionType;
  setOption: React.Dispatch<React.SetStateAction<OptionType>>;
  isVisible: boolean;
}

function ListOptionCheckbox({
  options,
  setOption,
  isVisible,
}: ListOptionCheckboxProps) {
  return (
    <CheckboxContainer isVisible={isVisible}>
      <input
        id="participated"
        type="checkbox"
        defaultChecked={false}
        onChange={() =>
          setOption({ ...options, participated: !options.participated })
        }
      />
      <CheckboxLabel htmlFor="participated">참여한 캠페인</CheckboxLabel>
      <input
        id="hold"
        type="checkbox"
        defaultChecked={true}
        onChange={() => setOption({ ...options, hold: !options.hold })}
      />
      <CheckboxLabel htmlFor="hold">개최한 캠페인</CheckboxLabel>
    </CheckboxContainer>
  );
}

const CheckboxContainer = styled.div<{ isVisible: boolean }>`
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
`;
const CheckboxLabel = styled.label`
  display: inline-block;
  font-size: 15px;
  width: 120px;
  text-align: left;
  margin-left: 7px;
`;

export default ListOptionCheckbox;
