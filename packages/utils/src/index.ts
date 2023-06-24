import { execSync, spawn } from 'child_process'

export const pbpaste = () => execSync('pbpaste').toString()

export const pbcopy = (data: string) =>
  new Promise((resolve, reject) => {
    const child = spawn('pbcopy')

    child.on('error', function (err) {
      reject(err)
    })

    child.on('close', function (err) {
      resolve(data)
    })

    child.stdin.write(data)
    child.stdin.end()
  })
