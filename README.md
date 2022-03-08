# Knowledge-Hub DOCS

---

This project is for demo-purposes only, but if you find it usefull, you are free to use any code / documentation inside as permitted by the MIT-License.

This idea is based on a video linked [here...][idea]

---

## Table-Of-Contents

1. [Introduction](#introduction)
2. [Stakeholder-Analyses](#stakeholder-analyses)
3. [Used Technology](#used-technology)
4. [Deployment Strategy](#deployment-strategy)
5. [Review](#review)
6. [Plans for future development](#future-development)
7. [How to Participate in Development](#how-to-participate-in-development)

## Introduction

### Current-State

In Company XYZ, all the documents for standard-workflows, instructions and technical documentation are being saved on the hard-disk inside a convoluted folder-structure.
Every time a employee needs to install project-dependencies or an entire development-environment, they need to search for these documents, most of which aren't being maintained by the author.

### State-After

Knowledge-Hub is going to solve these problems, by having a intuitive design, allowing writing of articles directly on the platform, or by copy&pasting an already written document in **markdown** and saving it into a database.
This makes the tool easy to use and accessible to anyone, once deployed.

The goal for this project is to create a MVP with all the essential features to start writing and reading those documents, but also to keep it modular, so it can be expanded upon in the future.

### Project-Timeline

![Project-Timeline][project-timeline]

---

## Stakeholder-Analyses

### Employees

- Easy access to written documents with search function

- Easy syntax for formatting documents

### Management

- Reducing of search-times for technical documentation

- Deligate employees to update important articles when outdated

---

## Used Technology

### Node.js

- JavaScript runtime-environment

- Easy server-sided programming completely in javascript

- Web-Api's implemented in Node

### Marked.js

- Markdown-Compiler - non-blocking

- Articles are written in plain markdown and then parsed to html

- Parsed html is written to database in article object to reduce loading times for client

### MongoDB and Mongoose

- MongoDB is a document-oriented database

- Every entry is just a JSON-Object

- Database consists of collections

  - instead of tables like sql

  - no defined columns besides for meta-data and the actual object

- Mongoose is used to write these objects in code

### Express.js

- Web-Server framework for node.js

- Easy syntax and helper-functions for implementing partial server-sided rendering with view-engines

- Easy syntax for modular routing

### Embedded JavaScript Templates (ejs)

- ejs is a view-engine used to create template-html files

- these templates can easily be filled, by passing data to the view with express

- this allows us to write the boilerplate html with header and footer once, and reuse it for all content-sites

### Slugify

- Slugify is a node.js module

- Allows creation of human-readable url's for objects normaly referenced by id's

- Creates a unique string based on the name of the object (title of article) for us to query

### Honorable Mentions

- JSDOM

  - Implements the DOM inside of Node.js

- Dompurify

  - Purifies the html parsed from marked

  - Prevents RCE from inside script-tags

- Method-Override

  - Allows us to use put / delete as method for forms

  - WebCrawler are basically clicking through all the links on your website to index it in the search-engine

  - Using a get-request to delete with an a tag / button is bad practice!

    - could lead to deletion of entire db!

---

## Deployment-Strategy

For easy deployment on the customers server, I decided to package my application as a docker-image. Docker images are self-contained environments for applications. They contain the complete application and all dependencies already built. This way, all the customer has to do, is:

1. Setup a server with [docker][docker] installed

2. Clone the repository and build the image from source using:

  ```bash
  #!/bin/bash
  docker compose build
  ```

  And then start-up the stack

  ```bash
  #!/bin/bash
  docker compose up -d
  ```

  The `-d` optional flag starts the all containers, including the app without attaching the process to the running terminal.

3. Verify that everything is working by going to localhost:7777 and adding one article

---

## Review

### Current State

- MVP functional :+1:

- Images cause server to crash if not uploaded

- Image-Upload feature still needs work

- Modular approach makes incremental changes possible

### Issues during development

The following lists the most remarkable problems and how to avoid them for the next project:

#### Bad Time-Management

Because of the number of frameworks used and trying to stay true to established conventions, alot of time went into researching optimal ways to solve these problems. This time, invested into research, in the end was missing for the documentation and the presentation for the customer.

#### EJS-Views not supporting blocks

For this project, I decided to use ejs as the view-engine for express. Ejs is one of the oldest view-engines around and seemed like a good choice at first.
But as I found out later, ejs doesn't support "blocks" inside the templates. This means, we have to have two default templates instead of one. While this isn't a major setback, it did support it in previous versions and cost me quite some time to figure out why it wasn't working.

#### Docker(izing) the Application

To make the deployment as easy as possible for the customer, I wanted to publish this webapp as a dockerimage and bundle it with the database-server inside a docker-stack. This theoretically makes the installation-process for the customer as simple as setting up a docker environment (which most companies already have) and execute:

```bash
#!/bin/bash
docker compose up -d
```

The problem I had with this strategy was the database.
MongoDB as a container doesn't seem to work with particular cpu's... incidentally including the one installed inside my rented vps-server.
So I couldn't get the database working on my remote-server. Thankfully this doesn't prevent me from starting the server locally, but this highlights other issues i need to resolve before publishing the application.

---

## Summary

This whole project was a lot of fun overall. Trying out a few new things, getting comfortable with technology I am already using and learning new ways to accomplish my goals.
However it also highlighted many things I didn't plan for. I wanted to document these issues I had, to hopefully be more wary in the future and have a solution for them.

---

## Future-Development

- [ ] Implement image-upload

- [ ] Solve crashing issue

- [ ] Refine deployment-strategy

  - Can't currently deploy docker stack to webhost, works locally when building

- [ ] Add SSL-certificate

- [ ] Refine Docs

  - Documentation for administration of the site and database

## How to Participate in Development

1. Fork this repository for yourself

2. Clone your fork to your local machine

3. Open the repository in vscode

4. *(optional)* Open in devcontainer with the [`remote container`][remote-container] extension

To debug inside the dev-container just make sure nodemon is running (should be default) and use the default debug config, which should automatically attach to nodemon.

ToDo:

- [ ] Remove the start of nodemon from the devcontainer-setup --> always showing `Configuring Dev Container...`

- [ ] Fix vscode internal debugger not working when attaching --> watch / callstack / breakpoints not working

[remote-container]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers
[docker]: https://docs.docker.com/get-docker/
[idea]: https://www.youtube.com/watch?v=1NrHkjlWVhM
[project-timeline]: https://i.imgur.com/rSr6uvm.png
