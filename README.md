# Fallback: NHS Digital Webform

## Table of Contents
- [Introduction](#introduction)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Building the Project](#building-the-project)
- [Testing](#testing)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)

## Introduction

Fallback is a webform that can trigger deployment of our [main website's](https://github.com/NHS-digital-website/hippo) pipeline to one of our environments. This project is intended to be used as a fallback mechanism when Slack is unavailable. The live version of the project can be found [here](https://nhs-digital-website.github.io/fallback/). Note, this application is deshigned to be used by the Web Team; working creditionals are needed.

## Requirements

- Node.js v14.x or higher
- NPM v7.x or higher

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/NHS-digital-website/fallback.git
    ```
2. Change directory:
    ```bash
    cd fallback
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

To run the development server:

```bash
npm run dev
```

The application will then be served from `http://localhost:5173/fallback`.

## Building the Project
To build the project, run:

```bash
npm run build
```

This will generate a `dist/` directory containing the compiled assets ready for deployment.

## Testing
To run unit tests:

```bash
npm run test:unit:
```

## Contribution Guidelines
The main branch is protected. All changes must be done via a pull request (PR).

Fork the repository.
1. Create a new feature branch.
1. Make your changes and commit them.
1. Push the branch to your fork.
1. Open a pull request targeting the main branch for review.


## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
