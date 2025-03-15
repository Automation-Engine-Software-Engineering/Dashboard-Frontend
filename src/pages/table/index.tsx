// import { useEffect, useState } from "react";

// // import { getEntity } from "@/api/entitiy";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import { MoonLoader } from "react-spinners";

// import Box from "@/components/ui/box";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from "@/components/ui/table";

// const TablePage = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [tableItems, setTableItems] = useState<Record<string, any>>({});

//   // const { tableId } = useParams();
//   // const navigate = useNavigate();

//   // useEffect(() => {
//   //   (async () => {
//   //     try {
//   //       const tableData = await getEntity(tableId as string);
//   //       console.log(tableData);
//   //       setTableItems(tableData);
//   //     } catch {
//   //       toast.error("خطایی رخ داده است");
//   //       navigate("/dashboard");
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   })();
//   // }, []);

//   return (
//     <Box>
//       {isLoading ? (
//         <Loading />
//       ) : (
//         <Table>
//           <TableHeader className="rounded-t-md bg-[#EFF2F7]">
//             <TableRow>
//               {tableItems?.header?.map((item: any) => (
//                 <TableHead>{item}</TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {tableItems?.body?.map((item: any) => (
//               <TableRow>
//                 {Object.entries(item).map(([key, value]: any) => (
//                   <TableCell key={key} className="text-xs font-light">
//                     {value}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       )}
//     </Box>
//   );
// };

// export default TablePage;

// const Loading = () => {
//   return (
//     <div className="flex size-full items-center justify-center">
//       <MoonLoader color="#2A3042" size={50} />
//     </div>
//   );
// };
