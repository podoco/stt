import React, { useState, useRef, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import styled from 'styled-components';


export default function Datagrid({data,setData,lengd,dash}) {

  const segments = data.transcription.segments
  const segmentsLength = lengd;

  const gridRef = useRef(null);
  const [selectionState, setSelectionState] = useState({ selectedRowIndex: null, selectedCellIndex: null, value:null });
  
  const [rows, setRows] = useState([
    { id: "standard"},
    { id: "dialect"},
    { id: "pronunciation"},
    { id: "startTime"},
    { id: "endTime"},
  ]);
  const [columns, setColumns] = useState([
    { field: 'id', headerName: '/', width: 130 },
  ]);

  useEffect(() => {
 
    const newRows = [
      { id: "standard"},
      { id: "dialect"},
      { id: "pronunciation"},
      { id: "startTime"},
      { id: "endTime"},
    ];
    const newColumns = [
      { field: 'id', headerName: '/', width: 130 },
    ];
  
    for (let i = dash; i < dash+ segmentsLength; i++) {
      newRows[0][i] = segments[i].standard;  // standard
      newRows[1][i] = segments[i].dialect; // dialect
      newRows[2][i] = segments[i].pronunciation; // pronunciation
      newRows[3][i] = (segments[i].startTime); // startTime
      newRows[4][i] = (segments[i].endTime); // endTime
    }
  
    for (let i = dash; i < dash+segmentsLength; i++) {
       newColumns.push({ field: `${i}`,width: 150, editable: true });
    }
  
    setRows(newRows);
    setColumns(newColumns);
  }, [data]);
  

  const handleEditCellChange = (params) => {
    console.log(params);
    const { id, field, value } = params;
    console.log('y',id,field,value);

    setData((prevData) => {
      const newData = { ...prevData };
      const [number, i] = field.split('_');
      
      newData.transcription.segments[number].dialect = value;
      return newData;
    });
  }

  const handleAddColumn = (index) => {
    const newColumns = [...columns];
    const newRows = [...rows];
   
    const [number, i] = index.split('_');
    const newField = `${number}_${parseInt(i, 10) + 1}`;

    console.log(newField);
    // 새로운 열 추가
    const insertIndex = newColumns.findIndex((column) => column.field === index) + 1;
    console.log('인덱스',insertIndex);
    newColumns.splice(insertIndex, 0, { field: newField, width: 150, editable: true });
  
    setColumns(newColumns);
    setRows(newRows);
  };

  // getCell 메소드를 사용하여 선택한 셀의 위치를 확인합니다.
  const handleCellClick = (params, event) => {
    const { row, colDef,value } = params;
    console.log('클릭시',`row: ${row.id}, column: ${colDef.field} value:${value}`);
    setSelectionState({ selectedRowIndex: row.id, selectedCellIndex: colDef.field });
  };

  // 셀에서 떠날때 디버깅
  const handleCellBlur = (params) => {
    console.log('그 전 셀에 있는 것','field:',params.field, 'id:',params.id,'value:',params.value);
    const { id, field, value } = params;

    // setData((prevData) => {
    //   const newData = { ...prevData };
    //   const [number, i] = field.split('_');
      
    //   newData.transcription.segments[number].dialect = value;
    //   return newData;
    // });
  };

  const Save = () => {

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
            onCellBlur={handleCellBlur}
          />
          <button onClick={() => handleAddColumn((selectionState.selectedCellIndex))}>Add</button>
          <button onClick={Save}>save</button>
      </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 80%;
    background: white;
`