import { TableRow, TableCell, Skeleton, Box } from '@mui/material'

export function SSHKeysSkeleton() {
  return (
    <>
      {[1, 2, 3].map((key) => (
        <TableRow key={key}>
          <TableCell>
            <Skeleton variant="text" width={200} />
          </TableCell>
          <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Skeleton variant="text" width={300} />
              <Skeleton variant="circular" width={24} height={24} />
            </Box>
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={150} />
          </TableCell>
          <TableCell align="right">
            <Skeleton variant="circular" width={32} height={32} />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
