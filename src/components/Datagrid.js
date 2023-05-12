import React, { useState, useRef, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
  dataState,
  selectedColsState,
  selectionIndexState,
  dashsState,
  lengdsState,
} from "../store";

export default function Datagrid({ number }) {
  const [data, setData] = useRecoilState(dataState);
  const [selectedCols, setSelectedCols] = useRecoilState(selectedColsState);
  const [dashs, setDashs] = useRecoilState(dashsState);
  const [lengds, setLengds] = useRecoilState(lengdsState);

  const gridRef = useRef(null);
  const [selectionIndex, setSelectionIndex] =
    useRecoilState(selectionIndexState);

  const [rows, setRows] = useState([
    { id: "standard" },
    { id: "dialect" },
    { id: "pronunciation" },
    { id: "startTime" },
    { id: "endTime" },
  ]);
  const [columns, setColumns] = useState([
    { field: "id", headerName: "/", width: 130 },
  ]);

  const changeDataForColsRows = () => {
    const segments = data.transcription.segments;
    const dash = dashs[number];
    const lengd = lengds[number];
    const newRows = [
      { id: "standard" },
      { id: "dialect" },
      { id: "pronunciation" },
      { id: "startTime" },
      { id: "endTime" },
    ];
    const newColumns = [
      { field: "id", headerName: "/", width: 130, sortable: false },
    ];

    for (let i = dash; i < dash + lengd; i++) {
      if (segments[i] && segments[i].standard) {
        newRows[0][i] = segments[i].standard; // standard
      }
      if (segments[i] && segments[i].dialect) {
        newRows[1][i] = segments[i].dialect; // dialect
      }
      if (segments[i] && segments[i].pronunciation) {
        newRows[2][i] = segments[i].pronunciation; // pronunciation
      }
      if (segments[i] && segments[i].startTime) {
        newRows[3][i] = segments[i].startTime; // startTime
      }
      if (segments[i] && segments[i].endTime) {
        newRows[4][i] = segments[i].endTime; // endTime
      }

      newColumns.push({
        field: `${i}`,
        width: 150,
        editable: true,
        sortable: false,
      });
    }

    setRows(newRows);
    setColumns(newColumns);
  };

  useEffect(() => {
    changeDataForColsRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleEditCellChange = (params) => {
    let { id, field, value } = params;
    const dash = dashs[number];
    const lengd = lengds[number];
    const lastsegmentsnumber = data.transcription.segments.length - 1;
    //dialect 1 value

    //audio 시간, segments 바꾸기
    setData((prevData) => {
      const script = { ...prevData };
      const data = [...script.transcription.segments];
      let audiostart = { ...script.audio.speechStartTime };
      let audiolast = { ...script.audio.speechEndTime };
      let sentenceStart = [...script.transcription.sentences];
      let sentenceLast = [...script.transcription.sentences];

      if (data[field]) {
        if (field === "0" && id === "startTime") {
          audiostart = value;
          script.audio = { ...script.audio, speechStartTime: audiostart };

          const updateSentenceStart = { ...sentenceStart[0], startTime: value };
          sentenceStart[0] = updateSentenceStart;
          script.transcription = {
            ...script.transcription,
            sentences: sentenceStart,
          };
        }
        if (field === String(lastsegmentsnumber) && id === "endTime") {
          audiolast = value;
          script.audio = { ...script.audio, speechEndTime: audiolast };

          const updateSentenceLast = {
            ...sentenceStart[number],
            endTime: value,
          };
          sentenceLast[number] = updateSentenceLast;
          script.transcription = {
            ...script.transcription,
            sentences: sentenceLast,
          };
        }
        const updatedSegment = { ...data[field], [id]: value };
        data[field] = updatedSegment;
      }

      script.transcription = { ...script.transcription, segments: data };
      return script;
    });

    // transcription.sentence
    setData((prevData) => {
      const script = { ...prevData };
      const sentences = [...script.transcription.sentences];
      const Segmentswords = prevData.transcription.segments;
      let sentence = "";

      for(let i = dash; i<dash+lengd; i++ ){
        if (Segmentswords[i][id]===null|| Segmentswords[i][id] === undefined){
          sentence += Segmentswords[i].dialect + ' '
        }else{
          sentence += Segmentswords[i][id]+' '
        }
      }
      sentences[number] = { ...sentences[number], [id]: sentence };

      script.transcription = { ...script.transcription, sentences };

      return script;
    });

    setData((prevData) => {

      const sentences = { ...prevData.transcription };
      const Segmentswords = prevData.transcription.segments;
      let sentence = "";

      for (let i = 0; i < Segmentswords.length; i++) {
        if (Segmentswords[i][id] === null || Segmentswords[i][id] === undefined){
          sentence += Segmentswords[i].dialect + ' '
        }else{
          sentence += Segmentswords[i][id] + ' ';
        }
      }
      const updatedTranscription = { ...sentences, [id]: sentence };
      const updatedData = {
        ...prevData,
        transcription: updatedTranscription,
      };
      return updatedData;
    });


  };

  const handleAddColumn = (index) => {
    if (index === null) return;
    const newField = index + 1;
    const _dashs = [...dashs];
    const _lengds = [...lengds];
    _lengds[number] += 1;

    for (let i = number + 1; i < _dashs.length; i++) {
      _dashs[i] += 1;
    }
    setDashs(_dashs);
    setLengds(_lengds);

    setData((prevData) => {
      const script = { ...prevData };
      const data = [...script.transcription.segments];
      data.splice(newField, 0, {
        orderInFile: newField + 1,
        startTime: null,
        endTime: null,
        dialect: null,
        pronunciation: null,
        standard: null,
        voiceType: "voice_speech",
      });
      const result = data.map((_data, i) => {
        return {
          orderInFile: i + 1,
          startTime: _data.startTime,
          endTime: _data.endTime,
          dialect: _data.dialect,
          pronunciation: _data.pronunciation,
          standard: _data.standard,
          voiceType: _data.voiceType,
        };
      });
      script.transcription = { ...script.transcription, segments: result };
      return script;
    });
  };

  const handleMergeColumn = () => {
    if (selectedCols.length === 0) return;
    const _dashs = [...dashs];
    const _lengds = [...lengds];

    _lengds[number] -= selectedCols.length - 1;
    for (let i = number + 1; i < _dashs.length; i++) {
      _dashs[i] -= selectedCols.length - 1;
    }
    setDashs(_dashs);
    setLengds(_lengds);

    const _selectedCols = [...selectedCols];
    _selectedCols.sort();
    const finalSequence = _selectedCols.reduce((prev, current, i, arr) => {
      let _prev = prev + 1;
      if (_prev !== current) return arr.splice(1);
      return _prev;
    });
    if (finalSequence !== _selectedCols[_selectedCols.length - 1]) {
      alert("연속된 수를 입력해주세요!");
      return;
    }

    const newField = _selectedCols[0];

    setData((prevData) => {
      const script = { ...prevData };
      const data = [...script.transcription.segments];
      const newData = {
        startTime: null,
        endTime: null,
        dialect: null,
        pronunciation: null,
        standard: null,
      };
      Object.keys(newData).forEach((key) => {
        const _rowDatas = [];
        _selectedCols.forEach((index) => {
          if (data[index][key]) {
            _rowDatas.push(data[index][key]);
          }
        });
        if (key === "startTime") {
          newData[key] = _rowDatas[0];
        } else if (key === "endTime") {
          newData[key] = _rowDatas[_rowDatas.length - 1];
        } else {
          newData[key] = _rowDatas ? _rowDatas.join(" ") : null;
        }
      });

      data.splice(newField, _selectedCols.length, {
        orderInFile: newField + 1,
        startTime: newData["startTime"],
        endTime: newData["endTime"],
        dialect: newData["dialect"] ? newData["dialect"] : null,
        pronunciation: newData["pronunciation"]
          ? newData["pronunciation"]
          : null,
        standard: newData["standard"] ? newData["standard"] : null,
        voiceType: "voice_speech",
      });

      const result = data.map((_data, i) => {
        return {
          orderInFile: i + 1,
          startTime: _data.startTime,
          endTime: _data.endTime,
          dialect: _data.dialect,
          pronunciation: _data.pronunciation,
          standard: _data.standard,
          voiceType: _data.voiceType,
        };
      });

      script.transcription = { ...script.transcription, segments: result };
      return script;
    });
    setSelectedCols([]);
  };

  // getCell 메소드를 사용하여 선택한 셀의 위치를 확인합니다.
  const handleCellClick = (params, event) => {
    const { colDef } = params;

    setSelectionIndex(parseInt(colDef.field));

    if (params.field === "id") return;

    if (!event.altKey) {
      selectedCols.forEach((index) => {
        columns[index + 1].cellClassName = "";
        setColumns([...columns]);
      });
      setSelectedCols([]);
    } else {
      colDef.cellClassName = "selected";
      if (selectedCols.indexOf(colDef.field) !== -1) return;
      setSelectedCols([...selectedCols, parseInt(colDef.field)]);
    }
  };

  return (
    <Wrapper>
      <DataGrid
        ref={gridRef}
        rows={rows}
        columns={columns}
        onCellClick={handleCellClick}
        cellMode // 셀 선택 모드 활성화
        editable={true}
        onCellEditCommit={handleEditCellChange}
 
      />
      <BtnWrapper>
        <AddBtn onClick={() => handleAddColumn(selectionIndex)}>
          오른쪽에 추가
        </AddBtn>
        <MergeBtn onClick={() => handleMergeColumn()}>병합하기</MergeBtn>
      </BtnWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 80%;
  background: white;
`;

const BtnWrapper = styled.div`
  display: flex;
  margin-top: 15px;
`;

const AddBtn = styled.div`
  width: 100px;
  background-color: rgb(239, 239, 239);
  text-align: center;
  padding: 5px;
  margin-right: 10px;
  border-radius: 2px;
  border: 1px solid gray;
  cursor: pointer;
  &:hover {
    background-color: rgb(230, 230, 230);
  }
`;

const MergeBtn = styled.div`
  width: 100px;
  background-color: rgb(239, 239, 239);
  text-align: center;
  padding: 5px;
  border-radius: 2px;
  border: 1px solid gray;
  cursor: pointer;
  &:hover {
    background-color: rgb(230, 230, 230);
  }
`;
