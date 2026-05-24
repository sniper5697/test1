# Stitch Workflow Notes

## Current Status
- The homepage generation prompt is ready.
- The generation script is ready.
- The local Stitch SDK connection works for tool discovery.
- Actual `create_project` / `generate_screen_from_text` flows require OAuth-style authentication, not only an API key.

## Files
- `docs/stitch/01-homepage-prompt.md`
- `scripts/generate-homepage-stitch.mjs`

## Run
```bash
npm run stitch:homepage
```

## Required Environment

At least one of the following auth paths must be valid:

### Option A: OAuth access token
```bash
export STITCH_ACCESS_TOKEN="..."
export GOOGLE_CLOUD_PROJECT="your-project-id"
```

### Option B: gcloud ADC
```bash
gcloud auth application-default login
gcloud config set project your-project-id
```

The generation script will try:
1. `STITCH_ACCESS_TOKEN`
2. `gcloud auth application-default print-access-token`
3. `GOOGLE_CLOUD_PROJECT`
4. `gcloud config get-value project`
5. `~/.config/gcloud/application_default_credentials.json` `quota_project_id`

### Option C: API key
```bash
export STITCH_API_KEY="..."
```

## Current Blocker

In this environment, `STITCH_API_KEY` is sufficient for tool listing, but the actual project/screen generation endpoint rejects API-key-only auth and returns:

`API keys are not supported by this API. Expected OAuth2 access token or other authentication credentials that assert a principal.`

## Next Step
- Obtain a valid `STITCH_ACCESS_TOKEN`, or install and authenticate `gcloud` ADC
- Set `GOOGLE_CLOUD_PROJECT` if the flow requires quota project context
- Rerun `npm run stitch:homepage`
