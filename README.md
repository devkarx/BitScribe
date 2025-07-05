# BitScribe 📝

**BitScribe** is a modern blog platform built entirely with **React**, enabling users to write, edit, and manage blog posts in a clean and intuitive interface. With authentication and access control integrated via **Appwrite**, only logged-in users can interact with content — ensuring a secure and personal blogging experience.

---

##  Features

-  **Authentication**: Sign up and log in using secure sessions.
-  **Post Creation**: Use **TinyMCE** rich-text editor to create detailed blog posts.
-  **Authorization**: Only the **owner** of a post can edit or delete it.
-  **Media Uploads**: Add images to your blog posts.
-  **Post Visibility**: Mark posts as **active** or **inactive** for others to view.
-  **Routing**: Seamless navigation using `react-router`.
-  **Form Handling**: Robust form validation and control via `react-hook-form`.
-  **TailwindCSS**: Fully responsive and beautifully styled using utility-first CSS.
-  **State Management**: Global state handled using `react-redux`.
- ☁ **Backend Services**: Appwrite handles user authentication, databases, and storage.

---

## 🛠 Tech Stack

| Frontend | Libraries | Backend |
|---------|-----------|---------|
| React   | `react-redux`<br>`react-hook-form`<br>`react-router-dom`<br>`tinymce` | Appwrite |
| TailwindCSS | Axios | Appwrite SDK (`appwrite.js`) |

---

##  Setup & Installation

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Appwrite instance (self-hosted or cloud)

### 1. Clone the Repository

```bash
git clone https://github.com/devkarx/BitScribe.git
cd BitScribe
```
 2. Install Dependencies
    npm install
    # or
    yarn

3. Configure Environment
   Create a .env file in the root of the project and configure your Appwrite project credentials:
   ``env
VITE_APPWRITE_URL="https://nyc.cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID="685e978e001e12851597"
VITE_APPWRITE_DATABASE_ID="685e98960006dbfd4c0d"
VITE_APPWRITE_COLLECTION_ID="685e98c2001094a51a97"
VITE_APPWRITE_BUCKET_ID="685e99f30002195f2da6"
`` 

5. Start Development Server
   npm run dev
   # or
   yarn dev
   
## License  
This project is licensed under the MIT License.
