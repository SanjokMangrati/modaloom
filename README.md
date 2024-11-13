# Modaloom - Avatar Generation Platform

Welcome to **Modaloom**, a platform designed to allow users to generate and customize their avatars. In the world of digital communication, avatars are widely used as virtual representations of individuals across social media platforms, apps, games, and virtual environments. With **Modaloom**, users can easily create avatars that reflect their personality and style, which they can then use across various platforms.

### [Visit the app here](https://modaloom.vercel.app)

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [How It Works](#-how-it-works)
- [Future Features](#-future-features)
- [Installation & Setup](#-installation--setup)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Features

- **Customizable Avatars**: Users can design avatars by selecting different elements like facial features, hairstyles, clothing, accessories, and more.
- **Downloadable PNG Avatars**: Once the avatar is created, users can download it in PNG format for use on social media, gaming platforms, and more.
- **Responsive & User-Friendly UI**: A simple, intuitive interface that ensures anyone can create avatars easily without any prior technical knowledge.
- **Platform Agnostic**: The avatars generated can be used across various applications, social media platforms, and online games.
  
## 🛠️ Tech Stack

- **Frontend & Backend**: [Next.js 15](https://nextjs.org/) for full-stack development (Frontend & API).
- **Database**: [PostgreSQL](https://www.postgresql.org/) for data storage.
- **ORM**: [Prisma](https://www.prisma.io/) for efficient database management.
- **API**: REST API for communication between frontend and backend.
- **Deployment**: [Vercel](https://vercel.com/) for seamless and automatic deployment.
- **Package Manager**: [Yarn](https://yarnpkg.com/) for package management.
- **Version Control**: [Git](https://git-scm.com/) & [GitHub](https://github.com/) for source code management.

## 🔧 How It Works

1. **Avatar Creation**: Users visit the platform, where they can start designing their avatar by selecting from a variety of customization options such as eyes, hair styles, accessories, and facial features.
2. **Customization**: Each avatar element is fully customizable, allowing users to mix and match different styles to create a unique representation of themselves.
3. **Download & Share**: After finalizing their avatar, users can download it as a PNG file for use across social media platforms, games, or even in virtual environments.
4. **REST API Integration**: The backend provides a REST API for handling avatar generation, user interactions, and potential future features like user accounts and more customization options.

## 🔮 Future Features

Here are some exciting features that will be added to **Modaloom** in the future:

- **User Management**: Allow users to create accounts, log in, and manage their avatars over time.
- **User Profile Section**: Create a profile page where users can view and edit their avatars, access previous designs, and more.
- **Enhanced Customization Options**: Provide more choices for customizing avatars, such as additional clothing, accessories, backgrounds, etc.
- **More Avatar Styles**: Introduce a wider range of customizable options, such as additional facial features, hair types, and more.
- **Enhanced Search Using PG Vector**: Implement advanced search capabilities to help users find avatars more easily using vector search.
- **Social Media Sharing**: Allow users to directly share their avatars to popular social media platforms with one click.
- **UI Revamp**: Improve the user interface for a more polished and user-friendly experience.

## 🛠️ Installation & Setup

To run **Modaloom** locally, follow the instructions below:

### Prerequisites

- Node.js (v14.x or higher)
- Yarn (package manager)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/modaloom.git

2. Install dependencies
   ```bash
   cd modaloom
   yarn install

3. Set up environment variables:
   - Create a .env.local file and add your environment variables (e.g., database credentials, API keys).

4. Run the app in development mode:
   ```bash
   yarn dev

5. Open your browser and go to http://localhost:3000
