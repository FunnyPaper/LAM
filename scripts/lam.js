#!/usr/bin/env node

const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { hideBin } = require('yargs/helpers');
const { execSync } = require('child_process');
const { version } = require('../package.json');

async function main() {
  const startTime = new Date();
  const buildChoices = ['service:gscrap', 'backend', 'frontend', "app", "all"];

  const { build, copy, proto, monaco } = await yargs(hideBin(process.argv))
    .scriptName('lam')
    .version(version)
    .help()
    .alias('h', 'help')
    .option('build', {
      alias: 'b',
      type: 'array',
      choices: buildChoices,
      description: "Determines a list of dependencies to build.",
    })
    .option('proto', {
      alias: 'p',
      type: 'boolean',
      default: false,
      description: 'Regenerates all proto files.'
    })
    .option('monaco', {
      alias: 'm',
      type: 'boolean',
      default: false,
      description: "Carry over monaco editor assets."
    })
    .argv; 

    if (proto) {
      console.log("Generating protos...");
      execSync('npm run gen:proto', { stdio: 'inherit' });
      console.log("Protos generated.");
    }

    if (monaco) {
      setupMonaco();
    }

    if (build) {
      const defaultBuild = build.length == 0 ? ['all'] : build;
      const dependencies = defaultBuild.includes('all') 
        ? buildChoices 
        : [...new Set(defaultBuild)];
      
        for (const dependency of dependencies) {
        console.log(`Building ${dependency}...`)
        switch (dependency) {
          case 'service:gscrap':
            execSync('npm run build:services', { stdio: 'inherit' });
            copyGscrapService();
            break;
          case 'backend':
            execSync('npm run build:backend', { stdio: 'inherit' });
            copyBackend();
            break;
          case 'frontend':
            execSync('npm run build:frontend', { stdio: 'inherit' });
            break;
          case 'app':
            const privateKey = process.env.TAURI_SIGNING_PRIVATE_KEY || readLocalKeyFile('lam.key');
            const keyPassword = process.env.TAURI_SIGNING_PRIVATE_KEY_PASSWORD || readLocalKeyFile('lam.key.password');

            const buildEnv = {
              ...process.env,
              TAURI_SIGNING_PRIVATE_KEY: privateKey,
              TAURI_SIGNING_PRIVATE_KEY_PASSWORD: keyPassword,
            };

            execSync('npx tauri build --bundles nsis', {
              env: buildEnv,
              stdio: 'inherit',
            });
            break;
        }

        console.log(`${dependency} built.`);
      }
    }

    const endTime = new Date();
    const duration = formatDuration(endTime - startTime);
    console.log(`Execution took: ${duration}`);
}

const readLocalKeyFile = (filename) => {
  try {
    const filePath = path.join(os.homedir(), '.tauri', filename);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8').trim(); 
    }
  } catch (error) {
    console.warn(`Could not read local file: ${filename}`);
  }
  return undefined;
};

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

const copyBackend = () => {
  const binPath = path.join("tauri", "bin");
  const backendBinPath = path.join(binPath, "backend");

  console.log("Clearing bin path...");
  fs.rmSync(backendBinPath, { recursive: true, force: true });
  console.log("Bin path cleared.");

  console.log("Creating backend bin directory...");
  fs.mkdirSync(backendBinPath, { recursive: true });
  console.log("Backend pin path created.");

  console.log("Copyin backend build to backend bin path...");
  fs.cpSync("packages/lam/backend/build", backendBinPath, {
    recursive: true,
  });
  console.log("Backend build copied.");
}

const copyGscrapService = () => {
  const binPath = path.join("tauri", "bin");
  const gscrapBinPath = path.join(binPath, "service", "gscrap");

  console.log("Clearing bin path...");
  fs.rmSync(gscrapBinPath, { recursive: true, force: true });
  console.log("Bin path cleared.");

  console.log("Creating service:gscrap bin directory...");
  fs.mkdirSync(gscrapBinPath, { recursive: true });
  console.log("service:gscrap bin path created.");

  console.log("Copying service:gscrap build to service:gscrap bin path...");
  fs.cpSync("packages/gscrap/service/build", gscrapBinPath, {
    recursive: true,
  });
  console.log("service:gscrap build copied.");
}

const setupMonaco = () => {
  console.log("Setting up monaco assets...");
  const sourceDir = './packages/lam/frontend/dist/assets';
  const targetDir = 'public/assets';

  if (fs.existsSync(sourceDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      fs.readdirSync(sourceDir).forEach(file => {
          if (file.includes('worker') && file.endsWith('.js')) {
              fs.copyFileSync(
                  path.join(sourceDir, file), 
                  path.join(targetDir, file)
              );
          }
      });
  }
  console.log("Monaco assets set.")
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
})