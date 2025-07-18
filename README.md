# Boroughs

Boroughs, a social media platform where users can form communities and interact with one another's posts!

Overview
Boroughs is designed around the concept of communities (like neighborhoods or "boroughs") where users can gather to discuss topics, share content, and build relationships. The platform combines community-based posting with social networking features.
Data Models & Architecture
Core Models
User Model (user.js)
The foundation of the platform - represents individual users with basic profile information.
Fields:

firstName, lastName: User's full name
age: User's age
username: Unique identifier for the user
password: Authentication credential
email: Contact information

Role: Serves as the primary identity system. The username field is used throughout other models to reference users.
Community Model (communities.js)
Represents topic-based communities where users can gather and share content.
Fields:

comm_create: The username of the community creator
posts: Array of post IDs belonging to this community
comm_lower: Lowercase version of community name for case-insensitive operations

Role: Acts as a container for related posts and provides community organization.
Post Model (posts.js)
Individual content pieces shared within communities.
Fields:

title: Post headline
description: Post content/body
poster: Username of the post author
date: Creation timestamp
comm_name: Name of the community this post belongs to
comments: Array of comment objects

Role: Core content unit that bridges users and communities.
Friends Model (friends.js)
Manages social connections between users.
Fields:

_id: Username of the user (custom string ID)
friends: Array of friend objects with:

fStatus: Relationship status (0=pending, 1=following, 2=friends)
username: Friend's username



Role: Enables social networking features and relationship management.
How the Models Work Together
User-Centric Design
The system is built around users (username as the primary identifier):

Users create communities (stored in comm_create)
Users create posts (stored in poster)
Users connect with other users (stored in friends array)

Community Organization

Community Creation: A user creates a community, becoming the comm_create
Content Addition: Users post content to communities via the comm_name field
Community Growth: The community's posts array tracks all associated content

Content Flow
User → Creates Post → Assigned to Community → Added to Community's Posts Array
Social Connections
The friends system supports different relationship types:

Pending (0): Friend request sent but not accepted
Following (1): One-way relationship (like Twitter follows)
Friends (2): Mutual connection

Data Relationships
One-to-Many Relationships

User → Posts: One user can create many posts
Community → Posts: One community can contain many posts
User → Friends: One user can have many friends

Many-to-Many Relationships

Users ↔ Communities: Users can join multiple communities, communities can have multiple users
Users ↔ Users: Friendship is bidirectional (though tracked separately in each user's friends array)
