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
      <div>
        <CheckboxLabel htmlFor="participated">
          참여한 캠페인
          <input
            id="participated"
            type="checkbox"
            defaultChecked={false}
            onChange={() =>
              setOption({ ...options, participated: !options.participated })
            }
          />
          <span className="checkmark"></span>
        </CheckboxLabel>
      </div>
      <div>
        <CheckboxLabel htmlFor="hold">
          등록한 캠페인
          <input
            id="hold"
            type="checkbox"
            defaultChecked={true}
            onChange={() => setOption({ ...options, hold: !options.hold })}
          />
          <span className="checkmark"></span>
        </CheckboxLabel>
      </div>
    </CheckboxContainer>
  );
}

const CheckboxContainer = styled.div<{ isVisible: boolean }>`
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  display: flex;

  & > div {
    position: relative;
    padding-left: 25px;
    margin-bottom: 12px;
    cursor: pointer;
    user-select: none;
    margin-right: 30px;

    &:hover input ~ .checkmark {
      background: #a8e0db;
    }

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;

      &:checked ~ .checkmark {
        background-color: ${({ theme })=> theme.colors.dasidaGreen};
      }

      &:checked ~ .checkmark:after {
        display: block;
      }
    }

    .checkmark {
      position: absolute;
      top: 2.5px;
      left: 0;
      height: 1.4em;
      width: 1.4em;
      background: #d1edeb;
      border-radius: 5px;
      transition: ease .3s;
    }

    .checkmark:after {
      display: none;
      content: "";
      position: absolute;
      top: 10%;
      left: 35%;
      width: .35em;
      height: .7em;
      border: solid white;
      border-width: 0 2.5px 2.5px 0;
      transform: rotate(45deg);
    }
  }

`;

const CheckboxLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  margin-left: 7px;
  cursor: pointer;
`;

export default ListOptionCheckbox;
