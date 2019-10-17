import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody'
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const StyledDivTableResponsive = styled.div`
    min-height: 0.1%;
    overflow-x: auto;
`;
const StyledTable = styled(Table)`
    margin-bottom: 0;
    width: 100%;
    max-width: 100%;
    background-color: transparent;
    border-spacing: 0;
    border-collapse: collapse;
    overflow: auto;
    & > tbody > tr {
        height: auto;
    } 
    & > thead > tr {
        height: auto;
    }
`

const ModifiedTable = (props) => {
    const { tableHead, tableData, hover, ...others } = props;
    console.log(tableData);
    return(
        <>
        <StyledDivTableResponsive>
            <StyledTable>
                 {tableHead !== undefined ? (
                    <TableHead>
                        <TableRow>
                            {tableHead && tableHead.map((tableRowValue, index) => {
                                
                                return(
                                    <TableCell key={tableRowValue}>
                                        {tableRowValue}
                                    </TableCell>
                                )
                            })}
                        </TableRow>    
                    </TableHead>
                ) : null}
                <TableBody>
                    {tableData && tableData.map((tableRowValue, index) => {
                        if(tableRowValue.purchase){
                            return(
                                <TableRow key={tableRowValue} hover={hover}>
                                    <TableCell colSpan={tableRowValue.colspan}/>
                                    <TableCell>Total</TableCell>
                                    <TableCell>{tableRowValue.amount}</TableCell>
                                    <TableCell colSpan={tableRowValue.col.colspan}>{tableRowValue.col.text}</TableCell>
                                </TableRow> 
                            );
                        };
                        return(
                            <TableRow key={tableRowValue} hover={hover}>
                                {tableRowValue.map((tableCellValue, index) => {
                                    return(
                                        <TableCell key={{tableCellValue}}>
                                            {tableCellValue}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </StyledTable>
        </StyledDivTableResponsive>
        </>
    )
};

ModifiedTable.propTypes ={
    tableHead: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.array,
    hover: PropTypes.bool,
};

export default ModifiedTable;

