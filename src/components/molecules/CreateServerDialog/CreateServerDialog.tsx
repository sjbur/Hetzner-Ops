import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Typography,
  Fade,
} from '@mui/material'
import { useState, useEffect, useMemo } from 'react'
import { hetznerService } from '@/services/hetznerService'
import { useNotifications } from '@/hooks/useNotifications'

interface CreateServerDialogProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

interface ServerType {
  id: number
  name: string
  description: string
  cores: number
  memory: number
  disk: number
  prices: Array<{
    location: string
    price_monthly: {
      gross: string
    }
  }>
}

interface Image {
  id: number
  name: string
  type: string
  description: string
}

interface Location {
  id: string
  name: string
  country: string
  city: string
}

const locations: Location[] = [
  { id: 'nbg1', name: 'Nuremberg', country: 'Germany', city: 'Nuremberg' },
  { id: 'fsn1', name: 'Falkenstein', country: 'Germany', city: 'Falkenstein' },
  { id: 'hel1', name: 'Helsinki', country: 'Finland', city: 'Helsinki' },
  { id: 'ash', name: 'Ashburn', country: 'United States', city: 'Ashburn, VA' },
]

export function CreateServerDialog({
  open,
  onClose,
  onSuccess,
}: CreateServerDialogProps) {
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const [serverData, setServerData] = useState({
    name: '',
    server_type: '',
    image: '',
    location: 'nbg1',
    start_after_create: true,
  })

  const [serverTypes, setServerTypes] = useState<ServerType[]>([])
  const [images, setImages] = useState<Image[]>([])

  const [nameError, setNameError] = useState<string>('')

  const { showSuccess, showError } = useNotifications()

  useEffect(() => {
    if (open) {
      setLoadingData(true)
      Promise.all([hetznerService.getServerTypes(), hetznerService.getImages()])
        .then(([typesResponse, imagesResponse]) => {
          setServerTypes(typesResponse.server_types)
          setImages(imagesResponse.images)
        })
        .catch((error) => {
          console.error('Failed to load server types and images:', error)
        })
        .finally(() => {
          setLoadingData(false)
        })
    }
  }, [open])

  const getServerTypePrice = (serverType: ServerType, location: string) => {
    const price = serverType.prices.find((p) => p.location === location)
    if (!price) return 'N/A'

    const formattedPrice = Number(price.price_monthly.gross).toFixed(2)
    return formattedPrice
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await hetznerService.createServer(serverData)
      showSuccess('Server created successfully')
      onSuccess()
      onClose()
      setServerData({
        name: '',
        server_type: '',
        image: '',
        location: 'nbg1',
        start_after_create: true,
      })
    } catch (error) {
      console.error('Failed to create server:', error)
      showError('Failed to create server')
    } finally {
      setLoading(false)
    }
  }

  const selectedServerType = serverTypes.find(
    (type) => type.id.toString() === serverData.server_type,
  )

  const validateServerName = (name: string): string => {
    if (!name) {
      return 'Server name is required'
    }

    if (name.length > 63) {
      return 'Server name must be less than 64 characters'
    }

    if (!/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/i.test(name)) {
      return 'Server name may only contain letters, numbers, periods, and dashes, and must start and end with a letter or number'
    }

    if (/[.-]{2,}/.test(name)) {
      return 'Server name must not contain consecutive periods or dashes'
    }

    return ''
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setServerData({ ...serverData, name: newName })
    setNameError(validateServerName(newName))
  }

  const isCreateDisabled = useMemo(() => {
    return (
      loading ||
      loadingData ||
      Boolean(nameError) ||
      !serverData.name ||
      !serverData.server_type ||
      !serverData.image
    )
  }, [loading, loadingData, nameError, serverData])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Fade}
      TransitionProps={{
        timeout: 200,
      }}
    >
      <DialogTitle>Create New Server</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Server Name"
            value={serverData.name}
            onChange={handleNameChange}
            fullWidth
            required
            disabled={loading}
            error={Boolean(nameError)}
            helperText={
              nameError || 'Use letters, numbers, periods, and dashes'
            }
            inputProps={{
              pattern: '[a-zA-Z0-9.-]*',
              maxLength: 63,
            }}
          />

          <FormControl fullWidth required>
            <InputLabel>Server Type</InputLabel>
            <Select
              value={serverData.server_type}
              label="Server Type"
              onChange={(e) =>
                setServerData({ ...serverData, server_type: e.target.value })
              }
              disabled={loading || loadingData}
            >
              {serverTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  <Box>
                    <Typography variant="subtitle1">{type.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {type.cores} CPU • {type.memory}GB RAM • {type.disk}GB
                      Disk
                    </Typography>
                    <Typography variant="body2" color="primary">
                      €{getServerTypePrice(type, serverData.location)}/month
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedServerType && (
            <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Selected Configuration:
              </Typography>
              <Typography variant="body2">
                • CPU: {selectedServerType.cores} Cores
                <br />• RAM: {selectedServerType.memory} GB
                <br />• Storage: {selectedServerType.disk} GB
                <br />• Price: €
                {getServerTypePrice(selectedServerType, serverData.location)}
                /month
              </Typography>
            </Box>
          )}

          <FormControl fullWidth required>
            <InputLabel>Image</InputLabel>
            <Select
              value={serverData.image}
              label="Image"
              onChange={(e) =>
                setServerData({ ...serverData, image: e.target.value })
              }
              disabled={loading || loadingData}
            >
              {images
                .filter((image) => image.type === 'system')
                .map((image) => (
                  <MenuItem key={image.id} value={image.id}>
                    <Box>
                      <Typography variant="subtitle1">{image.name}</Typography>
                      {image.description && (
                        <Typography variant="body2" color="text.secondary">
                          {image.description}
                        </Typography>
                      )}
                    </Box>
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select
              value={serverData.location}
              label="Location"
              onChange={(e) =>
                setServerData({ ...serverData, location: e.target.value })
              }
              disabled={loading}
            >
              {locations.map((location) => (
                <MenuItem key={location.id} value={location.id}>
                  <Box>
                    <Typography variant="subtitle1">{location.city}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {location.country}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isCreateDisabled}
        >
          {loading ? <CircularProgress size={24} /> : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
