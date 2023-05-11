import React, { useState, useRef, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { dataState, selectedColsState } from "../store";

export default function Datagrid({ lengd, dash }) {
  const [data, setData] = useRecoilState(dataState);
  const [selectedCols, setSelectedCols] = useRecoilState(selectedColsState);
  const segments = data.transcription.segments;
  const segmentsLength = lengd;

  const gridRef = useRef(null);
  const [selectionIndex, setSelectionIndex] = useState();

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

  useEffect(() => {
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

    for (let i = dash; i < dash + segmentsLength; i++) {
      newRows[0][i] = segments[i].standard; // standard
      newRows[1][i] = segments[i].dialect; // dialect
      newRows[2][i] = segments[i].pronunciation; // pronunciation
      newRows[3][i] = segments[i].startTime; // startTime
      newRows[4][i] = segments[i].endTime; // endTime
    }

    for (let i = dash; i < dash + segmentsLength; i++) {
      newColumns.push({
        field: `${i}`,
        width: 150,
        editable: true,
        sortable: false,
      });
    }

    setRows(newRows);
    setColumns(newColumns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleEditCellChange = (params) => {
    // console.log(params);
    const { id, field, value } = params;
    //dialect 1 value

    setData((prevData) => {
      const script = { ...prevData };
      const data = [...script.transcription.segments];
      const updatedSegment = { ...data[field], [id]: value };
      data[field] = updatedSegment;
      script.transcription = { ...script.transcription, segments: data };
      return script;
    });
  };

  const handleAddColumn = (index) => {
    if (index === null) return;
    const newField = index + 1;

    setData((prevData) => {
      const script = { ...prevData };
      const data = [...script.transcription.segments];
      data.splice(newField, 0, {
        orderInFile: newField + 1,
        voiceType: "voice_speech",
        startTime: null,
        endTime: null,
        pronunciation: null,
        standard: null,
        dialect: null,
      });
      script.transcription = { ...script.transcription, segments: data };
      return script;
    });
  };

  const handleMergeColumn = () => {
    if (selectedCols.length === 0) return;

    const _selectedCols = [...selectedCols];
    // selectedCols check
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
    const newData = {
      standard: null,
      dialect: null,
      pronunciation: null,
      startTime: null,
      endTime: null,
    };
    rows.forEach((row) => {
      const _rowDatas = [];
      _selectedCols.forEach((index) => {
        if (row[String(index)]) {
          _rowDatas.push(row[String(index)]);
        }
        delete row[String(index)];
      });
      if (row.id === "startTime") {
        newData[row.id] = _rowDatas[0];
      } else if (row.id === "endTime") {
        newData[row.id] = _rowDatas[_rowDatas.length - 1];
      } else {
        newData[row.id] = _rowDatas ? _rowDatas.join(" ") : null;
      }
      row[newField] = newData[row.id];
      return row;
    });

    setData((prevData) => {
      const script = { ...prevData };
      const data = [...script.transcription.segments];
      data.splice(newField, _selectedCols.length, {
        orderInFile: newField + 1,
        voiceType: "voice_speech",
        ...newData,
      });
      script.transcription = { ...script.transcription, segments: data };
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

  // 셀에서 떠날때 디버깅
  const handleCellBlur = (params) => {
    // console.log(
    //   "그 전 셀에 있는 것",
    //   "field:",
    //   params.field,
    //   "id:",
    //   params.id,
    //   "value:",
    //   params.value
    // );
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
        onCellBlur={handleCellBlur}
      />
      <button onClick={() => handleAddColumn(selectionIndex)}>Add</button>
      <button onClick={() => handleMergeColumn()}>Merge</button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 80%;
  background: white;
`;
