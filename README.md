# DOKK OS Web App

A static iPhone web app inspired by a tactical phone-call interface. It shows a fake loading screen, switches to a landscape console, lets you select or deselect fake IP targets, and plays a local portrait video when the call button is unlocked.

## Project Files

- `index.html` - main app structure
- `styles.css` - visual layout and screenshot-matched styling
- `script.js` - orientation, IP selection, deselection, and video behavior
- `manifest.webmanifest` - fullscreen web app metadata
- `assets/loading.webp` - portrait loading image
- `assets/main-reference.png` - landscape UI reference background
- `assets/call-button.png` - call button image
- `assets/call-video.mp4` - video played by the call button

## Test Locally

Open `index.html` in a browser for a quick desktop test.

For iPhone testing, serve the folder from your computer:

```powershell
cd "C:\Users\Noah MC Williams\Documents\Codex\DokkOS"
python -m http.server 8000
```

Find your PC's local IPv4 address with:

```powershell
ipconfig
```

Then open this on your iPhone while it is on the same Wi-Fi:

```text
http://YOUR-PC-IP:8000
```

## Upload To GitHub

1. Create a new repository on GitHub.
2. Name it something like `dokkos-webapp`.
3. Keep it public if you want to use free GitHub Pages easily.
4. Do not add a README on GitHub if this local README already exists.

In PowerShell, run:

```powershell
cd "C:\Users\Noah MC Williams\Documents\Codex\DokkOS"
git init
git add .
git commit -m "Initial DOKK OS web app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/dokkos-webapp.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## Publish With GitHub Pages

1. Open the GitHub repository in your browser.
2. Go to **Settings**.
3. Open **Pages** in the left sidebar.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Set the branch to `main`.
6. Set the folder to `/root`.
7. Click **Save**.

GitHub will give you a site URL after it finishes deploying, usually like:

```text
https://YOUR-USERNAME.github.io/dokkos-webapp/
```

## Updating Later

After editing files locally, push updates with:

```powershell
git add .
git commit -m "Update DOKK OS app"
git push
```

## Notes

- Keep `assets/call-video.mp4` in the assets folder unless you also update the video path in `index.html`.
- iPhone orientation locking is limited by Safari. The app requests fullscreen/landscape behavior through the manifest, but the most realistic test is adding the site to your iPhone home screen.
- The IP addresses are fake UI text only. The app does not perform network scanning or real calls.
