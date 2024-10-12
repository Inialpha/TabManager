# TabManager Chrome Extension

TabManager is a powerful Chrome extension designed to help you manage and organize your browser tabs with ease. Whether you're dealing with a large number of open tabs or want to group them by domain or window, TabManager has you covered. 

Built with **React**, **TypeScript**, and **Vite**, this extension aims to reduce tab overload, improve productivity, and make browsing less stressful.

## Features

- **Group Tabs by Window**: Easily group your open tabs by window or domain for better organization.
- **Search Tabs**: Quickly find any tab with a built-in search functionality.
- **Delete Tabs**: Remove tabs that are no longer needed with a simple click.
- **New Window Creation**: Create new windows and group your tabs automatically.
- **Automatic Tab Closure**: Automatically closes duplicate tabs with the same URL to keep your workspace clutter-free.
- **Max Tab Limit**: Set a maximum number of open tabs, and the extension will automatically close the oldest updated tab when the limit is reached.
  
## Permissions

TabManager requires the following permissions:
- `tabs`: To access and manage open browser tabs.
- `storage`: To store settings and preferences.
- `notifications`: To send notifications to the user (e.g., when tabs are closed).
- `tabGroups`: To group tabs by domain.

## Installation

<!-- ### From Chrome Web Store

1. Go to the [TabManager Chrome Web Store page](#) (insert link).
2. Click **Add to Chrome** to install the extension.
-->
### Manual Installation

1. Clone this repository:
   ```bash
   https://github.com/Inialpha/TabManager.git
   ```
2. Disable peer dependency
   ```bash
   npm config set legacy-peer-deps true
   ```
3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
4. Build the project:
   \`\`\`bash
   npm run build
   \`\`\`
5. Go to `chrome://extensions/` in your Chrome browser.
6. Enable **Developer Mode** in the top right corner.
7. Click **Load unpacked** and select the `dist` folder from the cloned repository.

<!-- ## Future Features

- **Session Saving**: Save and restore your tab groups and windows.
- **Daily Insights**: Get insights on domains visited and track browsing habits.
- **Time Management Alerts**: Set time limits for domains, and receive notifications when you spend too much time on a specific website. -->


## Authors


- **Inimfon Ebong**: [Email](inimfonebong001@gmail.com) [Twitter](https://twitter.com/Inimfon_Tech) [GitHub](https://github.com/Inialpha) [LinkedIn](https://www.linkedin.com/in/inimfon-ebong)
- **Abdulrasheed Aliyu**: [Email](rashnotech@gmail.com) [Twitter]() [GitHub](https://github.com/Rashnotech) [LinkedIn]()
