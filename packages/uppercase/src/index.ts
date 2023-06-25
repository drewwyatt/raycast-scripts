import { pbcopy, pbpaste } from 'utils'

pbcopy(pbpaste().toUpperCase()).then(() => process.exit(0))
