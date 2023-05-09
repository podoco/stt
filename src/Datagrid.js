import React, { useState, useRef, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import styled from 'styled-components';


export default function Datagrid({data,setNewData,startTime,endTime}) {


  const segments = data.transcription.segments.filter(segment => {
    const segmentStartTime = (segment.startTime);
    const segmentEndTime = (segment.endTime);
    return segmentStartTime >= startTime && segmentEndTime <= endTime;
  });
  const segmentsLength = segments.length;


  const gridRef = useRef(null);
  const [selectionState, setSelectionState] = useState({ selectedRowIndex: null, selectedCellIndex: null });
  
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
    console.log('뉴데이터',data.transcription.segments); 
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
  
    for (let i = 0; i < segmentsLength; i++) {
      newRows[0][i+1] = segments[i].standard;  // standard
      newRows[1][i+1] = segments[i].dialect; // dialect
      newRows[2][i+1] = segments[i].pronunciation; // pronunciation
      newRows[3][i+1] = (segments[i].startTime); // startTime
       newRows[4][i+1] = (segments[i].endTime); // endTime
    }
  
    for (let i = 0; i < segmentsLength; i++) {
       newColumns.push({ field: `${i+1}`,width: 150, editable: true });
    }
  
    setRows(newRows);
    setColumns(newColumns);
  }, [data]);
  

  const handleEditCellChange = (params) => {
    // // 수정된 셀 데이터를 unsavedData에 저장
    // setUnsavedData(prevData => {
    //   const newData = { ...prevData };
    //   newData[params.id] = { ...newData[params.id], [params.field]: params.value };
    //   return newData;
    // });
  }

  const handleAddColumn = (index) => {
    const newColumns = [...columns];
    const newColumnIndex = index;
    const newRows =[...rows];
  
    // 새로운 열 추가
  
    newColumns.splice(newColumnIndex, 0, { field:index, width: 150, editable: true });
     setColumns(newColumns);
     setRows(newRows);

    //예시
    // setNewData(prevState => {
    //   const script = {...prevState};
    //   const data = [...script.transcription.segments]
    //   data[0].dialect = 'dkdk';
    //   script.transcription.segments = data;
    //   return {...prevState , script}
    // });

  };

  // getCell 메소드를 사용하여 선택한 셀의 위치를 확인합니다.
  const handleCellClick = (params, event) => {
    const { row, colDef } = params;
    console.log(`Selected row: ${row.id}, column: ${colDef.field}`);
    setSelectionState({ selectedRowIndex: row.id, selectedCellIndex: colDef.field });
  };

  // // 셀에서 떠날때 디버깅
  // const handleCellBlur = (params) => {
  //   console.log('선택자',params.field - wordCountStart);
  //   console.log('파람id',params.id);
  //   console.log('파람value',params.value);
  //   console.log('아아아',newData.transcription.segments[1]);
  // };

  // const Save = () => {
  //   // unsavedData를 newData에 덮어쓰기
  //   setNewData(prevData => {
  //     const script = { ...prevData };
  //     const data = [...script.transcription.segments];
 
  //     for (const id in unsavedData) {
  //       const segmentIndex = unsavedData[id].index - wordCountStart;
  //       data[segmentIndex].dialect = unsavedData[id].dialect;
  //     }
  
  //     script.transcription.segments = data;
  //     return { ...prevData, script };
  //   });
  
  //   // unsavedData 초기화
  //   setUnsavedData(null);
  // };

    return (
      <Wrapper>
          <DataGrid 
            ref={gridRef}
            rows={rows} 
            columns={columns} 
            onCellClick={handleCellClick}
            cellMode // 셀 선택 모드 활성화
            onEditCellChange={handleEditCellChange} 
            // onCellBlur={handleCellBlur}
          />

          <button onClick={() => handleAddColumn(parseInt(selectionState.selectedCellIndex)+1)}>Add</button>
          {/* <button onClick={Save}>save</button> */}
      </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 80%;
    background: white;
`