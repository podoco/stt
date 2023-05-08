import React, { useState, useRef, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import styled from 'styled-components';
import data from './data.json'

export default function Datagrid({startTime,endTime}) {

  const segments = data.transcription.segments.filter(segment => {
    const segmentStartTime = (segment.startTime);
    const segmentEndTime = (segment.endTime);
    return segmentStartTime >= startTime && segmentEndTime <= endTime;
  });
  const segmentsLength = segments.length;
  const gridRef = useRef(null);
  const [selectionState, setSelectionState] = useState({ selectedRowIndex: null, selectedCellIndex: null });
  
  useEffect(() => {
    console.log('ㄴㅇㄴㅁㅇ',selectionState); // selectionState 변경 시 로그 출력
  }, [selectionState]);
  
  const [rows, setRows] = useState([
    { id: "standard"},
    { id: "dialect"},
    { id: "pronunciation"},
    { id: "startTime"},
    { id: "endTime"},
  ]);

  for (let i = 0; i < segmentsLength; i++) {
    rows[0][i+1] = segments[i].standard;  // standard
    rows[1][i+1] = segments[i].dialect; // dialect
    rows[2][i+1] = segments[i].pronunciation; // pronunciation
    rows[3][i+1] = (segments[i].startTime); // startTime
    rows[4][i+1] = (segments[i].endTime); // endTime
  }

  const [columns, setColumns] = useState([
    { field: 'id', headerName: '/', width: 130 },
  ]);

  // console.log(columns);

  for (let i = 0; i < segmentsLength; i++) {
    columns.push({ field: `${i+1}`,width: 150, editable: true });
  }

  const handleEditCellChange = (params) => {
    const updatedRows = rows.map((row) => {
      if (row.id === params.id) {
        return { ...row, [params.field]: params.value };
      }
      return row;
    });
    setRows(updatedRows);
  };
  
  const handleAddColumn = (index) => {
    
    console.log('rows',rows[1][1])
    const newColumns = [...columns];
    const newColumnIndex = index;
    const newRows = [...rows];
    // 새로운 열 추가
    
  // 선택된 id값 이후의 그리드들의 id값을 1씩 증가시킴
  for (let i = segmentsLength + 1; i > index; i--) {
    newRows[0][i] = { ...rows[0][i - 1], field: `${i}` }; // standard
    newRows[1][i] = { ...rows[1][i - 1], field: `${i}` }; // dialect
    newRows[2][i] = { ...rows[2][i - 1], field: `${i}` }; // pronunciation
    newRows[3][i] = { ...rows[3][i - 1], field: `${i}` }; // startTime
    newRows[4][i] = { ...rows[4][i - 1], field: `${i}` }; // endTime
  }
  
  // 선택된 id값에 해당하는 그리드를 추가하고, id값을 수정함
  newColumns.splice(newColumnIndex, 0, { field: `${index}`, width: 150, editable: true });

  setColumns(newColumns);
  setRows(newRows);
  };



  // getCell 메소드를 사용하여 선택한 셀의 위치를 확인합니다.
  const handleCellClick = (params, event) => {
    const { row, colDef } = params;
    console.log(`Selected row: ${row.id}, column: ${colDef.field}`);
    setSelectionState({ selectedRowIndex: row.id, selectedCellIndex: colDef.field });
  };

 
    return (
      <Wrapper>
          <DataGrid 
            ref={gridRef}
            rows={rows} 
            columns={columns} 
            onCellClick={handleCellClick}
            cellMode // 셀 선택 모드 활성화
            onEditCellChange={handleEditCellChange} 
          />

          <button onClick={() => handleAddColumn(parseInt(selectionState.selectedCellIndex)+1)}>Add</button>
      </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 80%;
    background: white;
`