# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

### Fixed
- Fixed issue where 'popstate' event handler threw an error if the Event object did not include the `state` property. [topic-22]
  - This issue materialized within applications that use hash-style routing (ie. `example.com/path#page-name`).

## [0.1.2] - 2019-03-19

### Added
- Added 'empty state' message to stack component. [topic-20]

## [0.1.1] - 2018-12-31

### Added
- PKG: Added TypeScript-related development dependencies. [topic-7]
- TEST: Added tests for action creators. [topic-11]
- TEST: Added tests for reducers. [topic-12]
- TEST: Added tests for selectors. [topic-13]
- TEST: Added tests for HistoryVisualizerUtils. [topic-15]
- TEST: Added tests for HistoryVisualizer. [topic-14]

### Changed
- UI: Prevented element styles from being clobbered by vendor stylesheets. [topic-9]
- Converted JavaScript implementation to TypeScript. [topic-7]

### Fixed
- UI: Fixed overflowing URL.

### Removed
- PKG: Removed ESLint and related development dependencies. [topic-7]

### Security
- Updated dependencies to address security vulnerabilities.

## [0.1.0] - 2018-12-15

### Added
- Everything.
