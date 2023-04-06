# Advanced Blog

Hello there, 

I am Md. Hasanuzzaman and this is a project code of fully functional Advanced blog website.
This is a MERN stack project. The frontend is created with Next.js with server-side rendering and the backend is created with Node.js, Express.js and MongoDB is used for database. 


## Features:
* User authentication is implemented with admin, author and reader role. 
* Anyone can read the blogs and see comments associated with the blogs without signing in.
* After signing in, default user role is reader and can post a blog and comment on a blog.
* After posting a blog, the author can edit or delete the blog that belongs to them.
* An admin can edit or delete any blog in the website.
* There are 5 pages. Home, Post Details, Create Post, About and Contact.
* On homepage pagination is implemented. 6 blogs at a time is shown. To view next blogs user can go back and forth by clicking previous and next button.
* Home page and the post details page is server-side rendered with getServerSideProps.
* A rich text editor (draft-js) is implemented in the create post page.
* #### When posting a blog in Rich text editor, Please do not copy and paste the content from other website as the copied content will contain html tags and the website is functioned to serialize only markdown content.
* Form validation is implemented with react-hook-forms.
* Anyone can search and read their desired blog content.

**The live website link**: [https://full-blog-client.vercel.app/]()

**How to run this on your local machine:** Clone this repository and open 'client' and  'api' directory and run npm install on both side.
create .env file on both side. and the the env credentials.
To get the env credentials click [here](https://docs.google.com/document/d/1jXGr4zWDKqrCWRYl9cj5Zud9KCcYh01Aro_s-AXYQdE/edit).
