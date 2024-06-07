# Serve Local Markdown

**Serve Local Markdown** is a simple Node.js package that allows you to view your local Markdown files in the browser. This package serves the Markdown files from the current directory and renders them using `marked` and `ejs` for better formatting and design.

## Features

- Recursively scans directories for Markdown files.
- Renders Markdown files to HTML using `marked`.
- Uses `ejs` for templating, allowing for a customizable layout.
- Serves static files for custom CSS styling.

## Installation

To install the package globally, run the following command:

```bash
npm install -g serve-local-markdown
```
## Usage

Navigate to the directory containing your Markdown files and run:

```bash
serve-local-markdown
```

You should see the following output:
```
Markdown server is running at http://localhost:3838
```
Open your browser and go to http://localhost:3838 to view and navigate your Markdown files.

## Directory Structure

Ensure your project directory is structured as follows for optimal usage:

```
your-markdown-directory/
├── file1.md
├── file2.md
├── subdirectory/
│   └── file3.md
```

## Customization
### Static Files and CSS
You can customize the appearance by adding your own CSS files. Place your CSS files in a public directory within the installation path of `serve-local-markdown`:

```arduino
serve-local-markdown/
├── public/
│   └── styles.css
├── views/
│   ├── layout.ejs
│   ├── index.ejs
│   └── file.ejs
```

## Layout and Templates
You can modify the ejs templates to customize the layout:

- `views/layout.ejs`: The main layout file.
- `views/index.ejs`: Template for the file list.
- `views/file.ejs`: Template for rendering individual Markdown files.


## Contributing

If you would like to contribute, please visit our [GitHub repository](https://github.com/surajitbasak109/serve-local-markdown). Pull requests, issues, and feature requests are welcome.

## License
This project is licensed under the MIT License.

