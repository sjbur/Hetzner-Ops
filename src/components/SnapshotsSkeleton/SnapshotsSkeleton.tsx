import { TableRow, TableCell, Skeleton } from '@mui/material'

export function SnapshotsSkeleton() {
  return (
    <>
      {[1, 2, 3].map((key) => (
        <TableRow key={key}>
          <TableCell>
            <Skeleton variant="text" width={60} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={200} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={150} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={80} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rounded" width={80} height={24} />
          </TableCell>
          <TableCell align="right">
            <Skeleton variant="circular" width={32} height={32} />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
