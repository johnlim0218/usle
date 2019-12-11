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
const StyledTableCell = styled(TableCell)`
    text-align: center;
    min-width: 120px;
`

const ModifiedTable = (props) => {
    const { tableHead, tableData, tableFooter, hover, ...others } = props;

    return(
        <StyledDivTableResponsive>
            <StyledTable>

                {tableHead !== undefined ? (
                    <TableHead>
                        <TableRow>
                            {tableHead && tableHead.map((tableRowValue, index) => {
                                return(
                                    <StyledTableCell key={tableRowValue.id}>
                                        {tableRowValue.name}
                                    </StyledTableCell>
                                )
                            })}
                        </TableRow>    
                    </TableHead>
                ) : null}

                <TableBody>
                    {tableData && Array.isArray(tableData) ? (tableData.map((tableRowValue, index) => {
                        return(
                            <TableRow key={tableRowValue[0].key} hover={hover}>
                                {tableRowValue.map((tableCellValue, index) => {
                                    return(
                                        <StyledTableCell key={tableHead[index].id}>
                                            {tableCellValue}
                                        </StyledTableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })) : (
                       <TableRow hover={hover}>
                            <StyledTableCell colSpan={tableData.colspan}>
                                {tableData.content}
                            </StyledTableCell>
                       </TableRow>
                    )}
                </TableBody>

                <TableBody>
                    {tableFooter && tableFooter.purchase && (
                                <TableRow hover={hover}>
                                    <TableCell colSpan={tableFooter.colspan}/>
                                    <TableCell>Total</TableCell>
                                    <TableCell>{tableFooter.amount}</TableCell>
                                    {tableFooter.col && 
                                        <TableCell colSpan={tableFooter.col.colspan}>
                                            {tableFooter.col.text}
                                        </TableCell>
                                    }
                                </TableRow> 
                            )
                    }
                </TableBody>

            </StyledTable>
        </StyledDivTableResponsive>
    )
};

ModifiedTable.propTypes ={
    tableHead: PropTypes.array,
    tableData: PropTypes.array,
    tableFooter: PropTypes.object,
    hover: PropTypes.bool,
};

export default ModifiedTable;

