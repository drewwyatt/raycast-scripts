import { pbcopy, pbpaste } from 'utils'

pbcopy(pbpaste().trim()).then(() => process.exit(0))
