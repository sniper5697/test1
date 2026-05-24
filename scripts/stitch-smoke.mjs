import { StitchToolClient } from '@google/stitch-sdk'

async function main() {
  const apiKey = process.env.STITCH_API_KEY

  if (!apiKey) {
    throw new Error('STITCH_API_KEY is not set')
  }

  const client = new StitchToolClient({ apiKey })

  try {
    const { tools } = await client.listTools()
    const toolNames = tools.map((tool) => tool.name).slice(0, 20)
    console.log(JSON.stringify({ ok: true, toolCount: tools.length, toolNames }, null, 2))
  } finally {
    await client.close()
  }
}

main().catch((error) => {
  console.error(JSON.stringify({ ok: false, error: error.message }, null, 2))
  process.exit(1)
})
