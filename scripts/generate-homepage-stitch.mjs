import fs from 'node:fs/promises'
import path from 'node:path'
import { existsSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { Stitch, StitchToolClient, stitch } from '@google/stitch-sdk'

const root = process.cwd()
const promptPath = path.join(root, 'docs/stitch/01-homepage-prompt.md')
const outputDir = path.join(root, 'artifacts/stitch/homepage')

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

  const token = tryExec('gcloud', [
    'auth',
    'application-default',
    'print-access-token',
  ])
  return token
}

async function readPrompt() {
  return fs.readFile(promptPath, 'utf8')
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
    // The SDK singleton currently prefers STITCH_API_KEY over STITCH_ACCESS_TOKEN.
    // Use an explicit client for OAuth so create/generate calls carry the bearer token.
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

  const prompt = await readPrompt()
  await ensureDir(outputDir)

  const stitchClient = createStitchClient({ accessToken, projectId })
  console.log('Creating Stitch project...')
  const project = await stitchClient.createProject('Velora Voice Homepage')
  console.log(`Project created: ${project.projectId}`)
  console.log('Generating homepage screen...')
  const screen = await project.generate(prompt, 'DESKTOP', 'GEMINI_3_PRO')
  console.log(`Screen generated: ${screen.screenId}`)
  const htmlUrl = await screen.getHtml()
  const imageUrl = await screen.getImage()

  const metadata = {
    generatedAt: new Date().toISOString(),
    projectId: project.projectId ?? project.id,
    screenId: screen.screenId ?? screen.id,
    htmlUrl,
    imageUrl,
    promptPath: path.relative(root, promptPath),
  }

  metadata.downloads = {
    htmlSaved: await maybeDownload(htmlUrl, path.join(outputDir, 'homepage.html')),
    imageSaved: await maybeDownload(imageUrl, path.join(outputDir, 'homepage.png')),
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
  const projectId = resolveProjectId()

  if (
    typeof message === 'string' &&
    message.includes('API keys are not supported by this API')
  ) {
    console.error(
      [
        'Stitch homepage generation is blocked by authentication mode.',
        'The current Stitch API accepts OAuth2 access tokens for create/generate flows.',
        'Next step: set STITCH_ACCESS_TOKEN directly, or install/authenticate gcloud ADC so the script can mint a token automatically.',
        projectId
          ? `Resolved GOOGLE_CLOUD_PROJECT=${projectId}`
          : 'No Google Cloud project could be resolved automatically.',
        '',
        message,
      ].join('\n'),
    )
    process.exit(2)
  }

  console.error(message)
  process.exit(1)
})
