# JavaScript Blog Project
This project is a tribute to the popular Korean content platform, Brunch (https://brunch.co.kr/), known for its rich collection of articles and unique user interface. The goal was to recreate the essence of Brunch, utilizing modern web development practices and technologies. This document serves as a guide to the structure, technologies used, and features of the project.

## Overview
JavaScript Blog project is a web application built entirely using pure JavaScript, with no reliance on jQuery or any other JavaScript library for DOM manipulations. The goal was to challenge ourselves by sticking to vanilla JavaScript and employing a range of technologies to mimic the functionality and design of the original site as closely as possible.

## Technologies Used
Here's a list of the main technologies and methodologies used in this project:

JavaScript (ES6+): The core of the application, used for all logic and DOM manipulations.

Block Element Modifier (BEM): A methodology for naming and classifying CSS selectors in a way that makes our HTML and CSS more readable and easier to understand.

Handlebars Template: Utilized for rendering server-side templates on the client side. This helped us efficiently generate HTML content based on our data.

SASS (SCSS): A preprocessor scripting language that is interpreted or compiled into CSS. We used SCSS for more powerful styling capabilities with variables, nesting, and more.

Public API - GNEWS: For fetching news and articles to populate our clone with real, up-to-date content.

Firebase Cloud Functions: Serverless functions used to handle backend processes like authentication and data manipulation without the need for a dedicated backend.

Firebase Firestore: A NoSQL database from Firebase used to store and sync our application's data in real-time.

Chat GPT: Incorporated as a unique feature to provide AI-generated summaries for articles, enhancing the user experience by offering quick insights into content.

## Features
The project attempts to mirror the key features of Brunch, with some unique additions:

Dynamic Content Rendering: Articles and news are dynamically fetched using the GNEWS API and rendered using Handlebars templates.

Real-time Data: Articles are stored and managed in real-time using Firebase Firestore.

Responsive Design: The site is fully responsive, adapting to various screen sizes and devices, thanks to SASS.

AI Content Summarization: Utilizing Chat GPT to provide a brief summary for articles, aiding users in deciding which content to engage with.

## Project Structure
The project is structured as follows:

/public: Contains static files like HTML, CSS (compiled from SCSS), and client-side JavaScript.

/src: Contains source files for SCSS, Handlebars templates, and JavaScript modules.

/functions: Contains Firebase Cloud Function scripts for backend logic.

## Acknowledgments
This project was inspired by Brunch.co.kr and is intended for educational purposes only. All content rights belong to their respective owners.
