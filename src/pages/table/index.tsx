import Box from "@/components/ui/box";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const TablePage = () => {
  return (
    <Box>
      <Table>
        <TableHeader className="rounded-t-md bg-[#EFF2F7]">
          <TableRow>
            <TableHead>هدر 1</TableHead>
            <TableHead>هدر 2</TableHead>
            <TableHead>هدر 3</TableHead>
            <TableHead>هدر 4</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-xs font-light">تست ۱</TableCell>
            <TableCell className="text-xs font-light">تست 2</TableCell>
            <TableCell className="text-xs font-light">تست 3</TableCell>
            <TableCell className="text-xs font-light">تست 4</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-xs font-light">تست 1</TableCell>
            <TableCell className="text-xs font-light">تست 2</TableCell>
            <TableCell className="text-xs font-light">تست 3</TableCell>
            <TableCell className="text-xs font-light">تست 4</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-xs font-light">تست 1</TableCell>
            <TableCell className="text-xs font-light">تست 2</TableCell>
            <TableCell className="text-xs font-light">تست 3</TableCell>
            <TableCell className="text-xs font-light">تست 4</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default TablePage;
