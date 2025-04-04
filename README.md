
# Web Design & UX Engineering Final project

## Project Description

### Welcome to PassionHub, an engaging web application tailored for individuals eager to connect with like-minded enthusiasts. Getting started is a breeze – simply create an account and log in to unlock the diverse features of PassionHub. During registration, customize your experience by selecting your areas of interest, setting the stage for personalized recommendations. Once onboard, dive into the heart of PassionHub by creating or joining passion groups, where vibrant discussions unfold through group posts, complete with upvoting and downvoting options.

### Forge meaningful connections by reaching out to fellow users via direct messaging, fostering one-on-one interactions. To sweeten the experience, PassionHub introduces a credit system, rewarding you with initial credits upon registration. Use these credits to access exclusive content in paid groups or to send direct messages.

### Designed with React, PassionHub ensures a seamless and responsive user interface. Easily navigate the platform, discover new passion groups, and contribute to conversations that align with your interests. The search and filter system makes it effortless to pinpoint the content that matters most to you. Plus, rest assured that transactions within the platform are managed securely and transparently, enhancing your overall experience.

### PassionHub invites you to join a community where your interests take center stage. Start your journey today, exploring, connecting, and turning your passions into vibrant conversations.

## Object Model diagram for PassionHub

![passionHubFinal](https://github.com/info-6150-fall-2023/final-project-overflow/assets/145076344/d2f6ec5c-ef39-4352-9b5d-ff5a391095de)

## Tools used

1. Code Editor: Visual Studio Code (VS Code)
2. Version Control: Git
3. Technology: React , Redux, Express.js, Node.js 
4. Database: MongoDB

## Installation

1. Clone this repository:

```bash
git clone git@github.com:info-6150-fall-2023/final-project-overflow.git
```

2. Open the repository with Visual Studio or any other IDE.

3. Run the following command inside client and server directory to install and add node modules 

```bash
npm install
```

4.Run the following commands from project directory to run client Side 

```bash
npm run client
```

5.Run the following commands from project directory to run Server Side 

```bash
npm run server
```
## Project Structure

The project directory structure is as follows:

```
- client/
     -src/
         - Components/
         - CSS/
         - redux/
         - App.tsx
     - package.json
     - package-lock.json
   
- server/
     - app/
         - Controllers/
         - Models/
         - Routes/
         - Services
         - app.js
         - server.js
     - .env
     - package.json
     - package-lock.json
- uiMockups/
- Readme.md
- package.json
- package-lock.json
```

## Environment Variables for Security

In PassionHub, we use a `.env` file to securely store sensitive data like database credentials. This file isn't included in version control, keeping our database secure.

## Internationalization 

The profile page of the application now exclusively supports the French language through internationalization (i18n), offering users a personalized experience in their French language.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.


## Members Contact Details

- Palaniselvam Shyam Sundar (palaniselvam.s@northeastern.edu) 
- Niraj Komalkant Malpani(malpani.n@northeastern.edu)
- Prashanth Baskar(baskar.pr@northeastern.edu)
- Sahil Mutha (mutha.sa@northeastern.edu)
