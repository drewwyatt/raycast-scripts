// Dependency: This script requires Nodejs.
// Install Node: https://nodejs.org/en/download/

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Lowercase Clipboard
// @raycast.mode compact

// Optional parameters:
// @raycast.icon 🔡

// @raycast.author drewwyatt
// @raycast.authorURL https://raycast.com/drewwyatt

import { pbcopy, pbpaste } from 'utils'

pbcopy(pbpaste().toLowerCase()).then(() => process.exit(0))
