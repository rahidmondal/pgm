# SecurePGM

SecurePGM is a lightweight, local-first Single Page Application (SPA) designed to help you generate cryptographically strong passwords and analyze their strength with advanced entropy metrics.

## Features

- **SPA Architecture**: Seamless navigation between generator and checker without page reloads.
- **Password Generation**: Create highly secure, randomized passwords with customizable parameters (Length, Character Sets, and Experimental UTF-8 support).
- **Advanced Strength Analysis**: Powered by `zxcvbn.js`, providing feedback on guesses needed, crack times, and pattern recognition.
- **Dark/Light Mode**: Full theme customization that persists across sessions.
- **PWA Support**: Installable on desktop/mobile and fully functional offline via Service Workers.
- **Secure by Design**: All operations happen locally in your browser; no sensitive data ever leaves your device.

## Setup

To set up the SecurePGM project locally:

1. Clone the repository: `git clone https://github.com/rahidmondal/SecurePGM.git`
2. Navigate to the project directory: `cd SecurePGM`
3. Open `src/index.html` in any modern web browser.

## Deployment

The project is deployed using GitHub Pages. The deployment is automated using a GitHub Actions workflow. See the [static-deploy.yml](.github/workflows/static-deploy.yml) file for the workflow configuration.

## Changelog

- **v1.0.0**: Initial Release - Basic Generation and Strength Check.
- **v1.1.0**: UI Improvements and core functionality refinements.
- **v1.2.0**: Major Overhaul:
  - Refactored to a **Single Page Application (SPA)** with sidebar layout.
  - Implemented **Dark and Light Mode** with persistent storage.
  - Upgraded generation logic with **unbiased randomness** and **Fisher-Yates shuffle**.
  - Added **PWA support** for offline functionality.
  - Displaying expanded metrics from `zxcvbn.js`.

## Credits

For details about the contributors and external resources used in this project, please refer to the [credits.md](credits.md) file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
