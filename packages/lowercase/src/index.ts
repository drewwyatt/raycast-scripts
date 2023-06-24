import { pbcopy, pbpaste } from 'utils'

pbcopy(pbpaste().toLowerCase()).then(() => process.exit(0))
