import axios from 'axios'
import toast from 'react-hot-toast'

const handleVerify = async (id: string, category: string) => {
  const toastId = toast.loading('Verifying entry...')
  try {
    await axios.post('/api/verify', { id, category })
    toast.success('Verified entry', { id: toastId })
  } catch (err) {
    toast.error('Failed to verify entry', { id: toastId })
    throw new Error(err)
  }
}

export default handleVerify
