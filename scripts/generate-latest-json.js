const fs = require('fs');
const path = require('path');

const tag = process.env.GITHUB_REF_NAME; 
const repoFullName = process.env.GITHUB_REPOSITORY; 
const workspace = process.env.GITHUB_WORKSPACE;

if (!tag || !repoFullName || !workspace) {
  console.error("Error: Missing github variables.");
  process.exit(1);
}

const baseUrl = `https://github.com/${repoFullName}/releases/download/${tag}`;

const bundleDir = path.join(workspace, 'tauri', 'target', 'release', 'bundle', 'nsis');

try {
  const files = fs.readdirSync(bundleDir);
  const sigFile = files.find(f => f.endsWith('.zip.sig'));
  
  if (!sigFile) {
    throw new Error("Signature file missing.");
  }

  const zipFile = sigFile.replace('.sig', '');
  const signature = fs.readFileSync(path.join(bundleDir, sigFile), 'utf8');

  const latestJson = {
    version: tag.replace('v', ''),
    notes: "Automatic update",
    pub_date: new Date().toISOString(),
    platforms: {
      "windows-x86_64": {
        signature: signature.trim(),
        url: `${baseUrl}/${zipFile}`
      }
    }
  };

  const outputPath = path.join(workspace, 'latest.json');
  fs.writeFileSync(outputPath, JSON.stringify(latestJson, null, 2));
  
  console.log("Generated latest.json");

} catch (error) {
  console.error("Error occured during file generation:", error);
  process.exit(1);
}