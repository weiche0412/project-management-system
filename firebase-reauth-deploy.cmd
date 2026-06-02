@echo off
setlocal

cd /d "%~dp0"

set "XDG_CONFIG_HOME=%CD%\.firebase-config"
set "FIREBASE_CLI_DISABLE_UPDATE_CHECK=1"
set "FIREBASE_PROJECT=project-management-syste-73486"
set "FIREBASE_BIN=%CD%\node_modules\.bin\firebase.cmd"

if not exist "%FIREBASE_BIN%" (
  echo Firebase CLI was not found at:
  echo %FIREBASE_BIN%
  echo.
  echo Please run npm install first, then run this file again.
  pause
  exit /b 1
)

echo Step 1/3: Re-authenticating Firebase CLI...
call "%FIREBASE_BIN%" login --reauth
if errorlevel 1 (
  echo.
  echo Firebase login failed or was cancelled.
  pause
  exit /b 1
)

echo.
echo Step 2/3: Deploying Firestore rules and Hosting to %FIREBASE_PROJECT%...
call "%FIREBASE_BIN%" deploy --only firestore:rules,hosting --project "%FIREBASE_PROJECT%"
if errorlevel 1 (
  echo.
  echo Deploy failed.
  pause
  exit /b 1
)

echo.
echo Step 3/3: Verifying local rules markers and checking active release...
node -e "const fs=require('fs');const content=fs.readFileSync('firestore.rules','utf8');const checks=['visibleListIsUnion','canCreateOwnProject','match /projects/{projectId}','documentIdMatches(request.resource.data, projectId)','data.id == documentId','toSet().hasOnly(firstUids.toSet().union(secondUids.toSet()))'];const missing=checks.filter((check)=>!content.includes(check));const start=content.indexOf('match /projects/{projectId}');const next=start>=0?content.indexOf('match /projectStages/{stageId}',start):-1;const block=start>=0?content.slice(start,next>start?next:start+900):'';console.log('Local /projects create block:');console.log(block.trim());if(missing.length)throw new Error('Local rules missing: '+missing.join(', '));console.log('Verified local rules contain expected project create markers.');"
if errorlevel 1 (
  echo.
  echo Deploy finished, but local Firestore rules marker verification failed.
  pause
  exit /b 1
)

node -e "const rules=require('./node_modules/firebase-tools/lib/gcp/rules');(async()=>{const project=process.env.FIREBASE_PROJECT;const releases=await rules.listAllReleases(project);const release=releases.find((item)=>(item.name||'').endsWith('/releases/cloud.firestore'));if(!release)throw new Error('No active cloud.firestore release found.');const files=await rules.getRulesetContent(release.rulesetName);const content=(files||[]).map((file)=>file.content||'').join('\n');const start=content.indexOf('match /projects/{projectId}');const next=start>=0?content.indexOf('match /projectStages/{stageId}',start):-1;const block=start>=0?content.slice(start,next>start?next:start+900):'';console.log('Active Firestore release: '+release.name);console.log('Ruleset: '+release.rulesetName);console.log('Active /projects create block:');console.log(block.trim());})().catch((error)=>{console.warn('Active Firestore rules release check skipped: '+(error&&error.message?error.message:error));console.warn('If Step 2 showed firestore: released rules and no compile warnings, the deploy completed.');});"

echo.
echo Deploy complete.
pause
