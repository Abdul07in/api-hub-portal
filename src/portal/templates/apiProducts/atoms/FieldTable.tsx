import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import type { ApiSpec } from "@/common/interfaces/api";
import { CONTENT } from "../serviceconstant";

interface FieldTableProps {
  fields: ApiSpec["requestFields"];
}

export default function FieldTable({ fields }: FieldTableProps) {
  return (
    <TableContainer component={Paper} variant="outlined" className="field-table">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{CONTENT.fields.table.field}</TableCell>
            <TableCell>{CONTENT.fields.table.type}</TableCell>
            <TableCell>{CONTENT.fields.table.required}</TableCell>
            <TableCell>{CONTENT.fields.table.description}</TableCell>
            <TableCell>{CONTENT.fields.table.example}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((field) => (
            <TableRow key={field.name}>
              <TableCell sx={{ fontFamily: "monospace" }}>{field.name}</TableCell>
              <TableCell>
                {field.type}
                {field.enumValues ? ` (${field.enumValues.join(" | ")})` : ""}
              </TableCell>
              <TableCell>
                {field.required ? CONTENT.fields.table.yes : CONTENT.fields.table.no}
              </TableCell>
              <TableCell>{field.description}</TableCell>
              <TableCell>
                {field.example !== undefined ? String(field.example) : CONTENT.fields.table.empty}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
