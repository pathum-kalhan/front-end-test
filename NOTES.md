### Code re-factoring 
Move ArticleCard, ArticleList components to separate files in components folder and Header, Footer and Drawer components to layout folder for better readability, maintainability and code structure.

Convert ArticleList component as a functional component for maintain, recommended future proof coding practices.

Add new component called App and import it to the index.tsx file to maintain proper code structure. 

Used sementic elements in some places.

### Mobile responsiveness and User experience improvements
Used MUI grid system to achieve mobile responsiveness in main areas.

Made search box bigger to easy visibility and ease of interaction.

Made sidebar collapsible. So user can hide the sidebar when needed and have more space to look the articles (items)


### functions and Performance
Added missing key prop to ArticleCard to prevent unnecessary renderings

Implemented a full text search on articles list

Used apollo client to interact with the backend.

Error handled in API call for maintain robustness


