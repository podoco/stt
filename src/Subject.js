import styled from "styled-components";
import { useRecoilState } from "recoil";
import { dataState } from "./store";

const subjects = [
  { title: "농경", id: 1 },
  { title: "가족", id: 2 },
  { title: "의", id: 3 },
  { title: "식", id: 4 },
  { title: "주", id: 5 },
  { title: "자연", id: 6 },
  { title: "건강", id: 7 },
  { title: "풍속", id: 8 },
  { title: "응급상황", id: 9 },
];

function Subject() {
  const [data, setData] = useRecoilState(dataState);
  const subject = data?.script?.domain;

  const handleChange = ({ target }) => {
    const index = target.options.selectedIndex;
    const { title } = subjects[index];

    setData((prevState) => {
      const newData = { ...prevState };
      const newScript = { ...newData.script };
      newScript.domain = title;
      newData.script = newScript;
      return newData;
    });
  };

  return (
    <Wrapper>
      <Select onChange={handleChange} value={subject} id="variation-select">
        {subjects.map(({ title, id }) => (
          <option key={id}>{title}</option>
        ))}
      </Select>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

const Select = styled.select`
  width: 100%;
  height: 30px;
  font-size: 18px;
  text-align: center;
  appearance: none; /* 기본 드롭다운 UI를 제거합니다. */
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='blue'><polygon points='0,0 10,0 5,5'/></svg>")
    no-repeat; /* 파란색 화살표 이미지를 배경으로 추가합니다. */
  background-position: right 10px center; /* 화살표 이미지 위치를 우측 정렬하고, 가운데로 위치하도록 설정합니다. */
  padding-right: 30px; /* 화살표 이미지가 너무 붙어있는 것을 방지하기 위해 padding을 추가합니다. */
`;

export default Subject;
