# History Visualizer

## Table of Contents
- [About](#about)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Documentation](#documentation)

## About
History Visualizer is a tool for recording, inspecting, and traversing browser history.

## Installation
Currently, History Visualizer may only be used via a Chrome extension. To install the extension, follow the instructions below:

- Clone this repository to your local file system.
- Navigate to the repository folder and run `npm install`.
  - Please note: both `node` and `npm` must be available in your local environment.
- Build the extension by running: `npm run build && npm run ext:build`.
- Open the Chrome browser and navigate to `chrome://extensions`.
- Enable 'Developer Mode' via the toggle in the top right corner of the page.
- Select 'Load Unpacked'.
- In the newly opened finder window, navigate to the repository folder, highlight the `ext/` directory, and click select.

## Setup
Once the Chrome extension has been installed, no further configuration is necessary.

## Usage
When the Chrome extension is active, History Visualizer will be injected into every page visited in non-private mode.

To view history for a given site or application, expand the History Visualizer 'drawer' by clicking on the icon near the top left corner of the viewport. History entries are arranged vertically, with newer entries appearing closer to the top of the 'drawer'. To navigate back and forth between entries, click on the corresponding URL. To view the data for a given entry, click on the element below the URL.

## Documentation
Currently, History Visualizer does not include any external documentation.

For an overview of the project's evolution, please consult the CHANGELOG.
