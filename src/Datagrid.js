import React, { useState } from 'react';
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
  const columns = [
    { field: 'id', headerName: '/', width: 130 },
  ];

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
  
    return (
      <Wrapper>
          <DataGrid rows={rows} columns={columns} onEditCellChange={handleEditCellChange} />
      </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 80%;
    background: white;
`