## REST APIs

### **1. Registration and Login:**

- **Register User:**
- Endpoint: **`/api/register`**
- Method: POST
- Request Body: **`{ "username": "example", "password": "password", "email": "example@example.com" }`**
- Response: **`{ "success": true, "message": "Registration successful" }`**
- **User Login:**
- Endpoint: **`/api/login`**
- Method: POST
- Request Body: **`{ "username": "example", "password": "password" }`**
- Response: **`{ "success": true, "token": "jwt_token_here" }`**

### **2. Choose Areas of Interest:**

- **Get Recommended Topics:**
- Endpoint: **`/api/recommended-topics`**
- Method: GET
- Response: **`{ "topics": ["Technology", "Science", "Art", ...] }`**

### **3. New Passion Group Creations:**

- **Create Passion Group:**
- Endpoint: **`/api/passion-groups`**
- Method: POST
- Request Body: **`{ "name": "Group Name", "description": "Group Description", "topics": ["Technology", "Science"] }`**
- Response: **`{ "success": true, "message": "Group created successfully" }`**

### **4. Group Posts:**

- **Create Post:**
- Endpoint: **`/api/posts`**
- Method: POST
- Request Body: **`{ "groupId": "group_id_here", "content": "Post content" }`**
- Response: **`{ "success": true, "message": "Post created successfully" }`**
- **Upvote/Downvote Post:**
- Endpoint: **`/api/posts/{post_id}/vote`**
- Method: POST
- Request Body: **`{ "vote": "up" }`**
- Response: **`{ "success": true, "message": "Vote recorded successfully" }`**
- **Comment on Post:**
- Endpoint: **`/api/posts/{post_id}/comments`**
- Method: POST
- Request Body: **`{ "content": "Comment content" }`**
- Response: **`{ "success": true, "message": "Comment posted successfully" }`**

### **5. Connect with People via DM:**

- **Send Direct Message:**
- Endpoint: **`/api/messages`**
- Method: POST
- Request Body: **`{ "recipient": "user_id_here", "content": "Message content" }`**
- Response: **`{ "success": true, "message": "Message sent successfully" }`**

### **6. Earning Credits:**

- **Get Initial Credits:**
- Automatically credited on registration.
- **Earn Credits by Watching Ads:**
- Endpoint: **`/api/earn-credits`**
- Method: POST
- Response: **`{ "success": true, "message": "Credits earned successfully" }`**
- **Weekly Top Post Reward:**
- Automatically credited to the user with the most upvoted post.

### **7. Spending Credits:**

- **Join Paid Group:**
- Endpoint: **`/api/passion-groups/{group_id}/join`**
- Method: POST
- Response: **`{ "success": true, "message": "Joined group successfully" }`**
- **Pay to DM:**
- Endpoint: **`/api/pay-to-dm/{user_id}`**
- Method: POST
- Response: **`{ "success": true, "message": "DM sent successfully" }`**

### **8. Filter Search:**

- **Search Groups/Users:**
- Endpoint: **`/api/search?q=query_here`**
- Method: GET
- Response: **`{ "results": [...] }`**

### **9. Transaction Management:**

- **Get User Transactions:**
- Endpoint: **`/api/transactions`**
- Method: GET
- Response: **`{ "transactions": [...] }`**