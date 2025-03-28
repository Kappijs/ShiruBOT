# ShiruBOT

This project is licensed under the MIT License.

---

### Overview

ShiruBOT is a Discord bot designed to update its status in real-time and ensure it only runs in your specified (allowed) server. The bot periodically toggles its status between a fixed message ("しるだるch") and the current member count of the allowed server (e.g., "123人がしるだるch"). Additionally, the bot will automatically leave any guild that is not your allowed server.

### Features

- **Dynamic Status Updates:**  
  Every 5 seconds, the bot updates its status. It alternates between a static label ("しるだるch") and the live member count of your allowed server.

- **Server Protection:**  
  If the bot is invited to any server other than the allowed one, it will immediately leave that server.

- **MIT Licensed:**  
  This project is distributed under the MIT License.

### Setup and Installation

#### Requirements

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- Git

#### Steps

1. **Clone the Repository**

   Open your terminal or command prompt and run:
   ```bash
   git clone https://github.com/Kappijs/ShiruBOT.git
   cd ShiruBOT
