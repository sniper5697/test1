import fs from 'node:fs/promises'
import path from 'node:path'
import { existsSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { Stitch, StitchToolClient, stitch } from '@google/stitch-sdk'

const root = process.cwd()

function getArg(flag) {
  const index = process.argv.indexOf(flag)
  if (index !== -1 && process.argv[index + 1]) {
    return process.argv[index + 1]
  }
  return ''
}

const promptArg = getArg('--prompt')
const outputArg = getArg('--output')
const titleArg = getArg('--title') || 'Velora Voice Screen'
const deviceArg = getArg('--device') || 'DESKTOP'
const modelArg = getArg('--model') || 'GEMINI_3_PRO'

if (!promptArg || !outputArg) {
  console.error(
    'Usage: node scripts/generate-stitch-screen.mjs --prompt <prompt-file> --output <output-dir> [--title <title>] [--device DESKTOP] [--model GEMINI_3_PRO]',
  )
  process.exit(1)
}

const promptPath = path.resolve(root, promptArg)
const outputDir = path.resolve(root, outputArg)

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

function tryExec(command, args) {
  try {
    return execFileSync(command, args, { encoding: 'utf8' }).trim()
  } catch {
    return ''
  }
}

function resolveProjectId() {
  if (process.env.GOOGLE_CLOUD_PROJECT) {
    return process.env.GOOGLE_CLOUD_PROJECT
  }

  const gcloudProject = tryExec('gcloud', ['config', 'get-value', 'project'])
  if (gcloudProject && gcloudProject !== '(unset)') {
    return gcloudProject
  }

  const adcPath = path.join(
    process.env.HOME ?? '',
    '.config/gcloud/application_default_credentials.json',
  )
  if (existsSync(adcPath)) {
    try {
      const adc = JSON.parse(readFileSync(adcPath, 'utf8'))
      if (adc.quota_project_id) {
        return adc.quota_project_id
      }
    } catch {
      return ''
    }
  }

  return ''
}

function resolveAccessToken() {
  if (process.env.STITCH_ACCESS_TOKEN) {
    return process.env.STITCH_ACCESS_TOKEN
  }

  return tryExec('gcloud', ['auth', 'application-default', 'print-access-token'])
}

async function maybeDownload(url, filePath) {
  if (!url) {
    return false
  }
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`)
  }
  const buf = Buffer.from(await res.arrayBuffer())
  await fs.writeFile(filePath, buf)
  return true
}

function createStitchClient({ accessToken, projectId }) {
  if (accessToken) {
    const originalApiKey = process.env.STITCH_API_KEY
    delete process.env.STITCH_API_KEY

    try {
      return new Stitch(
        new StitchToolClient({
          accessToken,
          projectId,
        }),
      )
    } finally {
      if (originalApiKey) {
        process.env.STITCH_API_KEY = originalApiKey
      }
    }
  }

  return stitch
}

async function main() {
  const accessToken = resolveAccessToken()
  const projectId = resolveProjectId()

  if (accessToken) {
    process.env.STITCH_ACCESS_TOKEN = accessToken
  }
  if (projectId) {
    process.env.GOOGLE_CLOUD_PROJECT = projectId
  }

  if (!process.env.STITCH_API_KEY && !process.env.STITCH_ACCESS_TOKEN) {
    throw new Error(
      'Set STITCH_API_KEY or STITCH_ACCESS_TOKEN, or install/authenticate gcloud ADC before running stitch generation.',
    )
  }

  const prompt = await fs.readFile(promptPath, 'utf8')
  await ensureDir(outputDir)

  const stitchClient = createStitchClient({ accessToken, projectId })
  console.log(`Creating Stitch project: ${titleArg}`)
  const project = await stitchClient.createProject(titleArg)
  console.log(`Project created: ${project.projectId}`)
  console.log('Generating screen...')
  const screen = await project.generate(prompt, deviceArg, modelArg)
  console.log(`Screen generated: ${screen.screenId}`)

  const htmlUrl = await screen.getHtml()
  const imageUrl = await screen.getImage()

  const metadata = {
    generatedAt: new Date().toISOString(),
    title: titleArg,
    promptPath: path.relative(root, promptPath),
    projectId: project.projectId ?? project.id,
    screenId: screen.screenId ?? screen.id,
    htmlUrl,
    imageUrl,
  }

  metadata.downloads = {
    htmlSaved: await maybeDownload(htmlUrl, path.join(outputDir, 'screen.html')),
    imageSaved: await maybeDownload(imageUrl, path.join(outputDir, 'screen.png')),
  }

  await fs.writeFile(
    path.join(outputDir, 'metadata.json'),
    JSON.stringify(metadata, null, 2),
    'utf8',
  )

  console.log(JSON.stringify(metadata, null, 2))
}

main().catch((error) => {
  const message =
    error instanceof Error ? error.stack ?? error.message : String(error)
  console.error(message)
  process.exit(1)
})
